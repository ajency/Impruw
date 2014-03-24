define  ['app'
		'controllers/base-controller'
		'apps/rooms/tariffs/show/showcontroller'
		'apps/rooms/tariffs/edittariff/edittariff'],(App, AppController)->

			App.module "RoomsApp.RoomsTariff", (RoomsTariff, App)->

				# main controller
				class RoomsTariff.RoomsTariffAppController extends AppController

					initialize:(opt)->

						# get the layout 
						@layout = @_getLayout()

						@listenTo @layout, "show", @showTariffGrid

						@show @layout
					
					_getLayout : ->
						new RoomsTariffAppLayout

					showTariffGrid :->
						App.execute "show:tariff:grid", region : @layout.tariffGridRegion


				# Rooms tariff layout 				
				class RoomsTariffAppLayout extends Marionette.Layout

					className : 'room-tariff-container'

					template : '<div class="room-tariff-title">
		                            <h4>Room Price</h4>
		                            <h5>Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada</h5>
		                        </div>
		                        <div class="room-tariff-grid" id="room-tariff-grid"></div>'

					regions : 
						tariffGridRegion : '#room-tariff-grid' 


				# set the command handler
				App.commands.setHandler "show:rooms:tariffs:app", (opt)->
					new RoomsTariff.RoomsTariffAppController opt


