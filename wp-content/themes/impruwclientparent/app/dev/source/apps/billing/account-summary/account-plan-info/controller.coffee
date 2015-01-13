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

                    @listenTo @view, "switch:to:free:plan", @changeToFreePlan
                    
                    @show @view,
                        loading : true

            getView : ( featurePlanModel) =>
                new AccountPlanInfo.View.AccountPlanInfoView
                    model : featurePlanModel

            changeToFreePlan:->
                postURL = "#{SITEURL}/api/ajbilling/defaultPlan/#{SITEID["id"]}/site"

                options =
                    method : 'PUT'
                    url : postURL

                $.ajax( options ).done ( response )=>
                    if response.success is true
                        Marionette.triggerMethod.call @region, "load:subscription:info:app"
                        @view.triggerMethod "cancel:subscription:success"
                    else
                        @view.triggerMethod "cancel:subscription:error", response.msg

        App.commands.setHandler "show:account:plan:info", ( opts ) ->
            new AccountPlanInfo.Controller opts