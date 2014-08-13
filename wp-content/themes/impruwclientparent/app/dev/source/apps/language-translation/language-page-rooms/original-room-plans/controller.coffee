define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/original-room-plans/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.OriginalPlans', (OriginalPlans, App, Backbone, Marionette, $, _)->

        class OriginalPlans.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->             

                {planId} = opts 

                #get plan model by id
                @planModel = planModel = App.request "get:plan:by:id", planId

                @originalPlanView = @_getPlanView planModel

                #function to load view
                @show @originalPlanView,
                    loading: true

            _getPlanView : (model)->
                new OriginalPlans.Views.OriginalPlanItemView
                    model: model

        App.commands.setHandler "show:original:plans:app", (opts) ->
            new OriginalPlans.Controller opts
