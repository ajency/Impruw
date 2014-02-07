define ['app'
		'tpl!apps/builder/site-builder/show/templates/mainview'],
		(App, mainviewTpl)->


			App.module 'SiteBuilderApp.Show.View', (View, App, Backbone, Marionette, $, _)->

				class View.MainView extends Marionette.CompositeView

					template : mainviewTpl

				
			return App.SiteBuilderApp.Show.View