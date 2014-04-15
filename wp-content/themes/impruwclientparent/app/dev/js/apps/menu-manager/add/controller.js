var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/menu-manager/add/views'], function(App, AppController) {
  return App.module("MenuManager.Add", function(Add, App) {
    Add.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.saveMenu = __bind(this.saveMenu, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var menu_id, menumodel, view;
        this.menu_id = menu_id = opts.model.get('id');
        this.menumodel = menumodel = opts.model;
        this.view = view = this._getView(this.menumodel);
        this.listenTo(this.view, {
          "add:menu:item:clicked": (function(_this) {
            return function(data) {
              return _this.saveMenu(data, _this.menu_id);
            };
          })(this)
        });
        return this.show(this.view);
      };

      Controller.prototype.saveMenu = function(data, menuid) {
        var menumodel;
        menumodel = App.request("create:new:menu:item", data, menuid);
        this.view.triggerMethod("new:menu:created");
        return this.region.trigger("menu:model:to:collection", menumodel);
      };

      Controller.prototype._getView = function(menumodel) {
        return new Add.Views.MenuItemView({
          model: menumodel
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("add:menu:items:app", function(opts) {
      return new Add.Controller(opts);
    });
  });
});
