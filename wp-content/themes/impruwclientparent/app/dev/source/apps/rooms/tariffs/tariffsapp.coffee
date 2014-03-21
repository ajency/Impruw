define  ['app','controllers/base-controller', 'apps/rooms/tariffs/show/showcontroller'],(App, AppController)->

	App.module "RoomsApp.RoomsTariff", (RoomsTariff, App)->

		# main controller
		class RoomsTariff.RoomsTariffAppController extends AppController

			initialize:(opt)->

				# get the layout 
				@layout = @getLayout()

				@show @layout
			
			_getLayout : ->
				new RoomsTariffAppLayout


		# Rooms tariff layout 				
		class RoomsTariffAppLayout extends Marionette.Layout

			template : 'rooms tariff layout'

			regions : 
				viewRegion : '#view-region' 


		# set the command handler
		App.commands.setHandler "show:rooms:tariffs:app", (opt)->
			region = if opt.region then opt.region
			new RoomsTariff.RoomsTariffAppController opt


