define ['app', 'controllers/base-controller'
		'apps/rooms/add/views'
		'apps/rooms/facilities/facilitiesapp'], (App, AppController)->

	App.module 'RoomsApp.Add', (Add, App, Backbone, Marionette, $, _)->

		class Add.Controller extends AppController

			initialize:(options)->

				@layout = layout = @getAddRoomLayout()	

				@listenTo layout, "show", =>
						App.execute "show:facilities", 
                        					region : layout.facilitiesRegion
                       	App.execute "show:edit:slider",
                       					region :	layout.galleryRegion
                       					sliderId	: 1

					#App.execute "show:facilities", region : layout.facilitiesRegion
					#App.execute "show:tariff:app", region : layout.tariffRegion

				@listenTo @layout, "save:new:room", (data)=>
					@_saveNewRoom data
						
				@show layout

				App.navigate "rooms/add"


			_saveNewRoom:(data)=>
				roomModel = App.request "create:new:room:model", data
				
				roomModel.save null,
							wait : true
							success : @showSaveMessage

			showSaveMessage : =>
				@layout.triggerMethod "show:success:message"

			getAddRoomLayout : ()->
				new Add.View.AddRoomLayout

			
		App.commands.setHandler "show:add:room", (opts)->
				new Add.Controller
								