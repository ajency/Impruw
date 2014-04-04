define  ['app'
		'controllers/base-controller'
		'apps/rooms/tariffs/show/showcontroller'
		'apps/rooms/tariffs/edittariff/edittariff'
		'apps/rooms/tariffs/addtariff/addtariff'
		'apps/rooms/tariffs/daterange/adddaterange'
		'apps/rooms/tariffs/plan/addplan'],(App, AppController)->

			App.module "RoomsApp.RoomsTariff", (RoomsTariff, App)->

				# main controller
				class RoomsTariff.RoomsTariffAppController extends AppController

					initialize:(opt)->

						{roomId} = opt

						# get the layout 
						@layout = @_getLayout()

						@listenTo @layout, "show", =>
							App.execute "show:tariff:grid", 
											region : @layout.tariffGridRegion
											roomId : roomId

						@listenTo @layout, "show:add:daterange", =>
							App.execute "show:add:daterange"
						
						@listenTo @layout, "show:add:plan", =>
							App.execute "show:add:plan"
						 
						@show @layout
					
					_getLayout : ->
						new RoomsTariffAppLayout

				# Rooms tariff layout 				
				class RoomsTariffAppLayout extends Marionette.Layout

					className : 'room-tariff-container'

					template : '</div>
								<div class="room-tariff-grid" id="room-tariff-grid"></div>
								<button type="button" class="btn-add-range"><span class="glyphicon glyphicon-plus-sign"></span>&nbsp;Add Date Range</button>'

					events : 
						'click .btn-add-range' : ->
							@trigger "show:add:daterange"
						'click .btn-add-plan' : ->
							@trigger "show:add:plan"

					regions : 
						tariffGridRegion : '#room-tariff-grid' 


				# set the command handler
				App.commands.setHandler "show:rooms:tariffs:app", (opt)->
					new RoomsTariff.RoomsTariffAppController opt


