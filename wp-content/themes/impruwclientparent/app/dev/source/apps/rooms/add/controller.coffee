define ['app', 'controllers/base-controller'
		'apps/rooms/add/views'], (App, AppController)->

	App.module 'RoomsApp.Add', (Add, App, Backbone, Marionette, $, _)->

		class Add.Controller extends AppController

			initialize:(options)->

				@layout = layout = @getAddRoomLayout()	

				@listenTo layout, "show", =>
					@_showAddRoomForm()

				@show layout

				App.navigate "rooms/add"

			# show the form
			_showAddRoomForm:->
				@formView = @_getFormView()
				
				@listenTo @formView, "save:new:room", (data)=>
					@_saveNewRoom data

				@layout.formRegion.show @formView


			_saveNewRoom:(data)=>
				roomModel = App.request "create:new:room:model", data
				
				roomModel.save null,
							wait : true
							success : @showSaveMessage

			showSaveMessage : =>
				@formView.triggerMethod "show:success:message"

			_getFormView:->
				new Add.View.AddRoom

			getAddRoomLayout : ()->
				new Add.View.AddRoomLayout

			
		App.commands.setHandler "show:add:room", (opts)->
				new Add.Controller
								