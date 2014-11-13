define [ 'app', 'controllers/base-controller', 'apps/menu-manager/list/views' ], ( App, AppController )->

   #Login App module
   App.module "MenuManager.List", ( List, App )->

      #Show Controller
      class List.Controller extends AppController

         # initialize
         initialize : ( opts )->
            {@menuId} = opts

            menu = window.menusCollection.get @menuId

            menuItemsCollection = menu.get 'menuItems'

            if menuItemsCollection.length is 0
               menuItemsCollection.fetch(menu_id : @menuId).done =>
                  @view = view = @_getView menuItemsCollection
                  @show @view
            else
               @view = view = @_getView menuItemsCollection
               @show @view


         _getView : ( menuItemsCollection ) ->
            new List.Views.MenuCollectionView
                           collection : menuItemsCollection


      App.commands.setHandler "list:menu:items:app", ( opts )->
         new List.Controller opts

			