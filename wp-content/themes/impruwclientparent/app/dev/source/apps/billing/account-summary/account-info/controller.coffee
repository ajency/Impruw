define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/account-info/views' ], ( App, AppController )->
    App.module 'BillingApp.AccountInfo', ( AccountInfo, App, Backbone, Marionette, $, _ )->
        class AccountInfo.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                subscriptionId = opts.subscriptionId

                subscriptionModel = App.request "get:subscription:by:id", subscriptionId

                @view = @getView subscriptionModel

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                @show @view,
                    loading : true

            getView : ( subscriptionModel ) ->
                console.log subscriptionModel
                new AccountInfo.View.AccountInfoView
                    model : subscriptionModel

        App.commands.setHandler "show:account:info", ( opts ) ->
            new AccountInfo.Controller opts