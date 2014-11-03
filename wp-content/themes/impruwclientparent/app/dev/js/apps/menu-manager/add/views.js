var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('MenuManager.Add.Views', function(Views, App) {
    return Views.MenuItemView = (function(_super) {
      __extends(MenuItemView, _super);

      function MenuItemView() {
        return MenuItemView.__super__.constructor.apply(this, arguments);
      }

      MenuItemView.prototype.template = '<div class="aj-imp-add-menu-item"> <h4>{{#polyglot}}Add Menu Item{{/polyglot}}</h4> <ul class="list-steps"> <li>{{#polyglot}}Add menu items by selecting an item from the dropdown and clicking on the Add menu item button below.{{/polyglot}}</li> <li>{{#polyglot}}You can edit the order of your menu items from the list on the right.{{/polyglot}}</li> <li>{{#polyglot}}To make a menu item a submenu, indent the menu.{{/polyglot}}</li> <li>{{#polyglot}}You can only add pages to menu items, to edit the name of the page go back to your site builder and edit the name of page by editing the page title on the top left corner.{{/polyglot}}</li> </ul> <div id="{{menu_slug}}-add-menu" class="add-menu-form"> <form class="form-horizontal"> <div class="form-group"> <label class="col-sm-4 control-label">{{#polyglot}}Menu Link{{/polyglot}}</label> <div class="col-sm-8"> <div class="bootstrap-select"> <select name="page_id" id="page_id"> {{#pages}} <option value="{{ID}}">{{post_title}}</option> {{/pages}} </select> </div> </div> </div> <div class="form-group"> <div class="col-sm-offset-4 col-sm-8"> <!--<input type="hidden" value="{{id}}" name="menu_id"/> --> <button type="button" class="add-menu-item btn btn-default btn-xs aj-imp-orange-btn"><span>{{#polyglot}}Add Menu Item{{/polyglot}}</span></button> <input type="reset" id="btn_resetmenu" style="display:none"> </div> </div> </form> </div> </div>';

      MenuItemView.prototype.className = 'aj-imp-menu-edit';

      MenuItemView.prototype.events = {
        'click .add-menu-item': function() {
          var data, pageId, pageName;
          pageId = this.$el.find('#page_id').val();
          pageName = this.$el.find('#page_id option:selected').text();
          data = {
            'page_id': pageId,
            'menu_item_title': pageName
          };
          return this.trigger("add:menu:item:clicked", data);
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
        return this.$el.find('select[name="page_id"]').selectpicker();
      };

      return MenuItemView;

    })(Marionette.ItemView);
  });
});
