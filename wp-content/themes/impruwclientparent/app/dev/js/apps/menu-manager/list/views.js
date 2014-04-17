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

      MenuItemView.prototype.modelEvents = {
        'change': 'render'
      };

      MenuItemView.prototype.onRender = function() {
        return this.$el.find('.sortable-menu-items').sortable();
      };

      MenuItemView.prototype.events = {
        'click .update-menu-item': function() {
          var formdata;
          formdata = Backbone.Syphon.serialize(this);
          return this.trigger("update:menu:item:clicked", formdata, this.model);
        },
        'click .delete-menu-item': function() {
          if (confirm('Delete the menu item?')) {
            return this.trigger("delete:menu:item:clicked", this.model);
          }
        },
        'click .cancel-menu-item': function() {
          var menu_id, menu_item_id;
          menu_id = this.model.get('menu_id');
          menu_item_id = this.model.get('ID');
          this.$el.find('.menuname').val(this.model.get('menu_item_title'));
          this.$el.find('.menutitle').val(this.model.get('menu_item_url'));
          return this.$el.find("#menuitem-" + menu_id + "-" + menu_item_id).click();
        }
      };

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

      MenuCollectionView.prototype.className = 'aj-imp-menu-item-list';

      MenuCollectionView.prototype.onMenuItemUpdated = function() {
        this.$el.find('.alert').remove();
        return this.$el.prepend('<div class="alert alert-success">Menu item updated</div>');
      };

      return MenuCollectionView;

    })(Marionette.CompositeView);
  });
});
