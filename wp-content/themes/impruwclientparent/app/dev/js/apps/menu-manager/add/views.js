var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('MenuManager.Add.Views', function(Views, App) {
    return Views.MenuItemView = (function(_super) {
      __extends(MenuItemView, _super);

      function MenuItemView() {
        return MenuItemView.__super__.constructor.apply(this, arguments);
      }

      MenuItemView.prototype.template = '<a class="add-menu-toggle" data-toggle="collapse" href="#add-menu-container"><span class="glyphicon glyphicon-plus"></span></a> <div id="add-menu-container" class="aj-imp-add-menu-item collapse"> <div id="{{menu_slug}}-add-menu" class="add-menu-form"> <h4>{{#polyglot}}Add Menu Item{{/polyglot}}</h4> <form class="form-inline"> <div class="form-group"> <label class="control-label">{{#polyglot}}Page Item{{/polyglot}}</label> <div class="bootstrap-select"> <select name="page_id" id="page_id"> {{^hasMenus}} <option value="">{{#polyglot}}Choose Page{{/polyglot}}</option> {{/hasMenus}} {{#pages}} <option value="{{ID}}">{{post_title}}</option> {{/pages}} </select> </div> </div> <div class="form-group option-or"> <label class="control-label">&nbsp;</label> {{#polyglot}}Or{{/polyglot}} </div> <div class="form-group"> <label class="control-label">{{#polyglot}}Custom Menu Name{{/polyglot}}</label> <input name="custom-menu-name" class="form-control" placeholder="{{#polyglot}}Custom Menu Name{{/polyglot}}" type="text"> </div> <div class="form-group"> <label class="control-label">{{#polyglot}}URL{{/polyglot}}</label> <input name="custom-menu-url" class="form-control url" placeholder="{{#polyglot}}Custom Menu URL{{/polyglot}}" type="text"> </div> <div class="form-group"> <label class="control-label">&nbsp;</label> <button type="button" class="add-menu-item btn btn-default aj-imp-orange-btn"><span>{{#polyglot}}Add{{/polyglot}}</span></button> <input type="reset" id="btn_resetmenu" style="display:none"> </div> </form> </div> </div>';

      MenuItemView.prototype.className = 'aj-imp-menu-edit';

      MenuItemView.prototype.ui = {
        'menuName': 'input[name="custom-menu-name"]',
        'menuUrl': 'input[name="custom-menu-url"]',
        'pageId': '#page_id'
      };

      MenuItemView.prototype.events = {
        'change select[name="page_id"]': function() {
          if (this.$el.find('#page_id').selectpicker('val') !== '') {
            return this.$el.find('input[name="custom-menu-name"],input[name="custom-menu-url"]').val('');
          }
        },
        'keypress input[name="custom-menu-name"],input[name="custom-menu-url"]': function() {
          return this.$el.find('#page_id').selectpicker('val', '');
        },
        'click .add-menu-item': 'addMenuItem'
      };

      MenuItemView.prototype.addMenuItem = function() {
        var data;
        data = {};
        if (this.ui.menuName.val() !== '') {
          data['menu-item-title'] = this.ui.menuName.val();
          data['menu-item-type'] = 'custom';
          data['menu-item-url'] = this.ui.menuUrl.val();
        } else {
          data['menu-item-object-id'] = this.ui.pageId.selectpicker('val');
          data['menu-item-db-id'] = 0;
          data['menu-item-object'] = 'page';
          data['menu-item-parent-id'] = 0;
          data['menu-item-type'] = 'post_type';
          data['menu-item-title'] = this.ui.pageId.find('option:selected').text();
        }
        data['menu-settings-column-nonce'] = window._MENUNONCE;
        return this.trigger("add:menu:item:clicked", data);
      };

      MenuItemView.prototype.serializeData = function() {
        var data, pages;
        data = MenuItemView.__super__.serializeData.call(this);
        pages = App.request("get:editable:pages");
        data.pages = pages.toJSON();
        data.hasMenus = pages.length > 0;
        return data;
      };

      MenuItemView.prototype.onNewMenuCreated = function() {
        this.$el.find('.alert').remove();
        this.$el.find('.add-menu-form').prepend('<div class="alert alert-success">New menu added</div>');
        return this.$el.find('#btn_resetmenu').click();
      };

      MenuItemView.prototype.onShow = function() {
        return this.$el.find('select[name="page_id"]').selectpicker();
      };

      return MenuItemView;

    })(Marionette.ItemView);
  });
});
