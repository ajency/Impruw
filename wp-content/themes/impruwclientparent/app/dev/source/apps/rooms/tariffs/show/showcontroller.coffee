define  ['app','controllers/base-controller', 'apps/rooms/tariffs/show/views'],(App, AppController)->

	App.module "RoomsApp.RoomsTariff.Show", (Show, App)->	

		class ShowController extends AppController

			initialize:(opt)->

				{@roomId} = opt

				if not @roomId 
					throw new Error "Invalid room id: #{@roomId}"

				pcollection = App.request "get:plans:collection"
				dcollection = App.request "get:daterange:collection"
				tcollection = App.request "get:tariffs:collection", @roomId
				
				@layout = @_getGridLayout()

				# get the packages view
				@packagesView = @_getPackagesView pcollection

				@tariffsView = @_getTariffsView tcollection, dcollection, pcollection

				@listenTo @tariffsView, 'itemview:show:edit:tariff', (iv,model)=>
					console.log model
					App.execute "show:edit:tariff", model

				@listenTo @tariffsView, 'itemview:show:add:tariff', (iv)=>
					console.log "dsdsd"
					App.execute "show:add:tariff", id

				@listenTo @layout, "show", =>
					@layout.packagesRegion.show @packagesView
					@layout.tariffRegion.show @tariffsView

				@show @layout, 
						loading : true

			# get the packages view
			_getPackagesView :(pCollection)->
				new Show.Views.PackagesView
							collection 	: pCollection

			# get the tariffs view
			_getTariffsView :(tcollection, dcollection, pCollection)->
				new Show.Views.TariffsView
							collection : tcollection
							dateRangeCollection : dcollection
							planCollection : pCollection
			
			# grid layout
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
				
				
			