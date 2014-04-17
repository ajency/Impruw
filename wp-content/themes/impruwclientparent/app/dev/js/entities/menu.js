var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Menus", function(Menus, App, Backbone, Marionette, $, _) {
    var API, menuCollection;
    Menus.MenuItemModel = (function(_super) {
      __extends(MenuItemModel, _super);

      function MenuItemModel() {
        return MenuItemModel.__super__.constructor.apply(this, arguments);
      }

      MenuItemModel.prototype.idAttribute = 'ID';

      MenuItemModel.prototype.defaults = {
        menu_item_title: '',
        menu_item_url: '',
        menu_item_parent: 0,
        order: 0
      };

      MenuItemModel.prototype.name = 'menu-item';

      return MenuItemModel;

    })(Backbone.Model);
    Menus.MenuItemCollection = (function(_super) {
      __extends(MenuItemCollection, _super);

      function MenuItemCollection() {
        return MenuItemCollection.__super__.constructor.apply(this, arguments);
      }

      MenuItemCollection.prototype.model = Menus.MenuItemModel;

      MenuItemCollection.prototype.comparator = 'order';

      MenuItemCollection.prototype.updateOrder = function(newOrder, menuId) {
        if (newOrder == null) {
          newOrder = [];
        }
        _.each(newOrder, (function(_this) {
          return function(ele, index) {
            var model;
            model = _this.get(ele);
            return model.set('order', index + 1);
          };
        })(this));
        this.trigger("menu:order:updated");
        return this.syncToServer(newOrder, menuId);
      };

      MenuItemCollection.prototype.syncToServer = function(newOrder, menuId, options) {
        var _action;
        if (options == null) {
          options = {};
        }
        _action = 'update-menu-order';
        options.data = {};
        options.data.newOrder = newOrder.join();
        options.data.menuId = menuId;
        return Backbone.ajax({
          url: AJAXURL,
          data: {
            newOrder: newOrder,
            menuId: menuId,
            action: _action
          },
          success: (function(_this) {
            return function() {
              return _this.trigger("menu:order:updated");
            };
          })(this)
        });
      };

      return MenuItemCollection;

    })(Backbone.Collection);
    Menus.MenuModel = (function(_super) {
      __extends(MenuModel, _super);

      function MenuModel() {
        return MenuModel.__super__.constructor.apply(this, arguments);
      }

      MenuModel.prototype.defaults = {
        menu_name: '',
        menu_description: '',
        menu_slug: '',
        menu_items: []
      };

      MenuModel.prototype.relations = [
        {
          type: Backbone.Many,
          key: 'menu_items',
          relatedModel: Menus.MenuItemModel,
          collectionType: Menus.MenuItemCollection
        }
      ];

      MenuModel.prototype.name = 'menu';

      return MenuModel;

    })(Backbone.AssociatedModel);
    Menus.MenuCollection = (function(_super) {
      __extends(MenuCollection, _super);

      function MenuCollection() {
        return MenuCollection.__super__.constructor.apply(this, arguments);
      }

      MenuCollection.prototype.model = Menus.MenuModel;

      MenuCollection.prototype.url = function() {
        return AJAXURL + '?action=get-menus';
      };

      MenuCollection.prototype.getSiteMenus = function() {
        return this.map(function(model) {
          return {
            menu_id: model.get('id'),
            menu_name: model.get('menu_name')
          };
        });
      };

      return MenuCollection;

    })(Backbone.Collection);
    menuCollection = new Menus.MenuCollection;
    API = {
      getMenuCollection: function(params) {
        if (params == null) {
          params = {};
        }
        menuCollection = new Menus.MenuItemCollection;
        return menuCollection;
      },
      getMenus: function(param) {
        if (param == null) {
          param = {};
        }
        menuCollection.fetch({
          reset: true,
          data: param
        });
        return menuCollection;
      },
      getMenuItems: function(menuId) {
        var menuItems;
        if (menuId == null) {
          menuId = 0;
        }
        menuItems = new Menus.MenuItemCollection;
        menuItems.url = "" + AJAXURL + "?action=get-menu-items";
        menuItems.fetch({
          reset: true,
          data: {
            menu_id: menuId
          }
        });
        return menuItems;
      },
      createMenuItemsCollection: function(items) {
        if (!_.isArray(items)) {
          items = [];
        }
        return new Menus.MenuItemCollection(items);
      },
      createMenuCollection: function(modelsArr) {
        if (modelsArr == null) {
          modelsArr = [];
        }
        return new Menus.MenuCollection(modelsArr);
      },
      createMenuItemModel: function() {
        var menuitem;
        menuitem = new Menus.MenuItemModel;
        return menuitem;
      },
      createMenuModel: function(menuData) {
        var items, menu;
        if (menuData == null) {
          menuData = {};
        }
        if (!menuData.id) {
          throw new Error("no menu");
        }
        items = menuData.menu_items;
        menu = new Menus.MenuModel(menuData);
        menu.set('menu_items', new Menus.MenuItemCollection(items));
        return menu;
      },
      updateMenuItemModel: function(menuitem, data) {
        menuitem.set(data);
        menuitem.save();
        return menuitem;
      },
      getMenuById: function(menuId) {
        var menu;
        menu = menuCollection.get(parseInt(menuId));
        if (_.isUndefined(menu)) {
          menu = new Menus.MenuModel({
            id: menuId
          });
          menu.url = "" + AJAXURL + "?action=get-menu&id=" + menuId;
          menuCollection.add(menu);
          menu.fetch();
        }
        return menu;
      }
    };
    App.reqres.setHandler("get:menu:by:id", function(menuId) {
      return API.getMenuById(menuId);
    });
    App.reqres.setHandler("get:site:menus", function() {
      return API.getMenus();
    });
    App.reqres.setHandler("get:menu:menuitems", function(menuId) {
      return API.getMenuItems(menuId);
    });
    App.reqres.setHandler("create:menuitem:collection", function(items) {
      return API.createMenuItemsCollection(items);
    });
    App.reqres.setHandler("create:menu:collection", function(items) {
      return API.createMenuCollection();
    });
    App.reqres.setHandler("create:menu:model", function(menu) {
      return API.createMenuModel(menu);
    });
    App.reqres.setHandler("create:new:menu:item", function() {
      return API.createMenuItemModel();
    });
    App.reqres.setHandler("get:menu:collection", function() {
      return API.getMenuCollection();
    });
    return App.reqres.setHandler("update:menu:item", function(menuitem, data) {
      return API.updateMenuItemModel(menuitem, data);
    });
  });
});
