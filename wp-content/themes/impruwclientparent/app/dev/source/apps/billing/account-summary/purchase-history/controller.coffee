define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/purchase-history/views' ], ( App, AppController )->
    App.module 'BillingApp.PurchaseHistory', ( PurchaseHistory, App, Backbone, Marionette, $, _ )->
        class PurchaseHistory.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @layout = @getLayout()

                @siteModel = opts.model

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                # show main layout
                @show @layout,
                    loading: true

            # get layout
            getLayout : ->
                new PurchaseHistory.View.Layout

        App.commands.setHandler "show:purchase:history", ( opts ) ->
            new PurchaseHistory.Controller opts