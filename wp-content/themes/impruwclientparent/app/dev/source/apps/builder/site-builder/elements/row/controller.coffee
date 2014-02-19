define ['app','apps/builder/site-builder/elements/row/views','apps/builder/site-builder/elements/row/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.Row', (Row, App, Backbone, Marionette, $, _)->

				# menu controller
				class Row.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											draggable : true
											style 	  : ''

						super(options)
						@bindEvents()
						@showView()
						@addPropertiesField()

					bindEvents:->
						# start listening to events
						@listenTo @layout.model, "change:style", @changeStyle
						@listenTo @layout.model, "change:draggable", @setDraggable

					addPropertiesField:->
						@layout.$el.children('form').append '<input type="hidden" name="draggable" value=""/>'
						@layout.$el.children('form').append '<input type="hidden" name="style" value=""/>'
						@setDraggable @layout.model
						@changeStyle @layout.model
						
					_getRowView:()->
						new Row.Views.RowView
										model : @layout.model

					# set draggable
					setDraggable:(model)=>
						@layout.triggerMethod "set:draggable", model.get 'draggable'
						@layout.$el.children('form').find('input[name="draggable"]').val model.get 'draggable'

					changeStyle:(model)->
						@layout.elementRegion.currentView.triggerMethod "style:change", model.get('style'), model.previousAttributes().style ? ''	
						@layout.$el.children('form').find('input[name="style"]').val model.get 'style'		
								
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
