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
        },
        'change select#aj-imp-page-sel': function() {
          console.log('hi');
          return console.log($(evt.target).val());
        }
      };

      MenuItemView.prototype.onNewMenuCreated = function() {
        this.$el.find('.alert').remove();
        this.$el.find('.add-menu-form').prepend('<div class="alert alert-success">New menu added </div>');
        return this.$el.find('#btn_resetmenu').click();
      };

      MenuItemView.prototype.onShow = function() {
        var pages;
        pages = App.request("get:editable:pages");
        console.log(pages);
        _.each(pages.models, function(model, index) {
          var html, page_name, page_url;
          page_name = model.get('post_title');
          page_url = model.get('guid');
          html = "<li rel='" + index + "'> <a style='' class='' > <span class='text'>" + page_name + "</span> <i class='glyphicon glyphicon-ok icon-ok check-mark'></i> </a> </li>";
          return $('#menu-item-page-url').append(html);
        });
        return this.$el.find('#aj-imp-page-sel').selectpicker({
          style: 'btn-mini btn-default',
          menuStyle: 'dropdown'
        });
      };

      return MenuItemView;

    })(Marionette.ItemView);
  });
});
