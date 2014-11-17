define ['app', 'apps/builder/site-builder/elements/menu/views',
        'apps/builder/site-builder/elements/menu/settings/controller'],
(App)->
    App.module 'SiteBuilderApp.Element.Menu', (Menu, App, Backbone, Marionette, $, _)->

        # menu controller
        class Menu.Controller extends App.SiteBuilderApp.Element.Controller

            # intializer
            initialize: (options)->
                #console.log options.modelData
                _.defaults options.modelData,
                    element: 'Menu'
                    justified: false
                    style: ''
                    menu_id : 0
                super(options)

            bindEvents: ->
                # start listening to events
                @listenTo @layout.model, "change:menu_id", @renderElement
                @listenTo @layout.model, "change:style", @renderElement
                @listenTo @layout.model, "change:justified", (model)=>
                    @layout.elementRegion.currentView.triggerMethod "set:justified", model.get 'justified'
                super()

            # create a new menu view
            _getMenuView: (collection, templateClass)->
                new Menu.Views.MenuView
                        collection: collection,
                        prop: @layout.model.toJSON()
                        templateClass: templateClass

            # setup templates for the element
            renderElement: ()=>
                model = @layout.model
                templateClass = [model.get 'style'] ? ''
                menuId = model.get('menu_id')
                if parseInt(menuId) > 0
                    menu = window.menusCollection.get menuId
                    menuItemCollection = menu.get 'menuItems'
                    if menuItemCollection.length is 0
                        menuItemCollection.fetch(menu_id : menuId)
                else 
                    menuItemCollection = new Backbone.Collection

                view = @_getMenuView(menuItemCollection, templateClass)

                @listenTo view, "menu:element:clicked", =>
                    App.execute "menu-manager", model, model.get 'menu_id'

                @layout.elementRegion.show view
