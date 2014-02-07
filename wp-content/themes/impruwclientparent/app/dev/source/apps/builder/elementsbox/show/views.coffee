define ['app'
		'tpl!apps/builder/elementsbox/show/templates/main'
		'tpl!apps/builder/elementsbox/show/templates/singleelement'],
		(App, mainviewTpl, singleEleTpl)->

			App.module 'ElementsBoxApp.Show.Views', (Views, App, Backbone, Marionette, $, _)->

				# Composite view wrapper for element box region
				class Views.MainView extends Marionette.CompositeView

					template 	: mainviewTpl

					className 	: 'aj-imp-drag-menu'

					id 			: 'controls-drag'

				# Single element region
				class Views.SingleElement extends Marionette.ItemView

					template 	: singleEleTpl

				
			App.ElementsBoxApp.Show.Views