define ['app','apps/builder/site-builder/elements/menu/views','apps/builder/site-builder/elements/menu/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.Menu', (Menu, App, Backbone, Marionette, $, _)->

				# menu controller
				class Menu.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->
						super(options)
						@bindEvents()

						# show if model is ready
						if not @layout.model.isNew()
							@showView @layout.model

					bindEvents:->
						# start listening to events
						@listenTo @layout.model, "change:menu_id", @showView
						@listenTo @layout.model, "change:style", @showView
						@listenTo @layout.model, "change:draggable", @setDraggable
						@listenTo @layout.model, "change:justified",(model)=>
							@layout.elementRegion.currentView.triggerMethod "set:justified",model.get 'justified'

						# @listenTo @layout.model, "change:align",(model)=>
						# 	@layout.elementRegion.currentView.setAlignment model.get 'align'
						
					_getMenuView:(model, collection, templates)->
						new Menu.Views.MenuView
								model 		: model
								collection 	: collection,
								templates   : templates
								prop 		: @layout.model.toJSON()

					# set draggable
					setDraggable:(model)=>
						@layout.triggerMethod "set:draggable", model.get 'draggable'
								
					# setup templates for the element
					showView:(model)=>
						# get menu 
						menu = App.request "get:collection:model", "menucollection", model.get 'menu_id'
						itemCollection = menu.get 'menu_items'

						elementBox =  App.request "get:collection:model", "elementbox", 'Menu'
						templates = elementBox.get('templates')[model.get 'style']

						view = @_getMenuView menu, itemCollection, templates
						@layout.elementRegion.show view
