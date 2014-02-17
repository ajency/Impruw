define ['app'],
		(App)->

			# Headerapp views
			App.module 'SiteBuilderApp.Element.Menu.Views', (Views, App, Backbone, Marionette, $, _)->
				
				# Menu item view
				class Views.MenuItemView extends Marionette.ItemView

					initialize:(opt = {})->
						@template = opt.template
						super(opt)

					tagName : 'li'


				# Submenu view
				class Views.SubMenuView extends Marionette.CompositeView
					itemView : Views.MenuItemView
					itemViewContainer : 'ul.submenu'


				# Menu view
				class Views.MenuView extends Marionette.CompositeView
					tagName : 'ul'
					className : 'nav'
					itemView : Views.MenuItemView
					
					# item view options
					itemViewOptions :=>
						template : @options.eleModel.get('templates').menuItemTpl ? ''

					# on render set the class name
					onRender:->
						@$el.removeClass()
						@$el.addClass @className
						@$el.addClass @options.eleModel.get('templates').className

					# before rendering the view sort the collection
					# this helps to reorder the menu items before
					# the collection is rendered with item views
					onBeforeRender:->
						@collection.sort()

					#
					setAlignment:(model)=>
						@$el.removeClass 'navbar-left navbar-center navbar-right'
						@$el.addClass "navbar-#{_.slugify model.get 'alignment' }"
						

			App.SiteBuilderApp.Element.Menu.Views