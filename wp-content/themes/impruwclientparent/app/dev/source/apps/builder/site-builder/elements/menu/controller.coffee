define ['app','apps/builder/site-builder/elements/menu/views','apps/builder/site-builder/elements/menu/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.Menu', (Menu, App, Backbone, Marionette, $, _)->

				# menu controller
				class Menu.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options = {})->
						super(options)
						# start listening to events
						@listenTo @view.model, "change:menu_id", @showView
						
					_getMenuView:(model, collection)->
						new Menu.Views.MenuView
								model 		: model
								collection 	: collection
								
					# setup templates for the element
					showView:(model)=>
						# get menu 
						menu = App.request "get:collection:model", "menucollection", model.get 'menu_id'
						itemCollection = menu.get 'menu_items'
						view = @_getMenuView menu, itemCollection
						@view.elementRegion.show view
