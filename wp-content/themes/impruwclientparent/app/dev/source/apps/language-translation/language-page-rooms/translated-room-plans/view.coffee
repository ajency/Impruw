define ['app'
		'text!apps/language-translation/language-page-rooms/translated-room-plans/templates/translatedplansview.html'], (App, translatedplansviewTpl)->

            App.module 'LanguageApp.LanguagePageRooms.TranslatedPlans.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.TranslatedPlanItemView extends Marionette.ItemView

                    template : translatedplansviewTpl

                    events:
                    	"click #btn_update_plan_translation" : "updateRoomPlan"

                   	updateRoomPlan:(e)->
                   		e.preventDefault()
                   		newPlanTitle = @$el.find('#translated-plan-name').val()
                   		newPlanDesc = @$el.find('#translated-plan-desc').val()
                   		planId = @$el.find('#translated-plan-id').val()
                   		@trigger "translated:plan:updated", newPlanTitle, newPlanDesc, planId 

                    onRoomPlanUpdated :() ->
                      @$el.find('.alert').remove()
                      @$el.append('<div class="alert alert-success">'+_.polyglot.t("Room plan details updated")+'</div>')
                      @$el.find('.alert').fadeOut 5000                      
