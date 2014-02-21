define ['app'
		'text!apps/media-manager/upload/templates/upload.html'
		], (App, uploadTpl)->
	
			App.module 'MediaManager.Upload.Views', (Views, App)->

				class Views.UploadView extends Marionette.ItemView

					template: uploadTpl

				