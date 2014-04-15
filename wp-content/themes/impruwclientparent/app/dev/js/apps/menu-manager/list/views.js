var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/menu-manager/list/templates/menuitem.html'], function(App, menuItemTpl) {
  return App.module('MenuManager.List.Views', function(Views, App) {
    var MenuItemView;
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
    return Views.MenuCollectionView = (function(_super) {
      __extends(MenuCollectionView, _super);

      function MenuCollectionView() {
        return MenuCollectionView.__super__.constructor.apply(this, arguments);
      }

      MenuCollectionView.prototype.template = '<div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">{{menu_name}}</h3> </div> <ol class="list-group sortable-menu-items ui-sortable"></ol> </div>';

      MenuCollectionView.prototype.itemView = MenuItemView;

      MenuCollectionView.prototype.itemViewContainer = 'ol.sortable-menu-items';

      MenuCollectionView.prototype.className = 'col-md-6 aj-imp-menu-item-list';

      return MenuCollectionView;

    })(Marionette.CompositeView);
  });
});
