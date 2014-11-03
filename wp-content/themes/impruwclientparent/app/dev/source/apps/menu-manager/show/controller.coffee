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
      class MediaMangerLayout extends Marionette.Layout

         className : 'menu-manager-container row'

         template : '<div class="col-md-12">
                        <div class="modal-help-text">
                           <span class="glyphicon glyphicon-info-sign"></span>&nbsp;
                           {{#polyglot}}If you wanted to go to a particular page you can do that by selecting the page in Current Page: drop down on the site builder right below the header.{{/polyglot}}
                        </div>
                     </div>
   						<div class="col-md-5">

                        <div class="create-menu-container">
                           <p class="desc">
                              {{#polyglot}}You can either edit a previously added menu or create a new menu. To edit a previously added menu, select it from the dropdown{{/polyglot}}
                              <small>{{#polyglot}}Note: Editing a menu will update all occurrences of this menu.{{/polyglot}}</small>
                           </p>
                           <form class="form-horizontal">
                              <div class="form-group">
                                 <label class="col-sm-4 control-label">{{#polyglot}}Choose a Menu{{/polyglot}}</label>
                                 <div class="col-sm-8">
                                    <div class="btn-group bootstrap-select">
                                      <button class="btn btn-default dropdown-toggle t-a-l" type="button" data-toggle="dropdown">
                                        Main Menu <span class="caret"></span>
                                      </button>
                                      <ul class="dropdown-menu" role="menu">
                                        <li class="selected"><a href="#">Main Menu</a></li>
                                        <li><a href="#">Menu 1</a></li>
                                        <li><a href="#">Menu 2</a></li>
                                        <li><a href="#">Menu 3</a></li>
                                      </ul>
                                    </div>
                                 </div>
                              </div>
                               <div class="form-group">
                                 <div class="col-sm-8 col-sm-offset-4 create-button">
                                    <span class="or">Or</span>
                                    <button type="button" class="create-menu btn btn-default btn-xs"><span class="glyphicon glyphicon-plus"></span>&nbsp;{{#polyglot}}Create a New Menu{{/polyglot}}</button>
                                 </div>
                              </div>
                              <div class="form-group menu-name">
                                 <label class="control-label">Menu Name</label>
                                 <input class="form-control" placeholder="Enter a name for your menu" type="text">
                              </div>
                              <div class="form-group">
                                 <label class="col-sm-4 control-label">{{#polyglot}}Choose a Menu Style{{/polyglot}}</label>
                                 <div class="col-sm-8">
                                    <div class="btn-group bootstrap-select">
                                      <button class="btn btn-default dropdown-toggle t-a-l" type="button" data-toggle="dropdown">
                                        Slim Menu <span class="caret"></span>
                                      </button>
                                      <ul class="dropdown-menu" role="menu">
                                        <li class="selected"><a href="#">Main Menu</a></li>
                                        <li><a href="#">Footer Menu</a></li>
                                        <li><a href="#">Vertical Menu</a></li>
                                        <li><a href="#">Another Menu Style</a></li>
                                      </ul>
                                    </div>
                                 </div>
                              </div>
                              
                           </form>
                        </div>

                     </div>
   						<div class="col-md-7">
                        <div id="add-menu-items"></div>
                        <div id="list-menu-items"></div>
                        <div class="menu-actions clearfix">
                           <a class="delete-menu red-link"><span class="glyphicon glyphicon-trash"></span>&nbsp;{{#polyglot}}Delete Menu{{/polyglot}}</a>
                           <button type="button" class="update-menu pull-right btn btn-default btn-sm aj-imp-orange-btn"><span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;{{#polyglot}}Update Menu{{/polyglot}}</button>
                        </div>
                     </div>'

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
