var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.LeftNavItems", function(LeftNavItems, App, Backbone, Marionette, $, _) {
    var API;
    LeftNavItems.MenuItem = (function(_super) {
      __extends(MenuItem, _super);

      function MenuItem() {
        return MenuItem.__super__.constructor.apply(this, arguments);
      }

      return MenuItem;

    })(Backbone.Model);
    LeftNavItems.MenuItems = (function(_super) {
      __extends(MenuItems, _super);

      function MenuItems() {
        return MenuItems.__super__.constructor.apply(this, arguments);
      }

      MenuItems.prototype.model = LeftNavItems.MenuItem;

      return MenuItems;

    })(Backbone.Collection);
    API = {
      getLeftNavEntities: function(action, param) {
        var menuItems;
        if (param == null) {
          param = {};
        }
        menuItems = new LeftNavItems.MenuItems;
        menuItems.url = AJAXURL + '?action=get-menu-items';
        menuItems.fetch({
          reset: true,
          data: param
        });
        return menuItems;
      }
    };
    return App.reqres.setHandler("leftnav:entities", function() {
      return API.getLeftNavEntities();
    });
  });
});
