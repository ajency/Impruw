var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["app", 'backbone', 'jquery'], function(App, Backbone, $) {
  return App.module("Entities.Menus", function(Menus, App, Backbone, Marionette, $, _) {
    Menus.MenuItemModel = (function(_super) {
      __extends(MenuItemModel, _super);

      function MenuItemModel() {
        return MenuItemModel.__super__.constructor.apply(this, arguments);
      }

      MenuItemModel.prototype.idAttribute = 'ID';

      return MenuItemModel;

    })(Backbone.Model);
    Menus.MenuItemCollection = (function(_super) {
      __extends(MenuItemCollection, _super);

      function MenuItemCollection() {
        this.handleFetchResponse = __bind(this.handleFetchResponse, this);
        return MenuItemCollection.__super__.constructor.apply(this, arguments);
      }

      MenuItemCollection.prototype.model = Menus.MenuItemModel;

      MenuItemCollection.prototype.comparator = 'menu_order';

      MenuItemCollection.prototype.fetch = function(data) {
        if (data == null) {
          data = {};
        }
        data['action'] = 'fetch-menu-items-for-menu';
        return $.get(AJAXURL, data, this.handleFetchResponse, 'json');
      };

      MenuItemCollection.prototype.handleFetchResponse = function(response) {
        if (response.success === true) {
          return this.add(response.data);
        }
      };

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
