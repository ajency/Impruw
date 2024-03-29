var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/menu-manager/show/controller'], function(App) {
  return App.module('MenuManager', function(MenuManager, App, Backbone, Marionette, $, _) {
    var API;
    MenuManager.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'menu-manager': 'show'
      };

      return Router;

    })(Marionette.AppRouter);
    API = {
      show: function() {
        return new MenuManager.Show.Controller({
          region: App.dialogRegion
        });
      }
    };
    App.vent.on("show:menu:manager", function() {
      return API.show();
    });
    return MenuManager.on("start", function() {
      return new MenuManager.Router({
        controller: API
      });
    });
  });
});
