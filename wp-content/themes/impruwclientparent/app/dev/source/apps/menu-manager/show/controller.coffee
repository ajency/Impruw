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

                        <p class="desc">
                           {{#polyglot}}You can either edit a previously added menu or create a new menu. To edit a previously added menu, select it from the dropdown{{/polyglot}}
                           <small>{{#polyglot}}Note: Editing a menu will update all occurrences of this menu.{{/polyglot}}</small>
                        </p>
                     </div>
   						<div class="col-md-8">

                        <div class="create-menu-container">
                           <div class="choose-menu">
                              <label class="control-label">{{#polyglot}}Select a Menu to Edit{{/polyglot}}</label>
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
                              <span class="option-or">{{#polyglot}}Or{{/polyglot}}</span>
                              <a href="#new-menu-name" data-toggle="collapse" class="create-new-menu">{{#polyglot}}Create a Menu{{/polyglot}}</a>
                           </div>
                           <form id="new-menu-name" class="form-inline collapse">
                              <div class="form-group">
                                 <input class="form-control" placeholder="{{#polyglot}}Enter a name for your menu{{/polyglot}}" type="text">
                              </div>
                              <button class="btn btn-default aj-imp-orange-btn" type="button">{{#polyglot}}Create{{/polyglot}}</button>
                           </form>
                        </div>
                        <div id="add-menu-items"></div>
                        <div id="list-menu-items"></div>
                        <div class="menu-actions clearfix">
                           <a class="delete-menu red-link"><span class="glyphicon glyphicon-trash"></span>&nbsp;{{#polyglot}}Delete Menu{{/polyglot}}</a>
                        </div>
                     </div>
   						<div class="col-md-4">
                        <div class="styles-container">
                          <h4>{{#polyglot}}Choose a Menu Style{{/polyglot}}</h4>
                          <div class="row thumbnails overflow-view">
                           <div class="col-sm-6 single-item ui-selected">
                              <a href="#" class="thumbnail">
                                 <div class="ticker ui-selectee" style=""><span class="glyphicon glyphicon-ok ui-selectee"></span><span class="glyphicon glyphicon-minus ui-selectee" style=""></span></div>
                                 <div class="imgthumb">
                                    <img class="img-responsive" src="http://localhost/impruw/test2/wp-content/themes/pink-theme/resources/img/menu-slimmenu.png" />
                                 </div>
                              </a>
                           </div>
                           <div class="col-sm-6 single-item">
                              <a href="#" class="thumbnail">
                                 <div class="ticker ui-selectee" style=""><span class="glyphicon glyphicon-ok ui-selectee"></span><span class="glyphicon glyphicon-minus ui-selectee" style=""></span></div>
                                 <div class="imgthumb">
                                    <img class="img-responsive" src="http://localhost/impruw/test2/wp-content/themes/pink-theme/resources/img/menu-footer-menu.png" />
                                 </div>
                              </a>
                           </div>
                           <div class="col-sm-6 single-item">
                              <a href="#" class="thumbnail">
                                 <div class="ticker ui-selectee" style=""><span class="glyphicon glyphicon-ok ui-selectee"></span><span class="glyphicon glyphicon-minus ui-selectee" style=""></span></div>
                                 <div class="imgthumb">
                                    <img class="img-responsive" src="http://localhost/impruw/test2/wp-content/themes/pink-theme/resources/img/menu-left-menu.png" />
                                 </div>
                              </a>
                           </div>
                          </div>
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
