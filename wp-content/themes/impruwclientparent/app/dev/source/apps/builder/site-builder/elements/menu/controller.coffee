define ['app','apps/builder/site-builder/elements/menu/views','apps/builder/site-builder/elements/menu/settings/controller'],
		(App)->

			App.module 'SiteBuilderApp.Element.Menu', (Menu, App, Backbone, Marionette, $, _)->

				# menu controller
				class Menu.Controller extends App.SiteBuilderApp.Element.Controller

					# intializer
					initialize:(options)->

						_.defaults options.modelData,
											element 	: 'Menu'
											justified 	: false
											menu_id		: 2
											style 		: ''
						super(options)
						
					bindEvents:->
						# start listening to events
						@listenTo @layout.model, "change:menu_id", @renderElement
						@listenTo @layout.model, "change:style", @renderElement
						@listenTo @layout.model, "change:justified",(model)=>
							@layout.elementRegion.currentView.triggerMethod "set:justified",model.get 'justified'
						super()

					# create a new menu view
					_getMenuView:(collection,templateClass)->
						new Menu.Views.MenuView
								collection 		: collection,
								prop 			: @layout.model.toJSON()
								templateClass	: templateClass

					# setup templates for the element
					renderElement:()=>
						model = @layout.model
						# get menu 
						menu = App.request "get:menu:by:id", model.get 'menu_id'
						
						App.execute "when:fetched", menu, =>
							itemCollection = menu.get 'menu_items'
							#elementBox 	=  App.request "get:collection:model", "elementbox", 'Menu'
							#templates 	= elementBox.get('templates')
							templateClass = [model.get 'style'] ? ''

							view = @_getMenuView itemCollection,templateClass

							@listenTo itemCollection, "menu:order:updated", view.render

							@listenTo view, "open:menu:manager", ->
								App.navigate "menu-manager", trigger : true

							@layout.elementRegion.show view
