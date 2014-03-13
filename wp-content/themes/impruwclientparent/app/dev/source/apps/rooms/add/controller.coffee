define ['app', 'controllers/base-controller'
		'apps/rooms/add/views'], (App, AppController)->

	App.module 'RoomsApp.Add', (Add, App, Backbone, Marionette, $, _)->

		class Add.Controller extends AppController

			initialize:(options)->

				{ @model } = options

				view = @.getAddView(@model)	

				@show view,
						loading : true


			getAddView : (room)->

				new Add.View.AddRoom
					model : room

			
		App.commands.setHandler "show:add:room", (opts)->

				#if not opt.region throw new Error 'Region not specified'

				new Add.Controller
							 	