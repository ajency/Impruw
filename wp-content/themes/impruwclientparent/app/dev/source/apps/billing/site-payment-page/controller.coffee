define [ 'app', 'controllers/base-controller'
         'apps/billing/site-payment-page/views' ], ( App, AppController )->
    App.module 'BillingApp.SitePayment', ( SitePayment, App, Backbone, Marionette, $, _ )->
        class SitePayment.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @siteModel = App.request "get:site:model"
                @braintreeCustomerId = @siteModel.get('braintree_customer_id')

                #selected plan data
                @selectedPlanId = opts.planId
                @braintreePlanId = opts.braintreePlanId

                # Option to check whether payment page is for subscription or assisted set up
                @isSubscription = opts.subscription

                if @isSubscription
                    # Get selected plan details to be displayed in the view
                    selectedPlanModel = App.request "get:feature:plan:by:id",@selectedPlanId
                    @selectedPlanName = selectedPlanModel.get 'plan_title'
                    @selectedPlanAmount = selectedPlanModel.get 'price'

                    # Get current subscription details to be displayed in the view
                    subscriptionCollection = App.request "get:site:subscriptions"
                    currentSubscriptionModel = subscriptionCollection.at 0
                    @activePaymentToken =  currentSubscriptionModel.get 'paymentMethodToken'
                    @currentSubscriptionAmount = currentSubscriptionModel.get 'price'
                    @currencySymbol = currentSubscriptionModel.get 'currency'
                    @billingPeriodStartDate = currentSubscriptionModel.get 'billingPeriodStartDate'
                    @billingPeriodEndDate = currentSubscriptionModel.get 'billingPeriodEndDate'
                    @nextBillingDate = currentSubscriptionModel.get 'nextBillingDate'
                
                    # Get proration charge
                    @prorationCharge = @getProrationCharge(@currentSubscriptionAmount, @selectedPlanAmount,@billingPeriodStartDate,@billingPeriodEndDate)
                    console.log @prorationCharge
                    
                    @currentSubscriptionDaysLeft = @getCurrentSubscriptionDaysLeft(@billingPeriodStartDate,@billingPeriodEndDate)
                    

                    # Get current active plan name
                    if PAYMENT_PLAN_ID is '1' 
                        @activePlanName = 'Free Trial Expired'
                    else if PAYMENT_PLAN_ID is  '2'
                        @activePlanName = 'Free Trial'
                    else
                        activePlanModel = App.request "get:feature:plan:by:id",PAYMENT_PLAN_ID
                        @activePlanName = activePlanModel.get 'plan_title'

                else
                    @selectedBraintreePlanModel = App.request "get:braintreeplan:by:id", @braintreePlanId
                    App.execute "when:fetched",  @selectedBraintreePlanModel, =>
                        @selectedPlanName = @selectedBraintreePlanModel.get('name')
                        @selectedPlanAmount = @selectedBraintreePlanModel.get('price')
                        @currencyCode = @selectedBraintreePlanModel.get('currencyIsoCode')
                        @currencySymbol = CURRENCY_SYMBOLS[@currencyCode] 

                @layout = @getLayout @siteModel

                App.vent.trigger "set:active:menu", 'billing'

                @listenTo @layout, "show", =>
                    creditCardCollection = App.request "get:credit:cards"

                    # show summary of chosen plan

                    # show payment page
                    App.execute "when:fetched", creditCardCollection, =>

                        creditCardFirstModel = creditCardCollection.at 0
                        cardExists = creditCardFirstModel.get 'card_exists'
                        @customerId = creditCardFirstModel.get 'customer_id'

                        if cardExists is true
                            @paymentView = @getPaymentPageView creditCardCollection
                        else
                            @paymentView = @getFirstTimePaymentPageView creditCardFirstModel

                        @layout.paymentRegion.show @paymentView

                        @listenTo @paymentView, "new:credit:card:payment", ( paymentMethodNonce )=>
                            @newCardPayment paymentMethodNonce 

                        @listenTo @paymentView, "new:credit:card:assistedsetup:payment", ( paymentMethodNonce )=>
                            @newCardAsstdSetupPayment paymentMethodNonce 

                        @listenTo @paymentView, "add:credit:card", ( paymentMethodNonce )=>
                            @addCard paymentMethodNonce 

                        @listenTo @paymentView, "make:payment:with:stored:card", ( cardToken )=>
                            @storedCardPayment cardToken 

                        @listenTo @paymentView, "make:assistedsetup:payment:stored:card", ( cardToken )=>
                            @asstdSetupStoredCardPayment cardToken

                @show @layout,
                    loading : true

            getCurrentSubscriptionBalance :(oldPrice, prorationCharge) ->
                if (PAYMENT_PLAN_ID is '1')
                    return 0

                currentBalance = oldPrice-prorationCharge
                currentBalance = parseFloat(currentBalance).toFixed(2)
                return currentBalance

            getCurrentSubscriptionDaysLeft :(oldStartDate, oldEndDate) ->
                if (PAYMENT_PLAN_ID is '1') or (oldEndDate is 'N/A')
                    return 0

                # today.toGMTString()
                today = new Date()
                today = today.toGMTString()
               
                todayFormatted = moment(today).format('M/D/YYYY')
                
                oldEndDateFormatted = moment(oldEndDate).format('M/D/YYYY')

                todayMoment = moment(todayFormatted,'M/D/YYYY')

                oldEndDateMoment = moment(oldEndDateFormatted,'M/D/YYYY')
                
                daysLeftInBillingPeriod = oldEndDateMoment.diff(todayMoment, 'days')

                return daysLeftInBillingPeriod


            getProrationCharge : ( oldPrice, newPrice, oldStartDate, oldEndDate ) ->
                if PAYMENT_PLAN_ID is '1' or (oldEndDate is 'N/A')
                    return newPrice
                
                # today.toGMTString()
                today = new Date()
                today = today.toGMTString()
               
                todayFormatted = moment(today).format('M/D/YYYY')
                
                oldStartDateFormatted = moment(oldStartDate).format('M/D/YYYY')
                oldEndDateFormatted = moment(oldEndDate).format('M/D/YYYY')

                todayMoment = moment(todayFormatted,'M/D/YYYY')
                oldStartDateMoment = moment(oldStartDateFormatted,'M/D/YYYY')
                oldEndDateMoment = moment(oldEndDateFormatted,'M/D/YYYY')

                daysInBillingPeriod = oldEndDateMoment.diff(oldStartDateMoment, 'days')+1
                
                daysLeftInBillingPeriod = oldEndDateMoment.diff(todayMoment, 'days')
                

                prorationCharge = (newPrice-oldPrice)*daysLeftInBillingPeriod/daysInBillingPeriod
                
                # truncate to 2 decimal points rather than rounding off
                prorationCharge -=prorationCharge % .01
                
                return prorationCharge

            getLayout : ( model ) ->
                new SitePayment.View.Layout
                    model : model

            getPaymentPageView : ( creditCardCollection )->
                new SitePayment.View.PaymentPageView
                    collection : creditCardCollection
                    activePlanName : @activePlanName
                    currentSubscriptionAmount : @currentSubscriptionAmount
                    currencySymbol : @currencySymbol
                    billingPeriodStartDate : @billingPeriodStartDate
                    billingPeriodEndDate : @billingPeriodEndDate
                    nextBillingDate : @nextBillingDate
                    selectedPlanName : @selectedPlanName
                    selectedPlanAmount : @selectedPlanAmount
                    prorationCharge : @prorationCharge
                    currentSubscriptionDaysLeft : @currentSubscriptionDaysLeft
                    activePaymentToken : @activePaymentToken
                    isSubscription : @isSubscription

            getFirstTimePaymentPageView : ( creditCardModel )->
                new SitePayment.View.FirstTimePaymentView
                    model : creditCardModel
                    activePlanName : @activePlanName
                    currentSubscriptionAmount : @currentSubscriptionAmount
                    currencySymbol : @currencySymbol
                    billingPeriodStartDate : @billingPeriodStartDate
                    billingPeriodEndDate : @billingPeriodEndDate
                    nextBillingDate : @nextBillingDate
                    selectedPlanName : @selectedPlanName
                    selectedPlanAmount : @selectedPlanAmount
                    prorationCharge : @prorationCharge
                    currentSubscriptionDaysLeft : @currentSubscriptionDaysLeft
                    isSubscription : @isSubscription

            getTranslatedBraintreeResponse :(responseMessage)->
                translatedMsgResponse = ""
                splitMsg = responseMessage.split("\n")
                _.each splitMsg, (value, key) ->
                    translatedMsg = _.polyglot.t(value)
                    translatedMsg = translatedMsg+"<br/>"
                    translatedMsgResponse+= translatedMsg
                translatedMsgResponse


            newCardPayment : ( paymentMethodNonce )=>
                
                postURL = "#{SITEURL}/api/ajbilling/braintreePlan/#{SITEID["id"]}/site/#{@selectedPlanId}/#{@braintreePlanId}"

                options =
                    method : 'POST'
                    url : postURL
                    data :
                        'paymentMethodNonce' : paymentMethodNonce
                        'customerName' : USER['data']['display_name']
                        'customerEmail' : USER['data']['user_email']

                $.ajax( options ).done ( response )=>
                    if response.subscription_success is true
                        @updateBillingGlobals response
                        newCreditCard = response.new_credit_card
                        newCreditCardModel = new Backbone.Model newCreditCard
                        @creditCardCollection = App.request "get:credit:cards"
                        @creditCardCollection.add(newCreditCardModel)
                        @paymentView.triggerMethod "payment:success"
                    else 
                        msgResponse = response.msg
                        translatedMsgResponse = @getTranslatedBraintreeResponse(msgResponse)
                        @paymentView.triggerMethod "payment:error", translatedMsgResponse

            
            newCardAsstdSetupPayment :(paymentMethodNonce)=>
                postURL = "#{SITEURL}/api/ajbilling/oneTimeTransaction/#{SITEID["id"]}/site/#{@braintreePlanId}"

                options =
                    method : 'POST'
                    url : postURL
                    data :
                        'paymentMethodNonce' : paymentMethodNonce
                        'customerName' : USER['data']['display_name']
                        'customerEmail' : USER['data']['user_email']

                $.ajax( options ).done ( response )=>
                    if response.success is true
                        newCreditCard = response.credit_card
                        newCreditCardModel = new Backbone.Model newCreditCard
                        @creditCardCollection = App.request "get:credit:cards"
                        @creditCardCollection.add(newCreditCardModel)
                        @paymentView.triggerMethod "payment:success"
                    else 
                        translatedMsgResponse = @getTranslatedBraintreeResponse(response.msg) 
                        @paymentView.triggerMethod "payment:error", translatedMsgResponse


            addCard : ( paymentMethodNonce )=>
                
                postURL = "#{SITEURL}/api/ajbilling/creditCard/#{SITEID["id"]}/site"

                options =
                    method : 'POST'
                    url : postURL
                    data :
                        'paymentMethodNonce' : paymentMethodNonce

                $.ajax( options ).done ( response )=>
                    if response.success is true
                        newCreditCard = response.new_credit_card
                        newCreditCardModel = new Backbone.Model newCreditCard
                        @creditCardCollection = App.request "get:credit:cards"
                        @creditCardCollection.add(newCreditCardModel)
                        @paymentView.triggerMethod "add:credit:card:success"
                    else
                        translatedMsgResponse = @getTranslatedBraintreeResponse(response.msg)
                        @paymentView.triggerMethod "add:credit:card:error", translatedMsgResponse

            storedCardPayment : (paymentMethodToken)=>
                postURL = "#{SITEURL}/api/ajbilling/braintreePlan/#{SITEID["id"]}/site/#{@selectedPlanId}/#{@braintreePlanId}"

                options =
                    method : 'POST'
                    url : postURL
                    data :
                        'paymentMethodToken' : paymentMethodToken

                $.ajax( options ).done ( response )=>
                    if response.subscription_success is true
                        @updateBillingGlobals response
                        @paymentView.triggerMethod "payment:success"
                    else 
                        translatedMsgResponse = @getTranslatedBraintreeResponse(response.msg)
                        @paymentView.triggerMethod "payment:error", translatedMsgResponse

            asstdSetupStoredCardPayment : (paymentMethodToken)=>
                postURL = "#{SITEURL}/api/ajbilling/oneTimeTransaction/#{SITEID["id"]}/site/#{@braintreePlanId}"

                options =
                    method : 'POST'
                    url : postURL
                    data :
                        'paymentMethodToken' : paymentMethodToken

                $.ajax( options ).done ( response )=>
                    if response.success is true
                        @updateBillingGlobals response
                        @paymentView.triggerMethod "payment:success"
                    else 
                        translatedMsgResponse = @getTranslatedBraintreeResponse(response.msg)
                        @paymentView.triggerMethod "payment:error", translatedMsgResponse

            updateBillingGlobals :(updateResponse)=>
                window.PAYMENT_PLAN_ID  = updateResponse.plan_id
                window.IS_EMAIL_ALLOWED  = updateResponse.is_email_allowed
                window.IS_SITEADDON_ALLOWED  = updateResponse.is_siteaddon_allowed

                featureChanges = updateResponse.feature_changes
                planFeatureCount={}
                _.each featureChanges, (featureChange, key) ->
                    featureComponent = featureChange['feature_component']
                    if featureComponent isnt 'domain_mapping'
                        planFeatureCount[featureComponent] = [
                                                current_count: parseInt featureChange['current_count']
                                                allowed_count: parseInt featureChange['allowed_count']
                                              ]
                window.PLAN_FEATURE_COUNT = planFeatureCount


                # update subscription collection with the latest subscription details
                updatedSubscription = updateResponse.updated_subscription
                updatedSubscriptionModel = new Backbone.Model updatedSubscription
                @subscriptionCollection = App.request "get:site:subscriptions"
                @subscriptionCollection.reset()
                @subscriptionCollection.add updatedSubscriptionModel
                    
                    
                    


        App.commands.setHandler "show:site:payment:app", ( opts ) ->
            new SitePayment.Controller opts