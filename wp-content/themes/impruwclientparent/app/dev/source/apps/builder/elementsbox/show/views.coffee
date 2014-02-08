define ['app'
		'tpl!apps/builder/elementsbox/show/templates/main'
		'tpl!apps/builder/elementsbox/show/templates/singleelement'
		'tpl!apps/builder/elementsbox/show/templates/error'],
		(App, mainviewTpl, singleEleTpl, errorTpl)->

			App.module 'ElementsBoxApp.Show.Views', (Views, App, Backbone, Marionette, $, _)->

				# Single element region
				class Views.SingleElement extends Marionette.ItemView

					template 	: singleEleTpl

				# Error view 
				class Views.ErrorView extends Marionette.ItemView

					template 	: errorTpl


				# Composite view wrapper for element box region
				class Views.MainView extends Marionette.CompositeView

					template 	: mainviewTpl

					className 	: 'aj-imp-drag-menu'

					id 			: 'controls-drag'

					itemView 	: Views.SingleElement

					itemViewContainer : 'ul.aj-imp-builder-items'

					# on show make the element draggable
					# secondly, make all the elements draggable
					onShow:->
						@$el.draggable
								handle: "p.desc",
								addClasses: false

						@_setDraggableElements()

					# set draggable elements
					_setDraggableElements:->
						@$el.find('*[data-element]').draggable
														connectToSortable	: '.droppable-column'
														helper 				: 'clone'
														delay 				: 5
														addClasses			: false
														distance 			: 5
														revert 				: 'invalid'
				

				

				
			App.ElementsBoxApp.Show.Views