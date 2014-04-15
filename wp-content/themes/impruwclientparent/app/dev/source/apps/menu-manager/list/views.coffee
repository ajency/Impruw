define ['app'
		'text!apps/menu-manager/list/templates/menuitem.html'], (App,menuItemTpl)->
	
			App.module 'MenuManager.List.Views', (Views, App)->

				class MenuItemView extends Marionette.ItemView


					template : menuItemTpl

					tagName : 'li'

					className : 'list-group-item'

					


				# main menu manager view
				class Views.MenuCollectionView extends Marionette.CompositeView


					template : '<div class="panel panel-default">
										<div class="panel-heading">
											<h3 class="panel-title">{{menu_name}}</h3>
										</div>
										<ol class="list-group sortable-menu-items ui-sortable"></ol>
								</div>'

					itemView : MenuItemView

					itemViewContainer : 'ol.sortable-menu-items'

					className : 'col-md-6 aj-imp-menu-item-list'
