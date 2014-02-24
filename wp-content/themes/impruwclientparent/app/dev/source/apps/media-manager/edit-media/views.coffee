define ['app', 'text!apps/media-manager/edit-media/templates/form.html'], (App, formTpl)->
	
			App.module 'MediaManager.EditMedia.Views', (Views, App)->

				class Views.EditMediaView extends Marionette.ItemView
					
					template : formTpl


				