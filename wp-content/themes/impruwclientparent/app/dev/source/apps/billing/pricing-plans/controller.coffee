define [ 'app', 'controllers/base-controller'
         'apps/billing/pricing-plans/views' ], ( App, AppController )->
    App.module 'BillingApp.PaymentPlans', ( PaymentPlans, App, Backbone, Marionette, $, _ )->
        class PaymentPlans.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @siteModel = App.request "get:site:model"

                App.execute "when:fetched", @siteModel, =>
                    @subscriptionId = @siteModel.get 'braintree_subscription'

                    @currency = @siteModel.get 'currency'

                    brainTreePlans = App.request "get:braintree:plans"

                    @subscriptionModel = App.request "get:subscription:by:id", @subscriptionId

                    @pendingSubscriptionModel = App.request "get:pending:subscription", @subscriptionId


                    App.execute "when:fetched", @subscriptionModel, =>
                        @activePlanId = @subscriptionModel.get 'plan_id'

                        App.execute "when:fetched", @pendingSubscriptionModel, =>

                            @pendingPlanId = @pendingSubscriptionModel.get 'plan_id'

                            @view = @getView brainTreePlans

                            @listenTo @view, "switch:to:free:plan", @changeToFreePlan

                            # trigger set:active:menu event
                            App.vent.trigger "set:active:menu", 'billing'

                            @show @view


            getView : ( brainTreePlanCollection ) =>
                new PaymentPlans.View.PlansView
                    collection : brainTreePlanCollection
                    currency : @currency
                    activePlanId : @activePlanId
                    pendingPlanId : @pendingPlanId

            changeToFreePlan : ->
                status = @subscriptionModel.get 'status'

                if status is 'Pending'
                    cancelDate = @subscriptionModel.get 'start_date'
                else
                    cancelDate = @subscriptionModel.get 'bill_end'

                options =
                    method : 'POST'
                    url : AJAXURL
                    data :
                        'currentSubscriptionId' : @subscriptionId
                        'cancelDate' : cancelDate
                        'status' : status
                        'action' : 'change-to-free-plan'

                $.ajax( options ).done ( response )=>
                    console.log response
#                    window.location.reload()


        App.commands.setHandler "show:plans:app", ( opts ) ->
            new PaymentPlans.Controller opts