var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/menu-manager/list/views'], function(App, AppController) {
  return App.module("MenuManager.List", function(List, App) {
    List.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var menu, menuItemsCollection, view;
        this.menuId = opts.menuId;
        menu = window.menusCollection.get(this.menuId);
        menuItemsCollection = menu.get('menuItems');
        if (menuItemsCollection.length === 0) {
          return menuItemsCollection.fetch({
            menu_id: this.menuId
          }).done((function(_this) {
            return function() {
              var view;
              _this.view = view = _this._getView(menuItemsCollection);
              return _this.show(_this.view);
            };
          })(this));
        } else {
          this.view = view = this._getView(menuItemsCollection);
          return this.show(this.view);
        }
      };

      Controller.prototype._getView = function(menuItemsCollection) {
        return new List.Views.MenuCollectionView({
          collection: menuItemsCollection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("list:menu:items:app", function(opts) {
      return new List.Controller(opts);
    });
  });
});
