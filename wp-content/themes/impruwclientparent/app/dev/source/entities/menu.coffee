define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.Menus", (Menus, App, Backbone, Marionette, $, _)->

			# menu item model
			class Menus.MenuItemModel extends Backbone.Model

				idAttribute : 'ID'

				defaults:
					post_title          : ''
					menu_item_link      : ''
					menu_item_parent    : 0

			# menu item collection class
			class Menus.MenuItemCollection extends Backbone.Collection
				model : Menus.MenuItemModel
				comparator : 'order'

				# update the model order attribute
				updateOrder:(newOrder = [], menuId)->
					_.each newOrder, (ele,index)=>
						model = @get ele
						model.set 'order', index + 1

					@trigger "menu:order:updated"
					@syncToServer newOrder,menuId

				syncToServer:(newOrder,menuId, options = {})->
					_action = 'update-menu-order'
					options.data = {}
					options.data.newOrder = newOrder.join()
					options.data.menuId   = menuId
					Backbone.send _action,options

			# menu model
			class Menus.MenuModel extends Backbone.AssociatedModel
				defaults : 
					menu_name           : ''
					menu_description    : ''
					menu_slug 			: ''
					menu_items          : []

				relations : [(
                                type : Backbone.Many
                                key  : 'menu_items'
                                relatedModel : Menus.MenuItemModel
                                collectionType : Menus.MenuItemCollection
							)]


			# menu collection
			class Menus.MenuCollection extends Backbone.Collection
				model : Menus.MenuModel

				parse :(resp)->
					if resp.code is 'OK'
						return resp.data 



			# API 
			API = 
				# get all site menus
				getMenus:(param = {})->

					menuCollection = App.request "get:collection", 'menucollection'

					if not menuCollection
						menuCollection = new Menus.MenuCollection
						# save menu collection
						App.request "set:collection", 'menucollection', menus

						menuCollection.url = AJAXURL + '?action=get-menus'

						menuCollection.fetch
								reset : true
								data  : param

					menuCollection

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

				createMenuCollection: (modelsArr = [])->
					new Menus.MenuCollection modelsArr

				# 
				createMenuModel :(menuData ={})->
					if not menuData.id
						throw new Error "no menu"

					items = menuData.menu_items
					menu = new Menus.MenuModel menuData
					menu.set 'menu_items', new Menus.MenuItemCollection items
					menu

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
			App.reqres.setHandler "create:menu:collection",(items)->
				API.createMenuCollection()

			# request handler to get all site menus
			App.reqres.setHandler "create:menu:model",(menu)->
				API.createMenuModel(menu)		


		App.Entities.Menus