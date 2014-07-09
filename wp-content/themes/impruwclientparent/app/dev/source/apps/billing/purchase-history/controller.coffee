define [ 'app', 'controllers/base-controller'
         'apps/billing/purchase-history/views' ], ( App, AppController )->
    App.module 'BillingApp.PurchaseHistory', ( PurchaseHistory, App, Backbone, Marionette, $, _ )->
        class PurchaseHistory.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @layout = @getLayout()

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                # show main layout
                @show @layout

            # get layout
            getLayout : ->
                new PurchaseHistory.View.Layout

        App.commands.setHandler "show:purchase:app", ( opts ) ->
            new PurchaseHistory.Controller opts