define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/translated-room-plans/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.TranslatedPlans', (TranslatedPlans, App, Backbone, Marionette, $, _)->

        class TranslatedPlans.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                @planId = planId= opts.planId
                @editingLang = editingLang =  opts.editingLang

                #get plan model
                @planModel = planModel = App.request "get:translated:plan:by:id", planId , editingLang

                @translatedPlanView = @_getTranslatedPlanView planModel

                @listenTo @translatedPlanView, "translated:plan:updated", @updateTranslatedPlan

                #function to load view
                @show @translatedPlanView,
                    loading: true

            _getTranslatedPlanView : (model)->
                new TranslatedPlans.Views.TranslatedPlanItemView
                    model:model

            updateTranslatedPlan : (newPlanTitle, newPlanDesc, planId)->
                data= []
                data['translatedPlanTitle'] = newPlanTitle
                data['translatedPlanDesc'] = newPlanDesc
                data['translatedPlanID'] = planId
                @planModel.set data
                # AJAX 
                $.post "#{AJAXURL}?action=update-translated-plan",
                    (
                        plan_title : newPlanTitle
                        plan_desc : newPlanDesc
                        plan_id : planId
                        editingLang : @editingLang
                    ), @planUpdated, 'json'

            planUpdated:(response) =>
                @translatedPlanView.triggerMethod "room:plan:updated"    


        App.commands.setHandler "show:translated:plans:app", (opts = {}) ->
            new TranslatedPlans.Controller opts