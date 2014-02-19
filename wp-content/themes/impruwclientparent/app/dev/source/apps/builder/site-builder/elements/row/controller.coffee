define ['app','apps/builder/site-builder/elements/row/views','apps/builder/site-builder/elements/row/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.Row', (Row, App, Backbone, Marionette, $, _)->

				# menu controller
				class Row.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->
						super(options)
						@bindEvents()
						@showView()

					bindEvents:->
						# start listening to events
						@listenTo @layout.model, "change:style", @changeStyle
						@listenTo @layout.model, "change:draggable", @setDraggable
						
					_getRowView:()->
						new Row.Views.RowView
										model : @layout.model

					# set draggable
					setDraggable:(model)=>
						@layout.triggerMethod "set:draggable", model.get 'draggable'

					changeStyle:(model)->
						@layout.elementRegion.currentView.triggerMethod "style:change", model.get 'style', model.previousAttributes().style ? ''			
								
					# setup templates for the element
					showView:()=>
						@removeSpinner()
						# get menu 
						view = @_getRowView()
						@layout.elementRegion.show view

					# remove the element model
					deleteElement:(model)->
						if not @layout.elementRegion.currentView.$el.canBeDeleted()
							alert "Please remove elements inside row and then delete."							
						else
							model.destroy()
