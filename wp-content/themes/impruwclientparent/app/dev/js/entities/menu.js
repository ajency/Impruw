// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["app", 'backbone'], function(App, Backbone) {
    App.module("Entities.Menus", function(Menus, App, Backbone, Marionette, $, _) {
      var API, _ref, _ref1, _ref2, _ref3;
      Menus.MenuItemModel = (function(_super) {
        __extends(MenuItemModel, _super);

        function MenuItemModel() {
          _ref = MenuItemModel.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        MenuItemModel.prototype.idAttribute = 'ID';

        MenuItemModel.prototype.defaults = {
          post_title: '',
          menu_item_link: '',
          menu_item_parent: 0
        };

        return MenuItemModel;

      })(Backbone.Model);
      Menus.MenuItemCollection = (function(_super) {
        __extends(MenuItemCollection, _super);

        function MenuItemCollection() {
          _ref1 = MenuItemCollection.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        MenuItemCollection.prototype.model = Menus.MenuItemModel;

        MenuItemCollection.prototype.comparator = 'order';

        MenuItemCollection.prototype.updateOrder = function(newOrder, menuId) {
          var _this = this;
          if (newOrder == null) {
            newOrder = [];
          }
          _.each(newOrder, function(ele, index) {
            var model;
            model = _this.get(ele);
            return model.set('order', index + 1);
          });
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
          return Backbone.send(_action, options);
        };

        return MenuItemCollection;

      })(Backbone.Collection);
      Menus.MenuModel = (function(_super) {
        __extends(MenuModel, _super);

        function MenuModel() {
          _ref2 = MenuModel.__super__.constructor.apply(this, arguments);
          return _ref2;
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

        return MenuModel;

      })(Backbone.AssociatedModel);
      Menus.MenuCollection = (function(_super) {
        __extends(MenuCollection, _super);

        function MenuCollection() {
          _ref3 = MenuCollection.__super__.constructor.apply(this, arguments);
          return _ref3;
        }

        MenuCollection.prototype.model = Menus.MenuModel;

        MenuCollection.prototype.parse = function(resp) {
          if (resp.code === 'OK') {
            return resp.data;
          }
        };

        return MenuCollection;

      })(Backbone.Collection);
      API = {
        getMenus: function(param) {
          var menuCollection;
          if (param == null) {
            param = {};
          }
          menuCollection = App.request("get:collection", 'menucollection');
          if (!menuCollection) {
            menuCollection = new Menus.MenuCollection;
            App.request("set:collection", 'menucollection', menuCollection);
            menuCollection.url = AJAXURL + '?action=get-menus';
            menuCollection.fetch({
              reset: true,
              data: param
            });
          }
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
        }
      };
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
      return App.reqres.setHandler("create:menu:model", function(menu) {
        return API.createMenuModel(menu);
      });
    });
    return App.Entities.Menus;
  });

}).call(this);
