define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.Menus", (Menus, App, Backbone, Marionette, $, _)->

			# menu item model
			class Menus.MenuItemModel extends Backbone.Model

				idAttribute : 'ID'

				defaults:
					post_title          : ''
					menu_item_link      : ''
					menu_item_parent    : 0

				name: 'menu-item'

				parse : (resp)->
					if resp.code && resp.code is 'OK'
						return resp.data 

					return resp

				# override the default sync to make it wirk with wordpress :(
				sync:(method, model, options = {}) ->

					if not @name
						throw new Error "'name' property missing"

					if _.isFunction @name
						name = @name()
					else 
						name = @name

					# creation the action property with method name and name property
					# ex: create-model-name, delete-model-name, update-model-name, read-model-name
					_action = "#{method}-#{name}"
					
					options.data = model.toJSON()
					Backbone.send _action,options
					

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

				name: 'menu'


			# menu collection
			class Menus.MenuCollection extends Backbone.Collection
				model : Menus.MenuModel

				getSiteMenus:()->
					@map (model)->
						menu_id : model.get 'id'
						menu_name : model.get 'menu_name'

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
						App.request "set:collection", 'menucollection', menuCollection

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

				# create a new menu item instance onserver
				createMenuItemModel:(data, menuId)->
					# set the menu id
					data.menu_id = menuId
					menuitem = new Menus.MenuItemModel data
					menuitem.save null,
									wait : true
					menuitem
				# 
				createMenuModel :(menuData ={})->
					if not menuData.id
						throw new Error "no menu"

					items = menuData.menu_items
					menu = new Menus.MenuModel menuData
					menu.set 'menu_items', new Menus.MenuItemCollection items
					menu

				# update new menu item
				updateMenuItemModel:(menuitem, data)->
					console.log data
					menuitem.set data
					menuitem.save()
					menuitem


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

			# create new menu item
			App.reqres.setHandler "create:new:menu:item", (data, menuId)->
				API.createMenuItemModel data, menuId

			App.commands.setHandler "update:menu:item",(menuitem, data)->
				API.updateMenuItemModel menuitem, data


		App.Entities.Menus