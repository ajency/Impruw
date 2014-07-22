define [ 'app', 'controllers/base-controller'
         'apps/billing/pricing-plans/views' ], ( App, AppController )->
    App.module 'BillingApp.PaymentPlans', ( PaymentPlans, App, Backbone, Marionette, $, _ )->
        class PaymentPlans.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->

                @siteModel =  App.request "get:site:model"

                brainTreePlans = App.request "get:braintree:plans"

                @view = @getView brainTreePlans

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                # show main layout
                @show @view,
                    loading :true

            # get layout
            getView :( brainTreePlanCollection ) =>
                new PaymentPlans.View.PlansView
                    collection : brainTreePlanCollection
                    model : @siteModel

        App.commands.setHandler "show:plans:app", ( opts ) ->
            new PaymentPlans.Controller opts