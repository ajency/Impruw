define ['app'
		'tpl!apps/builder/elementsbox/show/templates/main'],
		(App, mainviewTpl)->


			App.module 'ElementsBoxApp.Show.View', (View, App, Backbone, Marionette, $, _)->

				class View.MainView extends Marionette.CompositeView

					template 	: mainviewTpl

					className 	: 'aj-imp-drag-menu'

					id 			: 'controls-drag'

				
			App.ElementsBoxApp.Show.View