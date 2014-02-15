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

					events : 
						'click li' : (evt)->
							evt.stopPropagation()
							@trigger "show:menu:manager", @model

					initialize:(opt = {})->
						#assign template
						@template = opt.templates.menuTpl ? ''
						super(opt)	

					itemView : Views.MenuItemView
					
					itemViewOptions :=>
						template : @options.templates.menuItemTpl ? ''

					itemViewContainer : 'ul.menu'

					# before rendering the view sort the collection
					# this helps to reorder the menu items before
					# the collection is rendered with item views
					onBeforeRender:->
						@collection.sort()
						

			App.SiteBuilderApp.Element.Menu.Views