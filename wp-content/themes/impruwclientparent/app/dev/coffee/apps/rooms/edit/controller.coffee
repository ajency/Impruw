define ['app', 'controllers/base-controller'
		'apps/rooms/edit/views','entities/facilities','entities/media'], (App, AppController)->

	App.module 'RoomsApp.Edit', (Edit, App, Backbone, Marionette, $, _)->

		class Edit.Controller extends AppController

			initialize:(options)->

				{ @model } = options

				view = @.getEditView(@model)	

				@show view,
						loading : true


			getEditView : (room)->

				new Edit.View.EditRoom
					model : room

			
	App.RoomsApp.Edit.Controller		