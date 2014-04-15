var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/menu-manager/list/views'], function(App, AppController) {
  return App.module("MenuManager.List", function(List, App) {
    List.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {};

      Controller.prototype.getView = function(menucollection) {
        return new List.Views.MenuItemView({
          collection: menucollection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("list:menu:items:app", function(opts) {
      return new List.Controller(opts);
    });
  });
});
