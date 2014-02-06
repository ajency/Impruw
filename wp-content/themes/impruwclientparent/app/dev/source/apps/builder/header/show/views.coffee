define ['app'
		'tpl!apps/builder/header/show/templates/mainview'],
		(App, mainviewTpl)->


			App.module 'HeaderApp.Show.View', (View, App, Backbone, Marionette, $, _)->

				class View.MainView extends Marionette.CompositeView

					template : mainviewTpl

					className : 'navbar navbar-default'

				
			return App.HeaderApp.Show.View