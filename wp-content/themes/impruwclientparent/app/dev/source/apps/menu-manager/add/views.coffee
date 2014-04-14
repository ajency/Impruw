define ['app'
		'text!apps/menu-manager/show/templates/menucollection.html'
		'text!apps/menu-manager/show/templates/menumanager.html'
		'text!apps/menu-manager/show/templates/menuitem.html'], (App, menucollectionTpl, menumanagerTpl, menuItemTpl)->
	
			App.module 'MenuManager.Add.Views', (Views, App)->

				class MenuItemView extends Marionette.ItemView


					template : menuItemTpl

					tagName : 'li'

					className : 'list-group-item'


				# main menu manager view
				class SingleManagerView extends Marionette.CompositeView


					template : menumanagerTpl

					itemView : MenuItemView

					itemViewContainer : 'ol.sortable-menu-items'

					className : 'tab-pane'

				# main view
				class Views.MenuManagerView extends Marionette.CompositeView


					template : menucollectionTpl

					itemView: SingleManagerView

	

					itemViewContainer : '.tab-content'