define ['app','bootbox','apps/builder/site-builder/elements/row/views','apps/builder/site-builder/elements/row/settings/controller'],
		(App,bootbox)->

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
						prevStyle = model.previous('style') ? ''
						newStyle  = model.get('style')
						@layout.elementRegion.currentView.triggerMethod "style:changed", _.slugify(newStyle), _.slugify(prevStyle)	
						@layout.setHiddenField 'style', newStyle
								
					# setup templates for the element
					renderElement:()=>
						@removeSpinner()
						# get menu 
						row = @_getRowView()

						@listenTo row, "itemview:element:moved", @elementMoved

						@layout.elementRegion.show row
						@changeStyle @layout.model

					# element moved
					elementMoved:(columnView, container)=>
						# App.execute "mark:section:as:modified", container
						# App.execute "auto:save"

					# remove the element model
					deleteElement:(model)->
						if not @layout.elementRegion.currentView.$el.canBeDeleted()
							bootbox.alert "Please remove elements inside row and then delete.", ->						
						else
							model.destroy()
