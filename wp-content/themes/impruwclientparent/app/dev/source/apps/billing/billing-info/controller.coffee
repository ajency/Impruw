define [ 'app', 'controllers/base-controller'
         'apps/billing/billing-info/views' ], ( App, AppController )->
    App.module 'BillingApp.BillingInfo', ( BillingInfo, App, Backbone, Marionette, $, _ )->
        class BillingInfo.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                @layout = @getLayout()

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                # show main layout
                @show @layout

            # get layout
            getLayout : ->
                new BillingInfo.View.Layout

        App.commands.setHandler "show:billing:info:app", ( opts ) ->
            new BillingInfo.Controller opts