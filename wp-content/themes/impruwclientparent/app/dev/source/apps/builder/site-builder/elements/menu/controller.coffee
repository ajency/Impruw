define ['app','apps/builder/site-builder/elements/menu/views','apps/builder/site-builder/elements/menu/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.Menu', (Menu, App, Backbone, Marionette, $, _)->

				# menu controller
				class Menu.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options = {})->
						super(options)
						@bindEvents()

					bindEvents:->
						# start listening to events
						@listenTo @view.model, "change:menu_id", @showView
						@listenTo @view.model, "change:style", @showView
						@listenTo @view.model, "change:draggable", @setDraggable
						@listenTo @view.model, "change:align",(model)=>
							@view.elementRegion.currentView.setAlignment model.get 'align'
						
					_getMenuView:(model, collection, templates)->
						new Menu.Views.MenuView
								model 		: model
								collection 	: collection,
								templates   : templates

					# set draggable
					setDraggable:(model)=>
						@view.triggerMethod "set:draggable", model.get 'draggable'
								
					# setup templates for the element
					showView:(model)=>
						# get menu 
						menu = App.request "get:collection:model", "menucollection", model.get 'menu_id'
						itemCollection = menu.get 'menu_items'

						elementBox =  App.request "get:collection:model", "elementbox", 'Menu'
						templates = elementBox.get('templates')[model.get 'style']

						view = @_getMenuView menu, itemCollection, templates
						@view.elementRegion.show view
