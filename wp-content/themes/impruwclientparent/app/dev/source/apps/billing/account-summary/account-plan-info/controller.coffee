define [ 'app', 'controllers/base-controller'
         'apps/billing/account-summary/account-plan-info/views' ], ( App, AppController )->
    App.module 'BillingApp.AccountPlanInfo', ( AccountPlanInfo, App, Backbone, Marionette, $, _ )->
        class AccountPlanInfo.Controller extends AppController

            # initialize controller
            initialize : ( opts )->

                featurePlanModel = App.request "get:active:feature:plan", SITEID['id']

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'billing'

                App.execute "when:fetched", featurePlanModel, => 
                    @view = @getView featurePlanModel
                    
                    @show @view,
                        loading : true

            getView : ( featurePlanModel) =>
                new AccountPlanInfo.View.AccountPlanInfoView
                    model : featurePlanModel

        App.commands.setHandler "show:account:plan:info", ( opts ) ->
            new AccountPlanInfo.Controller opts