define [ 'app', 'controllers/base-controller'
         'apps/billing/pricing-plans/views' ], ( App, AppController )->
    App.module 'BillingApp.PaymentPlans', ( PaymentPlans, App, Backbone, Marionette, $, _ )->
        class PaymentPlans.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->

                @siteModel =  App.request "get:site:model"

                App.execute "when:fetched",@siteModel,=>

                    subscriptionId = @siteModel.get 'braintree_subscription'

                    @currency = @siteModel.get 'currency'

                    brainTreePlans = App.request "get:braintree:plans"

                    subscriptionModel = App.request "get:subscription:by:id" , subscriptionId

                    App.execute "when:fetched", subscriptionModel,=>

                        @activePlanId =  subscriptionModel.get 'plan_id'

                        @view = @getView brainTreePlans

                        # trigger set:active:menu event
                        App.vent.trigger "set:active:menu", 'billing'

                        # show main layout
                        @show @view

            # get layout
            getView :( brainTreePlanCollection ) =>
                new PaymentPlans.View.PlansView
                    collection : brainTreePlanCollection
                    currency : @currency
                    activePlanId : @activePlanId

        App.commands.setHandler "show:plans:app", ( opts ) ->
            new PaymentPlans.Controller opts