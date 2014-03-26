define ['app', 'controllers/base-controller'
		'apps/rooms/add/views'
		'apps/rooms/facilities/facilitiesapp'
		'apps/rooms/gallery/galleryapp'], (App, AppController)->

	App.module 'RoomsApp.Add', (Add, App, Backbone, Marionette, $, _)->

		class Add.Controller extends AppController

			initialize:(options)->

				@layout = layout = @getAddRoomLayout()	

				@slidesCollection = App.request "get:slides:collection"

				@listenTo layout, "show", =>
						App.execute "show:facilities", 
											region : layout.facilitiesRegion

						App.execute "show:gallery:images", 
											region : layout.galleryRegion
											collection : @slidesCollection
						
						App.execute "show:rooms:tariffs:app",
										region : layout.roomTariffRegion

				@listenTo @layout, "show:edit:slider", =>

					App.execute "show:slides:list",
										region : App.dialogRegion
										collection : @slidesCollection

				# listen to add event of collection. when a new model is added to
				# collection pick the slider id and hold it for future slides
				@slidesCollection.on "add remove",(model)=>
					@layout.triggerMethod "set:slider:id", model.get 'slider_id'
					App.execute "show:gallery:images", 
											region : layout.galleryRegion
											collection : @slidesCollection


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
								