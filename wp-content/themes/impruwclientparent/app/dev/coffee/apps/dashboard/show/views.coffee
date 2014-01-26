define ['app'
		'tpl!apps/dashboard/show/templates/mainview'],
		(App, mainviewTpl)->


			App.module 'DashboardApp.Show.View', (View, App, Backbone, Marionette, $, _)->

				class View.MainView extends Marionette.CompositeView

					template : mainviewTpl

				
			return App.DashboardApp.Show.View