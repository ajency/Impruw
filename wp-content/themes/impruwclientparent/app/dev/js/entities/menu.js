var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Menus", function(Menus, App, Backbone, Marionette, $, _) {
    Menus.MenuItemModel = (function(_super) {
      __extends(MenuItemModel, _super);

      function MenuItemModel() {
        return MenuItemModel.__super__.constructor.apply(this, arguments);
      }

      MenuItemModel.prototype.idAttribute = 'menu-item-db-id';

      MenuItemModel.prototype.url = function() {
        var menuId;
        menuId = this.get('menu_id');
        if (this.isNew()) {
          return "/menus/" + menuId;
        } else {
          return "/menus/" + (this.get('id'));
        }
      };

      return MenuItemModel;

    })(Backbone.Model);
    Menus.MenuItemCollection = (function(_super) {
      __extends(MenuItemCollection, _super);

      function MenuItemCollection() {
        return MenuItemCollection.__super__.constructor.apply(this, arguments);
      }

      MenuItemCollection.prototype.model = Menus.MenuItemModel;

      MenuItemCollection.prototype.fetch = function(data) {};

      return MenuItemCollection;

    })(Backbone.Collection);
    Menus.MenuModel = (function(_super) {
      __extends(MenuModel, _super);

      function MenuModel() {
        return MenuModel.__super__.constructor.apply(this, arguments);
      }

      MenuModel.prototype.idAttribute = 'term_id';

      MenuModel.prototype.defaults = function() {
        return {
          menuItems: new Menus.MenuItemCollection
        };
      };

      MenuModel.prototype.url = function() {
        if (this.isNew()) {
          return '/menus';
        } else {
          return "/menus/" + (this.get('id'));
        }
      };

      return MenuModel;

    })(Backbone.Model);
    Menus.MenuCollection = (function(_super) {
      __extends(MenuCollection, _super);

      function MenuCollection() {
        return MenuCollection.__super__.constructor.apply(this, arguments);
      }

      MenuCollection.prototype.model = Menus.MenuModel;

      return MenuCollection;

    })(Backbone.Collection);
    window.menusCollection = new Menus.MenuCollection;
    return menusCollection.add(MENUS);
  });
});
