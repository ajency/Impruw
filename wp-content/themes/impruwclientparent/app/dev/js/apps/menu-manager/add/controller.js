var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/menu-manager/add/views'], function(App, AppController) {
  return App.module("MenuManager.Add", function(Add, App) {
    Add.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.menuItemAdded = __bind(this.menuItemAdded, this);
        this.saveMenuResponseHandler = __bind(this.saveMenuResponseHandler, this);
        this.saveMenuItem = __bind(this.saveMenuItem, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.menuId = opts.menuId;
        this.view = this._getView();
        this.listenTo(this.view, "add:menu:item:clicked", this.saveMenuItem);
        return this.show(this.view);
      };

      Controller.prototype.saveMenuItem = function(data) {
        var ajaxData;
        ajaxData = {};
        ajaxData['menu_id'] = this.menuId;
        ajaxData['action'] = 'builder-add-new-menu-item';
        ajaxData['menu-item'] = data;
        return $.post(AJAXURL, ajaxData, this.saveMenuResponseHandler, 'json');
      };

      Controller.prototype.saveMenuResponseHandler = function(response) {
        var menu, menuItemModel, menuItemsCollection;
        menuItemModel = new App.Entities.Menus.MenuItemModel;
        if (response.success === true) {
          menu = window.menusCollection.get(this.menuId);
          menuItemsCollection = menu.get('menuItems');
          menuItemModel.set(response.data);
          menuItemsCollection.add(menuItemModel);
          return this.view.triggerMethod("add:menuitem:success", menuItemModel);
        } else {
          return this.view.triggerMethod("add:menuitem:failed", response.message);
        }
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
