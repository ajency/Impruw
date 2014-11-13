define [ 'app', 'controllers/base-controller', 'apps/menu-manager/add/views' ], ( App, AppController )->

    #Login App module
    App.module "MenuManager.Add", ( Add, App )->

        #Show Controller
        class Add.Controller extends AppController

            # initialize
            initialize : ( opts )->
                @menuId = opts.menuId

                @view = @_getView()

                @listenTo @view, "add:menu:item:clicked", @saveMenuItem

                @show @view

            saveMenuItem : ( data ) =>
                #add menu id
                ajaxData = {}
                ajaxData['menu_id'] = @menuId
                ajaxData['action'] = 'builder-add-new-menu-item'
                ajaxData['menu-item'] = data
                $.post AJAXURL, ajaxData, @saveMenuResponseHandler, 'json'

            saveMenuResponseHandler : (response)=>
                menuItemModel = new App.Entities.Menus.MenuItemModel
                if response.success is true
                    menu = window.menusCollection.get @menuId
                    menuItemsCollection = menu.get 'menuItems'
                    menuItemModel.set response.data
                    menuItemsCollection.add menuItemModel
                    @view.triggerMethod "add:menuitem:success", menuItemModel
                else
                    @view.triggerMethod "add:menuitem:failed", response.message

            menuItemAdded : ( model )=>
                @view.triggerMethod "new:menu:created"
                @region.trigger "menu:model:to:collection", model

            _getView : ->
                new Add.Views.MenuItemView


        App.commands.setHandler "add:menu:items:app", ( opts )->
            new Add.Controller opts

			