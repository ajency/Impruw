var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/menu-manager/show/templates/menucollection.html', 'text!apps/menu-manager/show/templates/menumanager.html', 'text!apps/menu-manager/show/templates/menuitem.html'], function(App, menucollectionTpl, menumanagerTpl, menuItemTpl) {
  return App.module('MenuManager.List.Views', function(Views, App) {
    return Views.MenuItemView = (function(_super) {
      __extends(MenuItemView, _super);

      function MenuItemView() {
        return MenuItemView.__super__.constructor.apply(this, arguments);
      }

      MenuItemView.prototype.template = '<div>menuItemTpl</div>';

      MenuItemView.prototype.tagName = 'li';

      MenuItemView.prototype.className = 'list-group-item';

      return MenuItemView;

    })(Marionette.ItemView);
  });
});
