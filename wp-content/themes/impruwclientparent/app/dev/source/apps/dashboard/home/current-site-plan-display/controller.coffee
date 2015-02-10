define [ 'app', 'controllers/base-controller'
         'apps/dashboard/home/current-site-plan-display/view' ], ( App, AppController )->
    App.module 'Dashboard.Home.CurrentSitePlan', ( CurrentSitePlan, App, Backbone, Marionette, $, _ )->
        class CurrentSitePlan.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->

                @featurePlanModel = App.request "get:active:feature:plan", SITEID['id']

                App.execute "when:fetched",@featurePlanModel,=>
                    currentPlanId = @featurePlanModel.get 'id'
                    if currentPlanId is '1'
                        @view = @getFreePlanView()
                    else
                        @view = @getPaidPlanView()


                    @show @view,
                        loading :true

            getPaidPlanView :->
                new CurrentSitePlan.View.CurrentSitePlanView
                    model: @featurePlanModel

            getFreePlanView :->
                new CurrentSitePlan.View.CurrentFreePlanView
                    model : @featurePlanModel

        App.commands.setHandler "show:current:site:plan", ( opts ) ->
            new CurrentSitePlan.Controller opts