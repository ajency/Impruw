define  ['app','controllers/base-controller', 'apps/rooms/tariffs/show/views'],(App, AppController)->

	App.module "RoomsApp.RoomsTariff.Show", (Show, App)->	

		class ShowController extends AppController

			initialize:(opt)->

				pcollection = App.request "get:packages:collection"
				dcollection = App.request "get:daterange:collection", id : 23232
				
				@layout = @_getGridLayout()

				# get the packages view
				@packagesView = @_getPackagesView pcollection

				@dateRangeView = @_getDateRangeView dcollection

				@listenTo @dateRangeView, 'itemview:show:edit:tariff', (id)=>
					App.execute "show:edit:tariff", id

				@listenTo @layout, "show", =>
					@layout.packagesRegion.show @packagesView
					@layout.tariffRegion.show @dateRangeView

				@show @layout, 
						loading : true

			# get the packages view
			_getPackagesView :(pCollection)->
				new Show.Views.PackagesView
							collection 	: pCollection

			# get the tariffs view
			_getDateRangeView :(dCollection)->
				new Show.Views.TariffsView
							collection : dCollection
							
			_getGridLayout:->
				new GridLayout


		class GridLayout extends Marionette.Layout

			template :'	<div id="packages-region"></div>
						<div id="tariff-region"></div>'

			regions : 
				packagesRegion : '#packages-region'
				tariffRegion   : '#tariff-region'


		App.commands.setHandler "show:tariff:grid", (opt)->

			new ShowController opt
				
				
			