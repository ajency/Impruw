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

					initialize:(opt = {})->
						#assign template
						@template = opt.templates.menuTpl
						super(opt)

					itemView : Views.MenuItemView
					
					# # override the build item view to handle template passing			
					buildItemView: (item, ItemViewType, itemViewOptions = {})=>
						itemViewOptions.template = @options.templates.menuItemTpl
						super item, ItemViewType, itemViewOptions
				  
					itemViewContainer : 'ul.menu'

					# before rendering the view sort the collection
					# this helps to reorder the menu item elements before
					# the collection is rendered with item views
					onBeforeRender:->
						@collection.sort()
						

			App.SiteBuilderApp.Element.Menu.Views