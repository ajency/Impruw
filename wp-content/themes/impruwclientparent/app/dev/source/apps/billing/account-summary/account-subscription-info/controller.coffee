define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/account-subscription-info/views' ], ( App, AppController )->
    App.module 'BillingApp.AccountSubscriptionInfo', ( AccountSubscriptionInfo, App, Backbone, Marionette, $, _ )->
        class AccountSubscriptionInfo.Controller extends AppController

            # initialize controller
            initialize : ( opts )->

                activeSubscriptionModel = App.request "get:active:subscription", SITEID['id']

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                App.execute "when:fetched", activeSubscriptionModel, => 
                    @view = @getView activeSubscriptionModel
                    
                    @show @view,
                        loading : true

            getView : ( activeSubscriptionModel) =>
                new AccountSubscriptionInfo.View.AccountSubscriptionInfoView
                    model : activeSubscriptionModel

        App.commands.setHandler "show:account:subscription:info", ( opts ) ->
            new AccountSubscriptionInfo.Controller opts