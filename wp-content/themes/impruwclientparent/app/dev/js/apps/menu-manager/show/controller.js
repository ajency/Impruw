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

      MediaMangerLayout.prototype.template = '<div class="col-md-12"> <div class="modal-help-text"> <span class="glyphicon glyphicon-info-sign"></span>&nbsp; {{#polyglot}}If you wanted to go to a particular page you can do that by selecting the page in Current Page: drop down on the site builder right below the header.{{/polyglot}} </div> </div> <div id="add-menu-items" class="col-md-6"></div> <div id="list-menu-items" class="col-md-6"></div>';

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
