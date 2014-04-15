var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/menu-manager/show/views'], function(App, AppController) {
  return App.module("MenuManager.Show", function(Show, App) {
    var MediaMangerLayout;
    Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var layout, menu;
        this.menu = opts.menu;
        if (!this.menu) {
          this.menu = menu = App.request("get:menu:menuitems", 2);
        }
        this.layout = layout = this.getLayout(menu);
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            return App.execute("add:menu:items:app", {
              region: _this.layout.addMenuRegion,
              collection: _this.menu
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
    return MediaMangerLayout = (function(_super) {
      __extends(MediaMangerLayout, _super);

      function MediaMangerLayout() {
        return MediaMangerLayout.__super__.constructor.apply(this, arguments);
      }

      MediaMangerLayout.prototype.className = 'media-manager-container';

      MediaMangerLayout.prototype.template = '<div id="add-menu-items"></div> <div id="list-menu-items"></div>';

      MediaMangerLayout.prototype.dialogOptions = {
        modal_title: 'Menu Manager'
      };

      MediaMangerLayout.prototype.regions = {
        addMenuRegion: '#add-menu-items',
        listMenuRegion: '#list-menu-items'
      };

      return MediaMangerLayout;

    })(Marionette.Layout);
  });
});
