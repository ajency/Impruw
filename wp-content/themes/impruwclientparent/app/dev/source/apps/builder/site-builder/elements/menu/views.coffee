define ['app'],
		(App)->

			# Headerapp views
			App.module 'SiteBuilderApp.Element.Menu.Views', (Views, App, Backbone, Marionette, $, _)->
				
				# Menu item view
				class Views.MenuItemView extends Marionette.ItemView

					tagName : 'li'

					# pick the template from view options
					template :=>
						@options.template

				# Submenu view
				class Views.SubMenuView extends Marionette.CompositeView

					itemView : Views.MenuItemView

					itemViewContainer : 'ul.submenu'

				# Menu view
				class Views.MenuView extends Marionette.CompositeView

					itemView : Views.MenuItemView
					
					# override the build item view to handle template passing			
					buildItemView: (item, ItemViewType, itemViewOptions = {})=>
						itemViewOptions.template = @options.templates.menuItemTpl
						options = _.extend {model: item}, itemViewOptions
						new ItemViewType options
				  
					itemViewContainer : 'ul.menu'

					template :=>
						@options.templates.menuTpl

					#before rendering the view sort the collection 
					onBeforeRender:->
						@collection.sort()
						

			App.SiteBuilderApp.Element.Menu.Views