define ['app','apps/builder/site-builder/elements/row/views','apps/builder/site-builder/elements/row/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.Row', (Row, App, Backbone, Marionette, $, _)->

				# menu controller
				class Row.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											element  	: 'Row'
											columncount : 2
											elements 	: []
											meta_id 	: 0

						super(options)
						
					bindEvents:->
						# start listening to model events
						@listenTo @layout.model, "change:style", @changeStyle
						@listenTo @layout.model, "change:columncount", @columnCountChanged
						super()

					_getRowView:()->
						new Row.Views.RowView
										model : @layout.model

					columnCountChanged:(model)->
						@layout.elementRegion.currentView.triggerMethod "column:count:changed", model.get 'columncount'

					changeStyle:(model)->
						prevStyle = model.previousAttributes().style ? ''
						newStyle  = model.get('style')
						console.log newStyle
						@layout.elementRegion.currentView.triggerMethod "style:changed", newStyle, prevStyle	
						@layout.setHiddenField 'style', newStyle
								
					# setup templates for the element
					renderElement:()=>
						@removeSpinner()
						# get menu 
						view = @_getRowView()
						@layout.elementRegion.show view
						@changeStyle @layout.model

					# remove the element model
					deleteElement:(model)->
						if not @layout.elementRegion.currentView.$el.canBeDeleted()
							alert "Please remove elements inside row and then delete."							
						else
							model.destroy()
