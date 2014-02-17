define ['app','apps/builder/site-builder/elements/row/views','apps/builder/site-builder/elements/row/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.Row', (Row, App, Backbone, Marionette, $, _)->

				# menu controller
				class Row.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options = {})->
						super(options)
						@bindEvents()
						@showView()

					bindEvents:->
						# start listening to events
						@listenTo @view.model, "change:style", @changeStyle
						@listenTo @view.model, "change:draggable", @setDraggable
						
					_getRowView:()->
						new Row.Views.RowView

					# set draggable
					setDraggable:(model)=>
						@view.triggerMethod "set:draggable", model.get 'draggable'

					changeStyle:(model)->
						@view.triggerMethod "set:style", model.get 'style'						
								
					# setup templates for the element
					showView:()=>
						# get menu 
						view = @_getRowView()
						@view.elementRegion.show view
