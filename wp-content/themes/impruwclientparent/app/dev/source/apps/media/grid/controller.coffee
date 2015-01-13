define [ 'app', 'controllers/base-controller', 'apps/media/grid/views' ], ( App, AppController )->

	#Login App module
	App.module "Media.Grid", ( Grid, App )->

		#Show Controller
		class Grid.Controller extends AppController

			# initialize
			initialize : (opt)->


				MediaCollection = App.request "fetch:media", true
				
				@mediaCollection = window.f = new MediaCollection
				@mediaCollection.fetch()

				view = @_getView @mediaCollection, opt.type

				@listenTo view, "childview:media:element:selected", ( iv ) =>
					# trigger "media:element:clicked" event on the region. the main app controller will
					# listen to this event and get the clicked model and pass it on to edit media app
					Marionette.triggerMethod.call( @region,
					  "media:element:selected",
					  Marionette.getOption( iv, 'model' ) )

				@listenTo view, "childview:media:element:unselected", ( iv ) =>
					Marionette.triggerMethod.call( @region,
					  "media:element:unselected",
					  Marionette.getOption( iv, 'model' ) )

				@listenTo view, "childview:delete:media:image", ( iv, model ) =>
					@deleteImage model

				@listenTo view, "childview:show:image:editor", (iv, model) =>
					_region = @region
					ratio  = App.currentImageRatio
					editView = App.request "get:image:editor:view", model, 
																	aspectRatio : ratio
																					 
																					 
					view.triggerMethod "show:edit:image", editView
					view.listenTo editView, "image:editing:cancelled", ->
						view.triggerMethod "image:editing:cancelled"
						_.delay ->
							Marionette.triggerMethod.call( _region,"media:element:selected",model)

				App.commands.setHandler "new:media:added",(media,showGrid = false)=>
                    @mediaCollection.add media
                    if showGrid
                    	@mediaCollection.trigger 'show:grid'

				@show view, loading : true


			# gets the main login view
			_getView : ( mediaCollection , type)->
				new Grid.Views.GridView
					collection : mediaCollection
					type : type

			#delete a image from the gallery
			deleteImage : ( imageModel )->
				App.execute 'remove:media', imageModel
				imageModel.destroy
					allData : false
					wait : true

		App.commands.setHandler 'start:media:grid:app', ( options ) =>
			new Grid.Controller
				region : options.region
				type : options.type
