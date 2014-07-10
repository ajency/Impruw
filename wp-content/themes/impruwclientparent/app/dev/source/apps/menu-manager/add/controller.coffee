define [ 'app', 'controllers/base-controller', 'apps/menu-manager/add/views' ], ( App, AppController )->

    #Login App module
    App.module "MenuManager.Add", ( Add, App )->

        #Show Controller
        class Add.Controller extends AppController

            # initialize
            initialize : ( opts )->
                @menuId = opts.menuId

                @view = @_getView()

                @listenTo @view, "add:menu:item:clicked" : ( data )=>
                    @saveMenu data, @menuId

                @show @view

            saveMenu : ( data ) =>
                menumodel = App.request "create:new:menu:item"
                menumodel.set 'menu_id', parseInt @menuId
                menumodel.save data,
                    wait : true
                    success : @menuItemAdded

            menuItemAdded : ( model )=>
                @view.triggerMethod "new:menu:created"
                @region.trigger "menu:model:to:collection", model

            _getView : ->
                new Add.Views.MenuItemView


        App.commands.setHandler "add:menu:items:app", ( opts )->
            new Add.Controller opts

			