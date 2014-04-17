define ['app'
		'text!apps/menu-manager/list/templates/menuitem.html'], (App,menuItemTpl)->
	
			App.module 'MenuManager.List.Views', (Views, App)->

				class MenuItemView extends Marionette.ItemView


					template : menuItemTpl

					tagName : 'li'

					className : 'list-group-item'

					modelEvents: 
						'change' :'render'

					onRender :->
						@$el.find('.sortable-menu-items').sortable()
					
					events: 
						'click .update-menu-item' :->
							formdata = Backbone.Syphon.serialize @
							@trigger "update:menu:item:clicked", formdata,@model
						
						'click .delete-menu-item' :->
							if confirm 'Delete the menu item?'
									@trigger "delete:menu:item:clicked",@model
						
						'click .cancel-menu-item' :->
							menu_id = @model.get 'menu_id'
							menu_item_id = @model.get 'ID'
							@$el.find('.menuname').val(@model.get 'menu_item_title')
							@$el.find('.menutitle').val(@model.get 'menu_item_url')
							@$el.find("#menuitem-#{menu_id}-#{menu_item_id}").click()


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

					className : 'aj-imp-menu-item-list'

					onMenuItemUpdated :->
						@$el.find('.alert').remove()
						@$el.prepend '<div class="alert alert-success">Menu item updated</div>'



