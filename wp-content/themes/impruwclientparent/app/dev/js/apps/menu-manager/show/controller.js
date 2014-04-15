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
        var layout, menuCollection, menuDetails, menu_id;
        this.menu_id = menu_id = opts.menu_id;
        if (!menu_id) {
          throw new Error("Menu Id not specified");
        }
        this.menuDetails = menuDetails = App.request("get:menu:by:id", menu_id);
        this.menuCollection = menuCollection = menuDetails.get('menu_items');
        this.layout = layout = this.getLayout();
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            App.execute("add:menu:items:app", {
              region: _this.layout.addMenuRegion,
              model: _this.menuDetails
            });
            App.execute("list:menu:items:app", {
              region: _this.layout.listMenuRegion,
              collection: _this.menuCollection
            });
            return _this.listenTo(_this.layout.addMenuRegion, "menu:model:to:collection", function(model) {
              return _this.menuCollection.add(model);
            });
          };
        })(this));
        return this.show(this.layout);
      };

      Controller.prototype.getLayout = function(menuCollection) {
        return new MediaMangerLayout({
          collection: menuCollection
        });
      };

      return Controller;

    })(AppController);
    MediaMangerLayout = (function(_super) {
      __extends(MediaMangerLayout, _super);

      function MediaMangerLayout() {
        return MediaMangerLayout.__super__.constructor.apply(this, arguments);
      }

      MediaMangerLayout.prototype.className = 'media-manager-container row';

      MediaMangerLayout.prototype.template = '<div id="add-menu-items" class="col-md-6"></div> <div id="list-menu-items" class="col-md-6"></div>';

      MediaMangerLayout.prototype.dialogOptions = {
        modal_title: 'Menu Manager'
      };

      MediaMangerLayout.prototype.regions = {
        addMenuRegion: '#add-menu-items',
        listMenuRegion: '#list-menu-items'
      };

      return MediaMangerLayout;

    })(Marionette.Layout);
    return App.commands.setHandler("menu-manager", function(menuId) {
      var opts;
      opts = {
        region: App.dialogRegion,
        menu_id: menuId
      };
      return new Show.Controller(opts);
    });
  });
});
