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

                # Get selected plan details to be displayed in the view
                selectedPlanModel = App.request "get:feature:plan:by:id",@selectedPlanId
                @selectedPlanName = selectedPlanModel.get 'plan_title'
                @selectedPlanAmount = selectedPlanModel.get 'price'

                # Get current subscription details to be displayed in the view
                subscriptionCollection = App.request "get:site:subscriptions"
                currentSubscriptionModel = subscriptionCollection.at 0
                @currentSubscriptionAmount = currentSubscriptionModel.get 'price'
                @currencySymbol = currentSubscriptionModel.get 'currency'
                @billingPeriodStartDate = currentSubscriptionModel.get 'billingPeriodStartDate'
                @billingPeriodEndDate = currentSubscriptionModel.get 'billingPeriodEndDate'
                @nextBillingDate = currentSubscriptionModel.get 'nextBillingDate'

                # Get proration charge
                @prorationCharge = @getProrationCharge(@currentSubscriptionAmount, @selectedPlanAmount,@billingPeriodStartDate,@billingPeriodEndDate)
                console.log @prorationCharge

                @currentSubscriptionBalance = @getCurrentSubscriptionBalance(@currentSubscriptionAmount,@prorationCharge)
                console.log @currentSubscriptionBalance

                # Get current active plan name
                if PAYMENT_PLAN_ID is '1'
                    @activePlanName = 'Default'
                else
                    activePlanModel = App.request "get:feature:plan:by:id",PAYMENT_PLAN_ID
                    @activePlanName = activePlanModel.get 'plan_title'


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

                        @listenTo @paymentView, "add:credit:card", ( paymentMethodNonce )=>
                            @addCard paymentMethodNonce 

                        @listenTo @paymentView, "make:payment:with:stored:card", ( cardToken )=>
                            @storedCardPayment cardToken

                @show @layout,
                    loading : true

            getCurrentSubscriptionBalance :(oldPrice, prorationCharge) ->
                if (PAYMENT_PLAN_ID is '1') or (_.isUndefined(@braintreeCustomerId))
                    return 0

                currentBalance = oldPrice-prorationCharge
                currentBalance = parseFloat(currentBalance).toFixed(2)
                return currentBalance


            getProrationCharge : ( oldPrice, newPrice, oldStartDate, oldEndDate ) ->
                if PAYMENT_PLAN_ID is '1' or (_.isUndefined(@braintreeCustomerId))
                    return newPrice
                
                # today.toGMTString()
                today = new Date()
                today = today.toGMTString()
                console.log "today gmt string "+today

                todayFormatted = moment(today).format('M/D/YYYY')
                console.log 'todayformatted '+todayFormatted
                oldStartDateFormatted = moment(oldStartDate).format('M/D/YYYY')
                oldEndDateFormatted = moment(oldEndDate).format('M/D/YYYY')

                todayMoment = moment(todayFormatted,'M/D/YYYY')
                oldStartDateMoment = moment(oldStartDateFormatted,'M/D/YYYY')
                oldEndDateMoment = moment(oldEndDateFormatted,'M/D/YYYY')

                daysInBillingPeriod = oldEndDateMoment.diff(oldStartDateMoment, 'days')+1
                console.log "days in billing cycle "+daysInBillingPeriod
                daysLeftInBillingPeriod = oldEndDateMoment.diff(todayMoment, 'days')
                console.log "days left in billing cycle "+daysLeftInBillingPeriod

                console.log "new price "+newPrice
                prorationCharge = (newPrice-oldPrice)*daysLeftInBillingPeriod/daysInBillingPeriod
                console.log "old price "+oldPrice
                console.log "actual proration "+prorationCharge
                # truncate to 2 decimal points rather than rounding off
                prorationCharge -=prorationCharge % .01
                console.log "truncated proration "+prorationCharge
                console.log "fixed proration after truncation"+parseFloat(prorationCharge).toFixed(2)
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
                    currentSubscriptionBalance : @currentSubscriptionBalance

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
                    currentSubscriptionBalance : @currentSubscriptionBalance

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
                        @paymentView.triggerMethod "payment:error", response.msg

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
                        @paymentView.triggerMethod "add:credit:card:error", response.msg

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
                        @paymentView.triggerMethod "payment:error", response.msg

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