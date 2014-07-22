define [ 'app', 'controllers/base-controller'
         'apps/billing/update-billing/views' ], ( App, AppController )->
    App.module 'BillingApp.UpdateBilling', ( UpdateBilling, App, Backbone, Marionette, $, _ )->
        class UpdateBilling.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @layout = @getLayout()

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                # show main layout
                @show @layout

            # get layout
            getLayout : ->
                new UpdateBilling.View.Layout

        App.commands.setHandler "show:billing:info:app", ( opts ) ->
            new UpdateBilling.Controller opts