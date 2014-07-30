define [ 'app', 'controllers/base-controller'
         'apps/billing/payment-page/views' ], ( App, AppController )->
    App.module 'BillingApp.Payment', ( Payment, App, Backbone, Marionette, $, _ )->
        class Payment.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @siteModel = opts.model

                @selectedPlanId = opts.planId

                @layout = @getLayout @siteModel

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                @listenTo @layout, "show", =>
                    @selectedPlanModel = App.request "get:plan:by:id", @selectedPlanId
                    App.execute "when:fetched", @selectedPlanModel, =>
                        @layout.selectedPlanRegion.show @selectedPlan @selectedPlanModel

                    subscriptionId = @siteModel.get 'braintree_subscription'
                    subscriptionModel = App.request "get:subscription:by:id", subscriptionId
                    App.execute "when:fetched", subscriptionModel, =>
                        @layout.activeSubscriptionRegion.show @activeSubscription subscriptionModel

                @listenTo @layout, "credit:card:payment", @userPayment


                # show main layout
                @show @layout

            userPayment : ( paymentMethodNonce )=>
                selectedPlanName = @selectedPlanModel.get 'plan_name'
                options =
                    method : 'POST'
                    url : AJAXURL
                    data :
                        'paymentMethodNonce' : paymentMethodNonce
                        'selectedPlanId' : @selectedPlanId
                        'selectedPlanName' : selectedPlanName
                        'action' : 'make-payment'

                $.ajax( options ).done ( response )=>
                    if response.code == "OK"
                        @layout.triggerMethod "payment:success"
                    else
                        @layout.triggerMethod "payment:error",response.msg





            getLayout : ( model ) ->
                new Payment.View.Layout
                    model : model

            selectedPlan : ( selectedPlanModel ) ->
                new Payment.View.SelectedPlanView
                    model : selectedPlanModel

            activeSubscription : ( subscriptionModel ) ->
                new Payment.View.ActiveSubscriptionView
                    model : subscriptionModel


        App.commands.setHandler "show:payment:app", ( opts ) ->
            new Payment.Controller opts