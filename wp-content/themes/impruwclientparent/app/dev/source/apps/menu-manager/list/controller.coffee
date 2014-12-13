define [ 'app', 'controllers/base-controller', 'apps/menu-manager/list/views' ], ( App, AppController )->

	#Login App module
	App.module "MenuManager.List", ( List, App )->

		#Show Controller
		class List.Controller extends AppController

			# initialize
			initialize : ( opts )->
				{@menuId, @menuElementModel} = opts

				menu = window.menusCollection.get @menuId

				@menuItemsCollection = menuItemsCollection = menu.get 'menuItems'

				if menuItemsCollection.length is 0
					menuItemsCollection.fetch(menu_id : @menuId).done =>
						@view = view = @_getView menuItemsCollection
						@bindMenuItemEvents()
						@show @view
				else
					@view = view = @_getView menuItemsCollection
					@bindMenuItemEvents()
					@show @view

			bindMenuItemEvents : ->
				@listenTo @view, "itemview:delete:menu:item:clicked", @deleteMenuItem
				@listenTo @view, "itemview:update:menu:item:clicked", @updateMenuItem
				@listenTo @view, "menu:item:order:updated", @menutItemsOrderUpdated

			menutItemsOrderUpdated : (_menuItems)=>
				data = 
					action : 'builder-update-menu-items-order'
					menu_items : _menuItems
					menu_id : @menuId

				$.post AJAXURL, data, (response)=>
					
					if response is 1
						_.each _menuItems, (item)=>
							model = @menuItemsCollection.get item['ID']
							delete item['ID']
							model.set item

						@menuElementModel.trigger 'change:menu_id'
						@view.triggerMethod 'menu:order:updated'

				, 'json'

			updateMenuItem : (childView, menuData, model)->
				data = 
					action : 'builder-update-menu-item'
					menu_data : menuData

				$.post AJAXURL, data, (response)->
					model.set 'title', menuData['menu-item-title']
					model.set 'url', menuData['menu-item-url']
				, 'json'

			deleteMenuItem : (childView, model)->
				data = 
					action : 'builder-remove-menu-item'
					menu_item_id : model.get 'ID'

				$.post AJAXURL, data, (response)->
					model.collection.remove model
				, 'json'

			_getView : ( menuItemsCollection ) ->
				new List.Views.MenuCollectionView
									collection : menuItemsCollection


		App.commands.setHandler "list:menu:items:app", ( opts )->
			new List.Controller opts

			