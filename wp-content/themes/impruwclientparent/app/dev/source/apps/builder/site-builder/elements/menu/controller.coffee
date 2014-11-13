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
                    menuitems : []
                super(options)

            bindEvents: ->
                # start listening to events
                @listenTo @layout.model, "change:menu_id", @renderElement
                @listenTo @layout.model, "change:style", @renderElement
                @listenTo @layout.model, "change:justified", (model)=>
                    @layout.elementRegion.currentView.triggerMethod "set:justified", model.get 'justified'
                super()

            addNewMenuItem : ( menu ) =>

                menumodel = App.request "create:new:menu:item"

                menumodel.set 'menu_id', parseInt @layout.model.get 'menu_id'

                data =
                    menu_item_title: menu.get 'post_title'
                    page_id : menu.get 'original_id'
                    menu_item_parent: 0
                    order: 0

                menumodel.save data,
                    wait: true
                    success: @newMenuItemAdded

            newMenuItemAdded:(model)=>
                @menuCollection.add model

            # create a new menu view
            _getMenuView: (collection, templateClass)->
                new Menu.Views.MenuView
                    collection: collection,
                    prop: @layout.model.toJSON()
                    templateClass: templateClass

            _getMenuCollection: ->

                if _.isUndefined @menuCollection
                    
                    if @layout.model.get('menu_id') > 0
                        @menuCollection = App.request "get:menu:items:by:menuid", @layout.model.get 'menu_id'
                    else
                        @menuCollection = App.request "get:menu:item:collection"
                        # listen to add event to set menu Id to element  model
                        @menuCollection.once "add", (model)=>
                            @layout.model.set 'menu_id', model.get 'menu_id'
                            # save the model
                            @layout.model.save()

                @menuCollection

            # setup templates for the element
            renderElement: ()=>
                window.MENUID = parseInt @layout.model.get 'menu_id'
                @itemCollection = itemCollection = @_getMenuCollection()

                model = @layout.model

                App.execute "when:fetched", itemCollection, =>
                    templateClass = [model.get 'style'] ? ''

                    view = @_getMenuView itemCollection, templateClass

                    @menu_id = menu_id = @layout.model.get 'menu_id'

                    @listenTo itemCollection, "menu:order:updated", view.render
                    @listenTo view, "open:menu:manager", =>
                        App.execute "menu-manager", @itemCollection, @menu_id

                    @layout.elementRegion.show view
