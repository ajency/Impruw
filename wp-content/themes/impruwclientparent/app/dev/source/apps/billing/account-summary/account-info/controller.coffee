define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/account-info/views' ], ( App, AppController )->
    App.module 'BillingApp.AccountInfo', ( AccountInfo, App, Backbone, Marionette, $, _ )->
        class AccountInfo.Controller extends AppController

            # initialize controller
            initialize : ( opts )->

                billingPlanModel = App.request "get:site:billing:plan", SITEID['id']

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                App.execute "when:fetched", billingPlanModel, => 
                    @view = @getView billingPlanModel
                    
                    @show @view,
                        loading : true

            getView : ( billingPlanModel) =>
                new AccountInfo.View.AccountInfoView
                    model : billingPlanModel

        App.commands.setHandler "show:account:info", ( opts ) ->
            new AccountInfo.Controller opts