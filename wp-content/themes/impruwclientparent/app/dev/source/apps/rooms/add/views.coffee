define ['app'],
		(App)->

			App.module 'RoomsApp.Add.View', (View, App, Backbone, Marionette, $, _)->

				class View.AddRoom extends Marionette.ItemView

					template : '<h3>New Region for add new room</h3>'


			App.RoomsApp.Add.View