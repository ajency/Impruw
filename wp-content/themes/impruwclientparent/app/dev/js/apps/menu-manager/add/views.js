var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/menu-manager/show/templates/menucollection.html', 'text!apps/menu-manager/show/templates/menumanager.html', 'text!apps/menu-manager/show/templates/menuitem.html'], function(App, menucollectionTpl, menumanagerTpl, menuItemTpl) {
  return App.module('MenuManager.Add.Views', function(Views, App) {
    var MenuItemView, SingleManagerView;
    MenuItemView = (function(_super) {
      __extends(MenuItemView, _super);

      function MenuItemView() {
        return MenuItemView.__super__.constructor.apply(this, arguments);
      }

      MenuItemView.prototype.template = menuItemTpl;

      MenuItemView.prototype.tagName = 'li';

      MenuItemView.prototype.className = 'list-group-item';

      return MenuItemView;

    })(Marionette.ItemView);
    SingleManagerView = (function(_super) {
      __extends(SingleManagerView, _super);

      function SingleManagerView() {
        return SingleManagerView.__super__.constructor.apply(this, arguments);
      }

      SingleManagerView.prototype.template = menumanagerTpl;

      SingleManagerView.prototype.itemView = MenuItemView;

      SingleManagerView.prototype.itemViewContainer = 'ol.sortable-menu-items';

      SingleManagerView.prototype.className = 'tab-pane';

      return SingleManagerView;

    })(Marionette.CompositeView);
    return Views.MenuManagerView = (function(_super) {
      __extends(MenuManagerView, _super);

      function MenuManagerView() {
        return MenuManagerView.__super__.constructor.apply(this, arguments);
      }

      MenuManagerView.prototype.template = menucollectionTpl;

      MenuManagerView.prototype.itemView = SingleManagerView;

      MenuManagerView.prototype.itemViewContainer = '.tab-content';

      return MenuManagerView;

    })(Marionette.CompositeView);
  });
});
