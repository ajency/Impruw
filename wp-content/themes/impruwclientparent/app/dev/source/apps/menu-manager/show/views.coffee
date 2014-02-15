define ['app'
		'text!apps/menu-manager/show/templates/menucollection.html'
		'text!apps/menu-manager/show/templates/menumanager.html'
		'text!apps/menu-manager/show/templates/menuitem.html'], (App, menucollectionTpl, menumanagerTpl, menuItemTpl)->
	
			App.module 'MenuManager.Show.Views', (Views, App)->

				class MenuItemView extends Marionette.ItemView

					template : menuItemTpl

				# main menu manager view
				class SingleManagerView extends Marionette.CompositeView

					initialize:(opt)->
						@itemIndex = opt.itemIndex
						super opt

					template : menumanagerTpl

					itemView : MenuItemView

					itemViewContainer : 'ol.sortable-menu-items'

					className : 'tab-pane'

					# setup nested sortable onRender
					onRender:->
						# set active class
						if @itemIndex is 0
							@$el.addClass 'active'

						@$el.attr 'id', @model.get 'menu_slug'


				# main view
				class Views.MenuManagerView extends Marionette.CompositeView

					template : menucollectionTpl

					itemView: SingleManagerView

					itemViewOptions:(item, index)->
									itemIndex : index
									collection: item.get 'menu_items'

					serializeData: ->
						data = 
							menus : []

						@collection.each (model, index)->
							menu = {}
							menu.menu_slug = model.get('menu_slug')
							menu.menu_name = model.get('menu_name')
							data.menus.push menu

						data

					itemViewContainer : '.tab-content'