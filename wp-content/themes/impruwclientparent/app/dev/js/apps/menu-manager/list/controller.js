var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/menu-manager/list/views'], function(App, AppController) {
  return App.module("MenuManager.List", function(List, App) {
    List.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.menutItemsOrderUpdated = __bind(this.menutItemsOrderUpdated, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var menu, menuItemsCollection, view;
        this.menuId = opts.menuId, this.menuElementModel = opts.menuElementModel;
        menu = window.menusCollection.get(this.menuId);
        this.menuItemsCollection = menuItemsCollection = menu.get('menuItems');
        if (menuItemsCollection.length === 0) {
          return menuItemsCollection.fetch({
            menu_id: this.menuId
          }).done((function(_this) {
            return function() {
              var view;
              _this.view = view = _this._getView(menuItemsCollection);
              _this.bindMenuItemEvents();
              return _this.show(_this.view);
            };
          })(this));
        } else {
          this.view = view = this._getView(menuItemsCollection);
          this.bindMenuItemEvents();
          return this.show(this.view);
        }
      };

      Controller.prototype.bindMenuItemEvents = function() {
        this.listenTo(this.view, "childview:delete:menu:item:clicked", this.deleteMenuItem);
        this.listenTo(this.view, "childview:update:menu:item:clicked", this.updateMenuItem);
        return this.listenTo(this.view, "menu:item:order:updated", this.menutItemsOrderUpdated);
      };

      Controller.prototype.menutItemsOrderUpdated = function(_menuItems) {
        var data;
        data = {
          action: 'builder-update-menu-items-order',
          menu_items: _menuItems,
          menu_id: this.menuId
        };
        return $.post(AJAXURL, data, (function(_this) {
          return function(response) {
            if (response === 1) {
              _.each(_menuItems, function(item) {
                var model;
                model = _this.menuItemsCollection.get(item['ID']);
                delete item['ID'];
                return model.set(item);
              });
              _this.menuElementModel.trigger('change:menu_id');
              return _this.view.triggerMethod('menu:order:updated');
            }
          };
        })(this), 'json');
      };

      Controller.prototype.updateMenuItem = function(childView, menuData, model) {
        var data;
        data = {
          action: 'builder-update-menu-item',
          menu_data: menuData
        };
        return $.post(AJAXURL, data, function(response) {
          model.set('title', menuData['menu-item-title']);
          return model.set('url', menuData['menu-item-url']);
        }, 'json');
      };

      Controller.prototype.deleteMenuItem = function(childView, model) {
        var data;
        data = {
          action: 'builder-remove-menu-item',
          menu_item_id: model.get('ID')
        };
        return $.post(AJAXURL, data, function(response) {
          return model.collection.remove(model);
        }, 'json');
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
