define ['app', 'controllers/base-controller', 'apps/media-manager/all-media/views'], (App, AppController)->

	#Login App module
	App.module "MediaManager.AllMedia", (AllMedia, App)->
		
		@startWithParent = false

		#Show Controller 
		class AllMedia.Controller extends AppController

			# initialize
			initialize:()->
				mediaCollection = App.request "fetch:media", true
				view = @_getView mediaCollection
				@show view,
						loading : true
				
			# gets the main login view
			_getView :(mediaCollection)->
				new AllMedia.Views.GridView
									collection : mediaCollection

		# trigger the app with a region
		AllMedia.on 'start',(options = {})->
			new AllMedia.Controller 
							region : options.region