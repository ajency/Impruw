define [ 'app', 'controllers/base-controller'
         'apps/billing/site-payment-page/views' ], ( App, AppController )->
    App.module 'BillingApp.SitePayment', ( SitePayment, App, Backbone, Marionette, $, _ )->
        class SitePayment.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @siteModel = App.request "get:site:model"

                #selected plan data
                @selectedPlanId = opts.planId
                @braintreePlanId = opts.braintreePlanId
                @selectedPlanModel = App.request "get:braintreeplan:by:id", @selectedPlanId

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

            getLayout : ( model ) ->
                new SitePayment.View.Layout
                    model : model

            getPaymentPageView : ( creditCardCollection )->
                new SitePayment.View.PaymentPageView
                    collection : creditCardCollection

            getFirstTimePaymentPageView : ( creditCardModel )->
                new SitePayment.View.FirstTimePaymentView
                    model : creditCardModel

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
                    
                    
                    


        App.commands.setHandler "show:site:payment:app", ( opts ) ->
            new SitePayment.Controller opts