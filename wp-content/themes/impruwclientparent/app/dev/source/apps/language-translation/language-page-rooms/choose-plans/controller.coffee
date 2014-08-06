define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/choose-plans/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.ChoosePlans', (ChoosePlans, App, Backbone, Marionette, $, _)->

        class ChoosePlans.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                #plan collection
                @collection = collection = App.request "get:plans:collection"

                @ChoosePlansView = @_getPlansView collection

                @listenTo @ChoosePlansView, "load:original:plans", @loadOriginalPlans
                @listenTo @ChoosePlansView, "load:translated:plans", @loadTranslatedPlans

                #function to load view
                @show @ChoosePlansView,
                    loading: true

            _getPlansView : (collection) ->
                if collection.length==0
                   new ChoosePlans.Views.EmptyView
                    collection:collection 
                else
                    new ChoosePlans.Views.ChoosePlansView
                     collection:collection

            loadOriginalPlans: (selectedPlanId) ->
                Marionette.triggerMethod.call @region, "original:plan", selectedPlanId
            
            loadTranslatedPlans: (selectedPlanId) ->
                Marionette.triggerMethod.call @region, "translated:plan", selectedPlanId


        App.commands.setHandler "choose:plans:app", (opts) ->
            new ChoosePlans.Controller opts