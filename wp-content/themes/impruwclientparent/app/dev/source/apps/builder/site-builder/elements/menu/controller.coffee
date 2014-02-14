define ['app','apps/builder/site-builder/elements/menu/views'],
		(App)->

			App.module 'SiteBuilderApp.Element.Menu', (Menu, App, Backbone, Marionette, $, _)->

				# menu controller
				class Menu.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options = {})->
						super(options)


					_getMenuView:(templates, menuItems)->
						new Menu.Views.MenuView
								collection 	: menuItems
								templates 	: templates



					# setup templates for the element
					setupViews: ->
						#menu = App.request "create:menu:model", @view.model.get('menu')
						menuItems = App.request "create:menuitem:collection", @view.model.get('menu_items')

						window.menuView = @_getMenuView(@view.model.get('templates') ? {}, menuItems)

						#listen to order change event
						menuItems.each (model,index)=>
							@listenTo model, 'change:order', menuView.render

						@addElementMarkup menuView