define ['app'
		'text!apps/menu-manager/list/templates/menucollection.html'
		'text!apps/menu-manager/list/templates/menumanager.html'
		'text!apps/menu-manager/list/templates/menuitem.html'], (App, menucollectionTpl, menumanagerTpl, menuItemTpl)->
	
			App.module 'MenuManager.Show.Views', (Views, App)->

				class MenuItemView extends Marionette.ItemView

					initialize:->
						@listenTo @model, "change", @render

					template : menuItemTpl

					tagName : 'li'

					className : 'list-group-item'

					events:
						'click .update-menu-item' : -> 
							App.vent.trigger "childview:update:menu:item", @.model, Backbone.Syphon.serialize @

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

					events: 
						'click .add-menu-item' : ->
							formData = Backbone.Syphon.serialize @
							@trigger "new:menu:item:added", formData

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
						@on "childview:menu:order:changed",(iv,order)=> 
											@trigger "menu:order:changed", iv.model,order

					template : menucollectionTpl

					childView: SingleManagerView

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