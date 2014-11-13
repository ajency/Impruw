var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module("MenuManager.Show", function(Show, App) {
    var MediaMangerLayout;
    Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var layout, menuCollection, menuId;
        this.menuId = 0;
        if (opts.menuId) {
          this.menuId = menuId = opts.menuId;
        }
        this.menuCollection = menuCollection = opts.menuCollection;
        if (this.menuId === 0) {
          this.menuCollection.once("add", (function(_this) {
            return function(model) {
              _this.menuId = model.get('menu_id');
              return App.execute("add:menu:items:app", {
                region: _this.layout.addMenuRegion,
                menuId: _this.menuId
              });
            };
          })(this));
        }
        this.layout = layout = this.getLayout();
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            App.execute("add:menu:items:app", {
              region: _this.layout.addMenuRegion,
              menuId: _this.menuId
            });
            App.execute("list:menu:items:app", {
              region: _this.layout.listMenuRegion,
              collection: _this.menuCollection
            });
            _this.listenTo(_this.layout.addMenuRegion, "menu:model:to:collection", function(model) {
              return _this.menuCollection.add(model);
            });
            _this.listenTo(_this.layout.listMenuRegion, "delete:menu:item:model", function(model) {
              return model.destroy({
                wait: true
              });
            });
            _this.listenTo(_this.layout.listMenuRegion, 'menu:order:changed', function(order, collection) {
              var newOrder;
              newOrder = _.idOrder(order);
              return collection.updateOrder(newOrder, _this.menuId);
            });
            return _this.listenTo(_this.layout.listMenuRegion, 'menu:order:changed:collection', function(newOrder, collection) {
              return collection.updateOrder(newOrder, _this.menuId);
            });
          };
        })(this));
        return this.show(this.layout);
      };

      Controller.prototype.getLayout = function(menuCollection) {
        return new MediaMangerLayout;
      };

      return Controller;

    })(AppController);
    MediaMangerLayout = (function(_super) {
      __extends(MediaMangerLayout, _super);

      function MediaMangerLayout() {
        return MediaMangerLayout.__super__.constructor.apply(this, arguments);
      }

      MediaMangerLayout.prototype.className = 'menu-manager-container row';

      MediaMangerLayout.prototype.template = '<div class="col-md-12"> <div class="modal-help-text"> <span class="glyphicon glyphicon-info-sign"></span>&nbsp; {{#polyglot}}If you wanted to go to a particular page you can do that by selecting the page in Current Page: drop down on the site builder right below the header.{{/polyglot}} </div> <p class="desc"> {{#polyglot}}You can either edit a previously added menu or create a new menu. To edit a previously added menu, select it from the dropdown{{/polyglot}} <small>{{#polyglot}}Note: Editing a menu will update all occurrences of this menu.{{/polyglot}}</small> </p> </div> <div class="col-md-8"> <div class="create-menu-container"> <div class="choose-menu"> <label class="control-label">{{#polyglot}}Select a Menu to Edit{{/polyglot}}</label> <div class="btn-group bootstrap-select"> <button class="btn btn-default dropdown-toggle t-a-l" type="button" data-toggle="dropdown"> Main Menu <span class="caret"></span> </button> <ul class="dropdown-menu" role="menu"> <li class="selected"><a href="#">Main Menu</a></li> <li><a href="#">Menu 1</a></li> <li><a href="#">Menu 2</a></li> <li><a href="#">Menu 3</a></li> </ul> </div> <span class="option-or">{{#polyglot}}Or{{/polyglot}}</span> <a href="#new-menu-name" data-toggle="collapse" class="create-new-menu">{{#polyglot}}Create a Menu{{/polyglot}}</a> </div> <form id="new-menu-name" class="form-inline collapse"> <div class="form-group"> <input class="form-control" placeholder="{{#polyglot}}Enter a name for your menu{{/polyglot}}" type="text"> </div> <button class="btn btn-default aj-imp-orange-btn" type="button">{{#polyglot}}Create{{/polyglot}}</button> </form> </div> <div id="add-menu-items"></div> <div id="list-menu-items"></div> <div class="menu-actions clearfix"> <a class="delete-menu red-link"><span class="glyphicon glyphicon-trash"></span>&nbsp;{{#polyglot}}Delete Menu{{/polyglot}}</a> </div> </div> <div class="col-md-4"> <div class="styles-container"> <h4>{{#polyglot}}Choose a Menu Style{{/polyglot}}</h4> <div class="row thumbnails overflow-view"> <div class="col-sm-6 single-item ui-selected"> <a href="#" class="thumbnail"> <div class="ticker ui-selectee" style=""><span class="glyphicon glyphicon-ok ui-selectee"></span><span class="glyphicon glyphicon-minus ui-selectee" style=""></span></div> <div class="imgthumb"> <img class="img-responsive" src="http://localhost/impruw/test2/wp-content/themes/pink-theme/resources/img/menu-slimmenu.png" /> </div> </a> </div> <div class="col-sm-6 single-item"> <a href="#" class="thumbnail"> <div class="ticker ui-selectee" style=""><span class="glyphicon glyphicon-ok ui-selectee"></span><span class="glyphicon glyphicon-minus ui-selectee" style=""></span></div> <div class="imgthumb"> <img class="img-responsive" src="http://localhost/impruw/test2/wp-content/themes/pink-theme/resources/img/menu-footer-menu.png" /> </div> </a> </div> <div class="col-sm-6 single-item"> <a href="#" class="thumbnail"> <div class="ticker ui-selectee" style=""><span class="glyphicon glyphicon-ok ui-selectee"></span><span class="glyphicon glyphicon-minus ui-selectee" style=""></span></div> <div class="imgthumb"> <img class="img-responsive" src="http://localhost/impruw/test2/wp-content/themes/pink-theme/resources/img/menu-left-menu.png" /> </div> </a> </div> </div> </div> </div>';

      MediaMangerLayout.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Menu Manager')
      };

      MediaMangerLayout.prototype.regions = {
        addMenuRegion: '#add-menu-items',
        listMenuRegion: '#list-menu-items'
      };

      return MediaMangerLayout;

    })(Marionette.Layout);
    return App.commands.setHandler("menu-manager", function(menuCollection, menuId) {
      var opts;
      opts = {
        region: App.dialogRegion,
        menuCollection: menuCollection,
        menuId: menuId
      };
      return new Show.Controller(opts);
    });
  });
});
