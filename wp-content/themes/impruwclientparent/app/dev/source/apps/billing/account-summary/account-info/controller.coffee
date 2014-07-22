define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/account-info/views' ], ( App, AppController )->
    App.module 'BillingApp.AccountInfo', ( AccountInfo, App, Backbone, Marionette, $, _ )->
        class AccountInfo.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                siteModel = opts.model

                subscriptionId = siteModel.get 'braintree_subscription'
                @activationDate = siteModel.get 'subscription_start_date'

                subscriptionModel =  App.request "get:subscription:by:id",subscriptionId

                App.execute "when:fetched",subscriptionModel,=>

                    @view = @getView subscriptionModel

                    # trigger set:active:menu event
                    App.vent.trigger "set:active:menu", 'billing'

                    # show main layout
                    @show @view,
                        loading: true

            # get layout
            getView : ( subscriptionModel ) ->
                new AccountInfo.View.AccountInfoView
                    model : subscriptionModel
                    activationDate : @activationDate

        App.commands.setHandler "show:account:info", ( opts ) ->
            new AccountInfo.Controller opts