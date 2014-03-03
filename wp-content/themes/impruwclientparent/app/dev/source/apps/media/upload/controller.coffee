define ['app', 'controllers/base-controller', 'apps/media/upload/views'], (App, AppController)->

	#Login App module
	App.module "Media.Upload", (Upload, App)->

		@startWithParent = false
 
		#Show Controller 
		class Upload.Controller extends AppController

			# initialize
			initialize:()->
				view = @_getView()
				@show view
				
			# gets the main login view
			_getView :(mediaCollection)->
				new Upload.Views.UploadView


		Upload.on 'start',(options) =>
			new Upload.Controller
						region : options.region
