define ['app', 'controllers/base-controller', 'apps/media/grid/views'], (App, AppController)->

	#Login App module
	App.module "Media.Grid", (Grid, App)->
		
		@startWithParent = false

		#Show Controller 
		class Grid.Controller extends AppController

			# initialize
			initialize:()-> 
				mediaCollection = App.request "fetch:media", true
				view = @_getView mediaCollection

				@listenTo view,"itemview:media:element:clicked",(iv) =>
												# trigger "media:element:clicked" event on the region. the main app controller will
												# listen to this event and get the clicked model and pass it on to edit media app
												Marionette.triggerMethod.call(@region, 
																			"media:element:clicked", 
																			Marionette.getOption(iv, 'model'));

				@show view, loading : true
				 
				
			# gets the main login view
			_getView :(mediaCollection)->
				new Grid.Views.GridView
									collection : mediaCollection


		Grid.on 'start',(options) =>
			new Grid.Controller
						region : options.region