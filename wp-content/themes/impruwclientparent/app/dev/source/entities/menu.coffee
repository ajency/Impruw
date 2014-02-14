define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.Menus", (Menus, App, Backbone, Marionette, $, _)->

			# menu model
			class Menus.MenuModel extends Backbone.Model
				defaults : 
					menu_name           : ''
					menu_description    : ''
					menu_items          : []

			# menu collection
			class Menus.MenuCollection extends Backbone.Collection
				model : Menus.MenuModel

			# menu item model
			class Menus.MenuItemModel extends Backbone.Model
				defaults:
					post_title          : ''
					menu_item_link      : ''
					menu_item_parent    : 0

			# menu item collection class
			class Menus.MenuItemCollection extends Backbone.Collection
				model : Menus.MenuItemModel
				comparator : 'order'


			# API 
			API = 
				# get all site menus
				getMenus:(param = {})->

					menus = new Menus.MenuCollection

					menus.url = AJAXURL + '?action=get-menus'

					menus.fetch
							reset : true
							data  : param

					menus

				# get all menu items for the passed menu
				# menuId = 0 if no menu is passed
				getMenuItems: (menuId = 0)->

					menuItems = new Menus.MenuItemCollection

					menuItems.url = "#{AJAXURL}?action=get-menu-items"

					menuItems.fetch
								reset : true
								data  : 
									menu_id : menuId

					menuItems	

				# creates a menu items collection 
				createMenuItemsCollection :(items)->
					items = [] if not _.isArray(items)
					new Menus.MenuItemCollection items

				# 
				createMenuModel :(menu ={})->
					if not menu.id
						throw new Error "no menu"
						
					new Menus.MenuModel menu

			# request handler to get all site menus
			App.reqres.setHandler "get:site:menus", ->
				API.getMenus()

			# request handler to get all site menus
			App.reqres.setHandler "get:menu:menuitems",(menuId)->
				API.getMenuItems(menuId)

			# request handler to get all site menus
			App.reqres.setHandler "create:menuitem:collection",(items)->
				API.createMenuItemsCollection(items)

			# request handler to get all site menus
			App.reqres.setHandler "create:menu:model",(menu)->
				API.createMenuModel(menu)		


		App.Entities.Menus