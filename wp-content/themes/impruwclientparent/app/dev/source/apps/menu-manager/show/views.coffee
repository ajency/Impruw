define ['app'
		'text!apps/menu-manager/show/templates/menucollection.html'
		'text!apps/menu-manager/show/templates/menumanager.html'
		'text!apps/menu-manager/show/templates/menuitem.html'], (App, menucollectionTpl, menumanagerTpl, menuItemTpl)->
	
			App.module 'MenuManager.Show.Views', (Views, App)->

				class MenuItemView extends Marionette.ItemView

					template : menuItemTpl

					tagName : 'li'

					className : 'list-group-item'

					onRender:->
						@$el.attr 'id', 'item-' + @model.get 'ID'

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

						@$el.find('.sortable-menu-items').sortable
													handle 	: 'div.menu-dragger'
													items 	: 'li.list-group-item'
													toleranceElement: '> div'
													stop : (e,ui)=>
														order = @$el.find('.sortable-menu-items').sortable 'toArray'
														@trigger 'menu:order:changed', order


				# main view
				class Views.MenuManagerView extends Marionette.CompositeView

					initialize:->
						@on "itemview:menu:order:changed",(iv,order)=> 
											@trigger "menu:order:changed", iv.model,order

					template : menucollectionTpl

					itemView: SingleManagerView

					itemViewOptions:(item, index)->
									itemIndex : index
									collection: item.get 'menu_items'

					dialogOptions : 
						modal_title : 'Menu Manager'

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