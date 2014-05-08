var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/menu-manager/add/templates/addmenu.html'], function(App, addmenuTpl) {
  return App.module('MenuManager.Add.Views', function(Views, App) {
    return Views.MenuItemView = (function(_super) {
      __extends(MenuItemView, _super);

      function MenuItemView() {
        return MenuItemView.__super__.constructor.apply(this, arguments);
      }

      MenuItemView.prototype.template = addmenuTpl;

      MenuItemView.prototype.className = 'aj-imp-menu-edit';

      MenuItemView.prototype.events = {
        'click .add-menu-item': function() {
          var formdata;
          formdata = Backbone.Syphon.serialize(this);
          return this.trigger("add:menu:item:clicked", formdata);
        }
      };

      MenuItemView.prototype.serializeData = function() {
        var data, pages;
        data = MenuItemView.__super__.serializeData.call(this);
        pages = App.request("get:editable:pages");
        data.pages = pages.toJSON();
        return data;
      };

      MenuItemView.prototype.onNewMenuCreated = function() {
        this.$el.find('.alert').remove();
        this.$el.find('.add-menu-form').prepend('<div class="alert alert-success">New menu added </div>');
        return this.$el.find('#btn_resetmenu').click();
      };

      MenuItemView.prototype.onShow = function() {
        return this.$el.find('select[name="menu_item_url"]').selectpicker();
      };

      return MenuItemView;

    })(Marionette.ItemView);
  });
});
