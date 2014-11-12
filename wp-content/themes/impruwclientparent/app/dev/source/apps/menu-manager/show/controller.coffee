define [ 'app', 'controllers/base-controller' ], ( App, AppController )->

   #Login App module
   App.module "MenuManager.Show", ( Show, App )->

      #Show Controller
      class Show.Controller extends AppController

         # initialize
         initialize : ( opts )->
            @menuId = 0

            if opts.menuId
               @menuId = menuId = opts.menuId

            @menuCollection = menuCollection = opts.menuCollection

            if @menuId is 0
               @menuCollection.once "add", ( model )=>
                  @menuId = model.get 'menu_id'
                  App.execute "add:menu:items:app",
                     region : @layout.addMenuRegion
                     menuId : @menuId

            @layout = layout = @getLayout()

            @listenTo @layout, "show", =>
               App.execute "add:menu:items:app",
                  region : @layout.addMenuRegion
                  menuId : @menuId

               App.execute "list:menu:items:app",
                  region : @layout.listMenuRegion
                  collection : @menuCollection

               @listenTo @layout.addMenuRegion, "menu:model:to:collection", ( model ) =>
                  @menuCollection.add model


               @listenTo @layout.listMenuRegion, "delete:menu:item:model", ( model ) =>
                  model.destroy
                     wait : true

               @listenTo @layout.listMenuRegion, 'menu:order:changed', ( order, collection )=>
                  newOrder = _.idOrder order
                  collection.updateOrder newOrder, @menuId

               @listenTo @layout.listMenuRegion, 'menu:order:changed:collection', ( newOrder, collection )=>
                  collection.updateOrder newOrder, @menuId

            @show @layout


         getLayout : ( menuCollection )->
            new MediaMangerLayout


      # Rooms tariff layout
      class MediaMangerLayout extends Marionette.LayoutView

         className : 'menu-manager-container row'

         template : '<div class="col-md-12">
                        <div class="modal-help-text">
                           {{#polyglot}}If you wanted to go to a particular page you can do that by selecting the page in Current Page: drop down on the site builder right below the header.{{/polyglot}}
                        </div>
                     </div>
   						<div id="add-menu-items" class="col-md-6"></div>
   						<div id="list-menu-items" class="col-md-6"></div>'

         dialogOptions :
            modal_title : _.polyglot.t 'Menu Manager'

         regions :
            addMenuRegion : '#add-menu-items'
            listMenuRegion : '#list-menu-items'


      App.commands.setHandler "menu-manager", ( menuCollection, menuId ) ->
         opts =
            region : App.dialogRegion
            menuCollection : menuCollection
            menuId : menuId

         new Show.Controller opts
