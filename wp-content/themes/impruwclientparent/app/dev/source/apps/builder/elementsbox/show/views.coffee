define ['app'
		'text!apps/builder/elementsbox/show/templates/main.html'
		'text!apps/builder/elementsbox/show/templates/error.html'],
		(App, mainviewTpl, singleEleTpl, errorTpl)->

			App.module 'ElementsBoxApp.Show.Views', (Views, App, Backbone, Marionette, $, _)->

				# Single element region
				class Views.SingleElement extends Marionette.ItemView

					tagName : 'li'

					className : 'element'

					template 	: '<a href="#" class="drag builder-element">
										<div class="aj-imp-builder-icon {{icon}}"></div>
    									<div class="aj-imp-builder-title">{{elementName}}</div>
    								</a>'

					serializeData:->
						data = super()
						data.elementName = ->
							if @title 
								return @title 
							else 
								return @element

						data 
								
				
				# Composite view wrapper for element box region
				class Views.MainView extends Marionette.CompositeView

					template 	: mainviewTpl

					className 	: 'aj-imp-drag-menu'

					id 			: 'controls-drag'

					itemView 	: Views.SingleElement

					# on show make the element draggable
					# secondly, make all the elements draggable
					onShow:->
						@$el.draggable
								handle: "p.desc",
								addClasses: false

						@_setDraggableElements()
	
					# append html
					appendHtml:(cv, view, index)->

						return if view.model.get('element') is 'Row'

						category = view.model.get('category') || 'content'
						switch category
							when 'hotel'
								@$el.find('#hotel-elements ul').append view.$el
							when 'room'
								@$el.find('#room-elements ul').append view.$el
							else
								@$el.find('#content-elements ul').append view.$el


					# set draggable elements
					_setDraggableElements:->
						@$el.find('*[data-element]').draggable
														connectToSortable	: '.droppable-column'
														helper 				: 'clone'
														delay 				: 5
														addClasses			: false
														distance 			: 5
														revert 				: 'invalid'