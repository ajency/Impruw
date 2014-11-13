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

            @view = view = @_getView menuItemsCollection

            @show @view


         _getView : ( menucollection ) ->
            new List.Views.MenuCollectionView
                           collection : menucollection


      App.commands.setHandler "list:menu:items:app", ( opts )->
         new List.Controller opts

			