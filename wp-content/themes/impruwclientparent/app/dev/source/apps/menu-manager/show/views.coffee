define ['app'
		'text!apps/menu-manager/show/templates/menumanager.html'
		'text!apps/menu-manager/show/templates/menuitem.html'], (App, menumanagerTpl, menuItemTpl)->
	
			App.module 'MenuManager.Show.Views', (Views, App)->

				class MenuItemView extends Marionette.ItemView

					template : menuItemTpl

				# main menu manager view
				class Views.ManagerView extends Marionette.CompositeView

					template : menumanagerTpl

					itemView : MenuItemView

					itemViewContainer : 'ol.sortable-menu-items'

					# setup nested sortable onRender
					onRender1:->
						@$itemViewContainer.nestedSortable
												 handle : '.menu-drag-handle'
												 items 	: 'li.menu-item'

