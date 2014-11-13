define ["app", 'backbone'], (App, Backbone) ->

    App.module "Entities.Menus", (Menus, App, Backbone, Marionette, $, _)->

        class Menus.MenuItemModel extends Backbone.Model

            idAttribute : 'menu-item-db-id'

            url : ->
                menuId = @get 'menu_id'
                if @isNew() then "/menus/#{menuId}" else "/menus/#{@get 'id'}"


        class Menus.MenuItemCollection extends Backbone.Collection
            model : Menus.MenuItemModel

            fetch : (data)->
                


        class Menus.MenuModel extends Backbone.Model 

            idAttribute : 'term_id'
            
            defaults : ->
                menuItems : new Menus.MenuItemCollection

            url : ->
                if @isNew() then '/menus' else "/menus/#{@get 'id'}"

        class Menus.MenuCollection extends Backbone.Collection
            model : Menus.MenuModel

        

        window.menusCollection = new Menus.MenuCollection
        menusCollection.add MENUS


        # # menu item model
        # class Menus.MenuItemModel extends Backbone.Model

        #     idAttribute: 'ID'

        #     defaults:
        #         menu_item_title: ''
        #         menu_item_url: ''
        #         menu_item_parent: 0
        #         order: 0

        #     name: 'menu-item'


        # # menu item collection class
        # class Menus.MenuItemCollection extends Backbone.Collection
        #     model: Menus.MenuItemModel
        #     comparator: 'order'

        #     # update the model order attribute
        #     updateOrder: (newOrder = [], menuId)->
        #         _.each newOrder, (ele, index)=>
        #             model = @get ele
        #             model.set 'order', index + 1
        #         @trigger "menu:order:updated"
        #         @syncToServer newOrder, menuId

        #     syncToServer: (newOrder, menuId, options = {})->
        #         _action = 'update-menu-order'
        #         options.data = {}
        #         options.data.newOrder = newOrder.join()
        #         options.data.menuId = menuId
        #         # Backbone.send _action,options
        #         Backbone.ajax
        #             url: AJAXURL
        #             data:
        #                 newOrder: newOrder
        #                 menuId: menuId
        #                 action: _action
        #             success: =>
        #                 @trigger "menu:order:updated"

        # # menu model
        # class Menus.MenuModel extends Backbone.Model
        #     defaults:
        #         menu_name: ''
        #         menu_description: ''
        #         menu_slug: ''
        #         menu_items: []



        #     name: 'menu'

        # # menu collection
        # class Menus.MenuCollection extends Backbone.Collection
        #     model: Menus.MenuModel

        #     url: ->
        #         AJAXURL + '?action=get-menus'

        #     getSiteMenus: ()->
        #         @map (model)->
        #             menu_id: model.get 'id'
        #             menu_name: model.get 'menu_name'


        # menus = []

        # # API
        # API =
        #     getMenuItemCollection: (params = {})->
        #         menuItemCollection = new Menus.MenuItemCollection
        #         menuItemCollection


        # # get all site menus
        #     getMenus: (param = {})->
        #         menuCollection.fetch
        #                     reset: true
        #                     data: param

        #         menuCollection

        # # get all menu items for the passed menu
        # # menuId = 0 if no menu is passed
        #     getMenuItems: (menuId = 0)->
        #         menuItems = new Menus.MenuItemCollection

        #         menuItems.url = "#{AJAXURL}?action=get-menu-items"

        #         menuItems.fetch
        #             reset: true
        #             data:
        #                 menu_id: menuId
        #         menuItems

        # # creates a menu items collection
        #     createMenuItemsCollection: (items)->
        #         items = [] if not _.isArray(items)

        #         new Menus.MenuItemCollection items

        #     createMenuCollection: (modelsArr = [])->
        #         new Menus.MenuCollection modelsArr

        # # create a new menu item instance onserver
        #     createMenuItemModel: ()->
        #         menuitem = new Menus.MenuItemModel
        #         menuitem
        # #
        #     createMenuModel: (menuData = {})->
        #         if not menuData.id
        #             throw new Error "no menu"

        #         items = menuData.menu_items
        #         menu = new Menus.MenuModel menuData
        #         menu.set 'menu_items', new Menus.MenuItemCollection items
        #         menu

        # # update new menu item
        #     updateMenuItemModel: (menuitem, data)->
        #         menuitem.set data
        #         menuitem.save()
        #         menuitem


        #     getMenuItemsByMenuId: (menuId)->
        #         menuItems = menus[parseInt menuId] || false
        #         if not menuItems
        #             menuItems = new Menus.MenuItemCollection
        #             menuItems.url = "#{AJAXURL}?action=get-site-menu-items&menu_id=#{menuId}"
        #             menus[menuId] = menuItems
        #             menuItems.fetch()
        #         menuItems


        # App.reqres.setHandler "get:menu:items:by:menuid", (menuId)->
        #     API.getMenuItemsByMenuId menuId

        # ####### ------------------------------- ########

        # # request handler to get all site menus
        # App.reqres.setHandler "get:site:menus", ->
        #     API.getMenus()

        # # request handler to get all site menus
        # App.reqres.setHandler "get:menu:menuitems", (menuId)->
        #     API.getMenuItems(menuId)

        # # request handler to get all site menus
        # App.reqres.setHandler "create:menuitem:collection", (items)->
        #     API.createMenuItemsCollection(items)

        # # request handler to get all site menus
        # App.reqres.setHandler "create:menu:collection", (items)->
        #     API.createMenuCollection()

        # # request handler to get all site menus
        # App.reqres.setHandler "create:menu:model", (menu)->
        #     API.createMenuModel(menu)

        # # create new menu item
        # App.reqres.setHandler "create:new:menu:item", ()->
        #     API.createMenuItemModel()

        # App.reqres.setHandler "get:menu:item:collection", ->
        #     API.getMenuItemCollection()

        # App.reqres.setHandler "update:menu:item", (menuitem, data)->
        #     API.updateMenuItemModel menuitem, data
