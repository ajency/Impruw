var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('MenuManager.Add.Views', function(Views, App) {
    return Views.MenuItemView = (function(_super) {
      __extends(MenuItemView, _super);

      function MenuItemView() {
        return MenuItemView.__super__.constructor.apply(this, arguments);
      }

      MenuItemView.prototype.template = '<a class="add-menu-toggle" data-toggle="collapse" href="#add-menu-container"><span class="glyphicon glyphicon-plus"></span></a> <div id="add-menu-container" class="aj-imp-add-menu-item collapse"> <div id="{{menu_slug}}-add-menu" class="add-menu-form"> <h4>{{#polyglot}}Add Menu Item{{/polyglot}}</h4> <form class="form-inline"> <div class="form-group"> <label class="control-label">{{#polyglot}}Page Item{{/polyglot}}</label> <div class="bootstrap-select"> <select name="page_id" id="page_id"> {{#pages}} <option value="{{ID}}">{{post_title}}</option> {{/pages}} </select> </div> </div> <div class="form-group option-or"> <label class="control-label">&nbsp;</label> {{#polyglot}}Or{{/polyglot}} </div> <div class="form-group"> <label class="control-label">{{#polyglot}}Custom Menu Name{{/polyglot}}</label> <input class="form-control" placeholder="{{#polyglot}}Custom Menu Name{{/polyglot}}" type="text"> </div> <div class="form-group"> <label class="control-label">{{#polyglot}}URL{{/polyglot}}</label> <input class="form-control url" placeholder="{{#polyglot}}Custom Menu URL{{/polyglot}}" type="text"> </div> <div class="form-group"> <label class="control-label">&nbsp;</label> <!--<input type="hidden" value="{{id}}" name="menu_id"/> --> <button type="button" class="add-menu-item btn btn-default aj-imp-orange-btn"><span>{{#polyglot}}Add{{/polyglot}}</span></button> <input type="reset" id="btn_resetmenu" style="display:none"> </div> </form> </div> </div>';

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
