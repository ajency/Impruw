define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.Row.Views', (Views, App, Backbone, Marionette, $, _)->
		

		# Menu item view
		class Views.RowView extends Marionette.ItemView

			className : 'row'

			template : '<div data-class="col-md-6" class="col-md-6 column empty-column"></div>
						<div data-class="col-md-6" class="col-md-6 column empty-column"></div>'

			onRender:()->
				@$el.find('.column').sortable 
										revert 		: 'invalid'
										items 		: '> .element-wrapper'
										connectWith : '.droppable-column,.column'
										#handle 		: '.aj-imp-drag-handle'
										start: (e, ui)->
        									ui.placeholder.height ui.item.height()
										helper 		: 'clone'
										opacity		: .65
										remove 		: (evt, ui)->
											if $(evt.target).children().length is 0
												$(evt.target).addClass 'empty-column'
										receive 	: (e,ui)->
											$(e.target).removeClass 'empty-column'
										