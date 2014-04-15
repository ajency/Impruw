define ['app'
		'text!apps/menu-manager/show/templates/menucollection.html'
		'text!apps/menu-manager/show/templates/menumanager.html'
		'text!apps/menu-manager/show/templates/menuitem.html'], (App, menucollectionTpl, menumanagerTpl, menuItemTpl)->
	
			App.module 'MenuManager.List.Views', (Views, App)->

				class Views.MenuItemView extends Marionette.ItemView

					#initialize:->
						#@listenTo @model, "change", @render

					template : '<div>menuItemTpl</div>'

					tagName : 'li'

					className : 'list-group-item'

					#events:
						#'click .update-menu-item' : -> 
							#App.vent.trigger "itemview:update:menu:item", @.model, Backbone.Syphon.serialize @

					#onRender:->
						#@$el.attr 'id', 'item-' + @model.get 'ID'


		