define [ 'app', 'controllers/base-controller'
         'apps/billing/pricing-plans/views' ], ( App, AppController )->
    App.module 'BillingApp.PaymentPlans', ( PaymentPlans, App, Backbone, Marionette, $, _ )->
        class PaymentPlans.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @view = @getView()

                @brainTreePlans = App.request "get:braintree:plans"
                console.log @brainTreePlans

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                # show main layout
                @show @view

            # get layout
            getView : ->
                new PaymentPlans.View.Layout

        App.commands.setHandler "show:plans:app", ( opts ) ->
            new PaymentPlans.Controller opts