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
                  @bindMenuItemEvents()
                  @show @view
            else
               @view = view = @_getView menuItemsCollection
               @bindMenuItemEvents()
               @show @view

         bindMenuItemEvents : ->
            @listenTo @view, "itemview:delete:menu:item:clicked", @deleteMenuItem

         deleteMenuItem : (childView, model)->
            
            data = 
               action : 'builder-remove-menu-item'
               menu_item_id : model.get 'ID'

            $.post AJAXURL, data, (response)->
               model.collection.remove model
            , 'json'

         _getView : ( menuItemsCollection ) ->
            new List.Views.MenuCollectionView
                           collection : menuItemsCollection


      App.commands.setHandler "list:menu:items:app", ( opts )->
         new List.Controller opts

			