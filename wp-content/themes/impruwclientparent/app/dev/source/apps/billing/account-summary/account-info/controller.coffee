define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/account-info/views' ], ( App, AppController )->
    App.module 'BillingApp.AccountInfo', ( AccountInfo, App, Backbone, Marionette, $, _ )->
        class AccountInfo.Controller extends AppController

            # initialize controller
            initialize : ( opts )->

                subscriptionModel = opts.subscriptionModel

                @view = @getView subscriptionModel

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                @show @view,
                    loading : true

            getView : ( subscriptionModel ) ->
                new AccountInfo.View.AccountInfoView
                    model : subscriptionModel

        App.commands.setHandler "show:account:info", ( opts ) ->
            new AccountInfo.Controller opts