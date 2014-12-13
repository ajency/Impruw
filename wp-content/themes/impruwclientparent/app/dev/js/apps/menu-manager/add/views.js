var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('MenuManager.Add.Views', function(Views, App) {
    return Views.MenuItemView = (function(_super) {
      __extends(MenuItemView, _super);

      function MenuItemView() {
        this.onAddMenuitemSuccess = __bind(this.onAddMenuitemSuccess, this);
        this.showMissingFieldMessage = __bind(this.showMissingFieldMessage, this);
        return MenuItemView.__super__.constructor.apply(this, arguments);
      }

      MenuItemView.prototype.template = '<a class="add-menu-toggle" data-toggle="collapse" href="#add-menu-container"><span class="glyphicon glyphicon-plus"></span></a> <ul class="list-steps"> <li>{{#polyglot}}To add items to the Menu, click on the plus sign.{{/polyglot}}</li> <li>{{#polyglot}}You can choose a page from the list of available pages from the dropdown OR Add a different page by adding the name of the page to be displayed on the menu and the page URL.{{/polyglot}}</li> <li>{{#polyglot}}You can only edit custom menu items form here, to edit the names of existing pages, go back to your site builder and edit the name of page by editing the page title on the top left corner.{{/polyglot}}</li> <li>{{#polyglot}}You can edit the order of your menu by dragging and dropping them in the list.{{/polyglot}}</li> <li>{{#polyglot}}To make a menu item a submenu, indent that menu item.{{/polyglot}}</li> </ul> <div id="add-menu-container" class="aj-imp-add-menu-item collapse"> <div id="{{menu_slug}}-add-menu" class="add-menu-form"> <h4>{{#polyglot}}Add Menu Item{{/polyglot}}</h4> <form class="form-inline"> <div class="form-group"> <label class="control-label">{{#polyglot}}Page Item{{/polyglot}}</label> <div class="bootstrap-select"> <select name="page_id" id="page_id"> <option value="">{{#polyglot}}Choose Page{{/polyglot}}</option> {{#pages}} <option value="{{ID}}">{{post_title}}</option> {{/pages}} </select> </div> </div> <div class="form-group option-or"> <label class="control-label">&nbsp;</label> {{#polyglot}}Or{{/polyglot}} </div> <div class="form-group"> <label class="control-label">{{#polyglot}}Custom Menu Name{{/polyglot}}</label> <input name="custom-menu-name" class="form-control" placeholder="{{#polyglot}}Custom Menu Name{{/polyglot}}" type="text"> </div> <div class="form-group"> <label class="control-label">{{#polyglot}}URL{{/polyglot}}</label> <input id="custom-menu-url" value="http://" name="custom-menu-url" required class="form-control url" placeholder="{{#polyglot}}Custom Menu URL{{/polyglot}}" type="url"> </div> <div class="form-group"> <label class="control-label">&nbsp;</label> <button type="button" class="add-menu-item btn btn-default aj-imp-orange-btn"><span>{{#polyglot}}Add{{/polyglot}}</span></button> <input type="reset" id="btn_resetmenu" class="hidden"/> </div> </form> </div> </div>';

      MenuItemView.prototype.className = 'aj-imp-menu-edit';

      MenuItemView.prototype.ui = {
        'menuName': 'input[name="custom-menu-name"]',
        'menuUrl': 'input[name="custom-menu-url"]',
        'pageId': '#page_id',
        'resetButton': '#btn_resetmenu',
        'form': 'form.form-inline',
        'customUrlField': 'input[name="custom-menu-url"]'
      };

      MenuItemView.prototype.events = {
        'change select[name="page_id"]': function() {
          if (this.$el.find('#page_id').selectpicker('val') !== '') {
            this.$el.find('input[name="custom-menu-name"],input[name="custom-menu-url"]').val('');
            return this.$el.find('input[name="custom-menu-url"]').next('.field-error').remove();
          }
        },
        'keypress input[name="custom-menu-name"],input[name="custom-menu-url"]': function() {
          return this.$el.find('#page_id').selectpicker('val', '');
        },
        'click .add-menu-item': 'addMenuItem'
      };

      MenuItemView.prototype.addMenuItem = function() {
        var data, pageId;
        this.$el.find('.alert').remove();
        data = {};
        if (this.ui.menuName.val() !== '') {
          if (!this.ui.customUrlField.valid()) {
            return;
          }
          data['menu-item-title'] = this.ui.menuName.val();
          data['menu-item-type'] = 'custom';
          data['menu-item-url'] = this.ui.menuUrl.val();
        } else {
          pageId = this.ui.pageId.selectpicker('val');
          if (pageId === '') {
            this.showMissingFieldMessage();
            return;
          }
          data['menu-item-object-id'] = pageId;
          data['menu-item-db-id'] = 0;
          data['menu-item-object'] = 'page';
          data['menu-item-parent-id'] = 0;
          data['menu-item-type'] = 'post_type';
          data['menu-item-title'] = this.ui.pageId.find('option:selected').text();
        }
        data['menu-settings-column-nonce'] = window._MENUNONCE;
        return this.trigger("add:menu:item:clicked", data);
      };

      MenuItemView.prototype.showMissingFieldMessage = function() {
        var message;
        message = _.polyglot.t('Sorry, you need to add the menu name and link for custom menus or you could simply select a page from page item drop down');
        return this.$el.find('form.form-inline').prepend("<div class='alert alert-danger'>" + message + "</div>");
      };

      MenuItemView.prototype.serializeData = function() {
        var data, pages;
        data = MenuItemView.__super__.serializeData.call(this);
        pages = App.request("get:editable:pages");
        pages = pages.toJSON();
        pages = _.reject(pages, function(page) {
          var title;
          title = page['post_title'];
          return title === 'Single Room' || title === 'Enkeltrom';
        });
        data.pages = pages;
        return data;
      };

      MenuItemView.prototype.onAddMenuitemSuccess = function() {
        return this.ui.resetButton.click();
      };

      MenuItemView.prototype.onNewMenuCreated = function() {
        this.$el.find('.alert').remove();
        this.$el.find('.add-menu-form').prepend('<div class="alert alert-success">New menu added</div>');
        return this.$el.find('#btn_resetmenu').click();
      };

      MenuItemView.prototype.onShow = function() {
        this.$el.find('select[name="page_id"]').selectpicker();
        return this.ui.form.validate({
          rules: {
            "custom-menu-url": {
              url2: true
            }
          }
        });
      };

      return MenuItemView;

    })(Marionette.ItemView);
  });
});
