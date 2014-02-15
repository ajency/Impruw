define ['app','apps/builder/site-builder/elements/menu/views'],
		(App)->

			App.module 'SiteBuilderApp.Element.Menu', (Menu, App, Backbone, Marionette, $, _)->

				# menu controller
				class Menu.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options = {})->
						super(options)

					_getMenuView:(templates, menu)->
						new Menu.Views.MenuView
								model 		: menu
								collection 	: menu.get 'menu_items'
								templates 	: templates

					# fetch new style
					fetchNewStyle:->
						console.log "fetch new style"

					# setup templates for the element
					setupViews: ->

						#listen to 
						model = @view.model
						@listenTo model, 'change:style', @fetchNewStyle

						menu = App.request "create:menu:model", @view.model.get('menu')
						menuCollection = App.request "get:collection", 'menucollection'
						if not menuCollection
							menuCollection = App.request "create:menu:collection"
							menuCollection.add menu
							App.request "set:collection",'menucollection', menuCollection

						menuView = @_getMenuView(@view.model.get('templates') ? {}, menu)

						@listenTo menuView, "show:menu:manager", ()=>
														App.vent.trigger "show:menu:manager"


						# listen to order change event
						# this will rerender the menu element with new order
						# view will sort the menu items wiht onBeforeRender function
						menu.get('menu_items').each (model,index)=>
							@listenTo model, 'change:order', menuView.render

						@addElementMarkup menuView