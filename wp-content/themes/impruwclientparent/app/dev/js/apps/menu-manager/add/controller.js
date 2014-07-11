var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/menu-manager/add/views'], function(App, AppController) {
  return App.module("MenuManager.Add", function(Add, App) {
    Add.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.menuItemAdded = __bind(this.menuItemAdded, this);
        this.saveMenu = __bind(this.saveMenu, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.menuId = opts.menuId;
        this.view = this._getView();
        this.listenTo(this.view, {
          "add:menu:item:clicked": (function(_this) {
            return function(data) {
              return _this.saveMenu(data, _this.menuId);
            };
          })(this)
        });
        return this.show(this.view);
      };

      Controller.prototype.saveMenu = function(data) {
        var menumodel;
        menumodel = App.request("create:new:menu:item");
        menumodel.set('menu_id', parseInt(this.menuId));
        return menumodel.save(data, {
          wait: true,
          success: this.menuItemAdded
        });
      };

      Controller.prototype.menuItemAdded = function(model) {
        this.view.triggerMethod("new:menu:created");
        return this.region.trigger("menu:model:to:collection", model);
      };

      Controller.prototype._getView = function() {
        return new Add.Views.MenuItemView;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("add:menu:items:app", function(opts) {
      return new Add.Controller(opts);
    });
  });
});
