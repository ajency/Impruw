define  ['app','controllers/base-controller', 'apps/rooms/tariffs/show/views'],(App, AppController)->

	App.module "RoomsApp.RoomsTariff.Show", (Show, App)->	

		class EditTariffController extends AppController

			initialize:(opt)->

				{@tariffId} = opt

				tariff = App.request "get:tariff", @tariffId

				@tariffView = tariffView = @_getTariffView tariff

				@show tariffView, 
						loading : true

			# get the packages view
			_getTariffView :(pCollection)->
				new Show.Views.PackagesView
							collection 	: pCollection


		class GridLayout extends Marionette.Layout

			template :'	<div id="packages-region"></div>
						<div id="tariff-region"></div>'

			regions : 
				packagesRegion : '#packages-region'
				tariffRegion   : '#tariff-region'


		App.execute "show:edit:tariff", (id)->
			new EditTariffController 
							tariffId : id
							region : App.dialogRegion