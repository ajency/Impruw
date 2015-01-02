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
                        window.PAYMENT_PLAN_ID  = response.plan_id
                        @paymentView.triggerMethod "payment:success"
                    else 
                        @paymentView.triggerMethod "payment:error", response.msg


        App.commands.setHandler "show:site:payment:app", ( opts ) ->
            new SitePayment.Controller opts