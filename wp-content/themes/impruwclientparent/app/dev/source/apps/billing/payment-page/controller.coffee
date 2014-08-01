define [ 'app', 'controllers/base-controller'
         'apps/billing/payment-page/views' ], ( App, AppController )->
    App.module 'BillingApp.Payment', ( Payment, App, Backbone, Marionette, $, _ )->
        class Payment.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @siteModel = App.request "get:site:model"

                #selected plan data
                @selectedPlanId = opts.planId
                @selectedPlanModel = App.request "get:plan:by:id", @selectedPlanId

                @layout = @getLayout @siteModel

                App.vent.trigger "set:active:menu", 'billing'

                @listenTo @layout, "show", =>
                    #show selected plan
                    App.execute "when:fetched", @selectedPlanModel, =>
                        @layout.selectedPlanRegion.show @selectedPlan @selectedPlanModel

                    #show active subscription
                    @subscriptionId = @siteModel.get 'braintree_subscription'
                    subscriptionModel = App.request "get:subscription:by:id", @subscriptionId
                    App.execute "when:fetched", subscriptionModel, =>
                        @layout.activeSubscriptionRegion.show @activeSubscription subscriptionModel

                    #show payment page
                    brainTreeCustomerId = @siteModel.get 'braintree_customer_id'
                    @creditCardModel = App.request "get:card:info", brainTreeCustomerId
                    App.execute "when:fetched", @creditCardModel, =>

                        #check if card details exists
                        cardExists = @creditCardModel.get 'card_exists'

                        if cardExists is true
                            @paymentView = @getPaymentView @creditCardModel
                        else
                            @paymentView = @getNewCardPaymentView @creditCardModel

                        @layout.paymentRegion.show @paymentView

                        @listenTo @paymentView, "new:credit:card:payment",( paymentMethodNonce )=>
                            @newCardPayment paymentMethodNonce,'active'

                        @listenTo @paymentView, "make:payment:with:stored:card", @payWithStoredCard

                        @listenTo @paymentView, "change:card", =>
                            @paymentView = @getNewCardPaymentView @creditCardModel
                            @layout.paymentRegion.show @paymentView
                            @listenTo @paymentView, "new:credit:card:payment", ( paymentMethodNonce )=>
                                @newCardPayment paymentMethodNonce,'pending'


                # show main layout
                @show @layout,
                    loading : true

            newCardPayment : ( paymentMethodNonce, status )=>
                customerId = @creditCardModel.get 'customer_id'
                options =
                    method : 'POST'
                    url : AJAXURL
                    data :
                        'paymentMethodNonce' : paymentMethodNonce
                        'selectedPlanId' : @selectedPlanId
                        'customerId' : customerId
                        'currentSubscriptionId' : @subscriptionId
                        'status' : status
                        'action' : 'new-card-payment'

                $.ajax( options ).done ( response )=>
                    if response.code == "OK"
                        @paymentView.triggerMethod "payment:success"
                    else
                        @paymentView.triggerMethod "payment:error", response.msg

            payWithStoredCard : ( data )=>
                options =
                    method : 'POST'
                    url : AJAXURL
                    data :
                        'cardToken' : data.token
                        'selectedPlanId' : @selectedPlanId
                        'currentSubscriptionId' : @subscriptionId
                        'action' : data.action

                $.ajax( options ).done ( response )=>
                    if response.code == "OK"
                        @paymentView.triggerMethod "payment:success"
                    else
                        @paymentView.triggerMethod "payment:error", response.msg



            getLayout : ( model ) ->
                new Payment.View.Layout
                    model : model

            selectedPlan : ( selectedPlanModel ) ->
                new Payment.View.SelectedPlanView
                    model : selectedPlanModel

            activeSubscription : ( subscriptionModel ) ->
                new Payment.View.ActiveSubscriptionView
                    model : subscriptionModel

            getPaymentView : ( creditCardModel )->
                new Payment.View.PaymentView
                    model : creditCardModel

            getNewCardPaymentView : ( creditCardModel )->
                new Payment.View.NewCardPaymentView
                    model : creditCardModel


        App.commands.setHandler "show:payment:app", ( opts ) ->
            new Payment.Controller opts