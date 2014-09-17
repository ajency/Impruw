var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['app'], function(App) {
  return App.module('MenuManager.List.Views', function(Views, App) {
    var EmptyView, MenuItemView;
    MenuItemView = (function(_super) {
      __extends(MenuItemView, _super);

      function MenuItemView() {
        return MenuItemView.__super__.constructor.apply(this, arguments);
      }

      MenuItemView.prototype.template = '<div class="row menu-item"> <div class="col-sm-1 menu-dragger"><span class="bicon icon-uniF160"></span></div> <div class="col-sm-8 menu-name">{{menu_item_title}}</div> <div class="col-sm-3 menu-edit"> <a href="#menu-item-{{menu_id}}-{{ID}}" data-toggle="collapse" id="menuitem-{{menu_id}}-{{ID}}"> <span class="glyphicon glyphicon-edit"></span> {{#polyglot}}View{{/polyglot}} </a> </div> </div> <div id="menu-item-{{menu_id}}-{{ID}}" class="collapse menu-item-edit"> <form class="form-horizontal"> <div class="form-group"> <label class="col-sm-4 control-label">{{#polyglot}}Menu Link Label{{/polyglot}}</label> <div class="col-sm-8"> <input value="{{menu_item_title}}" parsley-required="true" type="text" name="menu_item_title" class="form-control menuname" readonly="readonly"/> </div> </div> <div class="form-group"> <label class="col-sm-4 control-label">{{#polyglot}}Menu Link{{/polyglot}}</label> <div class="col-sm-8"> <input value="{{menu_item_url}}" parsley-type="url" parsley-required="true" type="text" name="menu_item_url" class="form-control menutitle" readonly="readonly"/> </div> </div> <div class="form-group form-actions"> <div class="col-sm-offset-4 col-sm-8"> <!--<input type="hidden" value="{{menu_id}}" name="menu_id"/> --> <!--<button type="button" class="update-menu-item btn btn-info"><span>{{#polyglot}}Update Menu Item{{/polyglot}}</span></button>--> <button type="button" class="btn cancel-menu-item"><span>{{#polyglot}}Cancel{{/polyglot}}</span></button> <button type="button" class="btn btn-danger delete-menu-item"><span class="glyphicon glyphicon-trash"></span></button> </div> </div> </form> </div>';

      MenuItemView.prototype.tagName = 'li';

      MenuItemView.prototype.className = 'list-group-item';

      MenuItemView.prototype.modelEvents = {
        'change': 'render'
      };

      MenuItemView.prototype.onRender = function() {
        return this.$el.attr('id', 'item-' + this.model.get('ID'));
      };

      MenuItemView.prototype.events = {
        'click .update-menu-item': function() {
          var formdata;
          formdata = Backbone.Syphon.serialize(this);
          return this.trigger("update:menu:item:clicked", formdata, this.model);
        },
        'click .delete-menu-item': function() {
          if (confirm(_.polyglot.t('Delete menu item'))) {
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
    EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.template = '<span class="bicon icon-uniF151"></span> {{#polyglot}}No Menu Items found{{/polyglot}}';

      EmptyView.prototype.tagName = 'div';

      EmptyView.prototype.className = 'empty-view menu-empty';

      return EmptyView;

    })(Marionette.ItemView);
    return Views.MenuCollectionView = (function(_super) {
      __extends(MenuCollectionView, _super);

      function MenuCollectionView() {
        this.itemViewOptions = __bind(this.itemViewOptions, this);
        this.onTriggerOrderChange = __bind(this.onTriggerOrderChange, this);
        return MenuCollectionView.__super__.constructor.apply(this, arguments);
      }

      MenuCollectionView.prototype.template = '<div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">{{menu_name}}</h3> </div> <ol class="list-group sortable-menu-items ui-sortable"></ol> </div>';

      MenuCollectionView.prototype.itemView = MenuItemView;

      MenuCollectionView.prototype.emptyView = EmptyView;

      MenuCollectionView.prototype.itemViewContainer = 'ol.sortable-menu-items';

      MenuCollectionView.prototype.className = 'aj-imp-menu-item-list';

      MenuCollectionView.prototype.onShow = function() {
        return this.$el.find('.sortable-menu-items').sortable({
          handle: 'div.menu-dragger',
          items: 'li.list-group-item',
          tolerance: 'intersect',
          stop: (function(_this) {
            return function(e, ui) {
              var order;
              order = _this.$el.find('.sortable-menu-items').sortable('toArray');
              return _this.sendData(order, _this.collection);
            };
          })(this)
        });
      };

      MenuCollectionView.prototype.sendData = function(order, collection) {
        return this.trigger("view:menu:order:changed", order, collection);
      };

      MenuCollectionView.prototype.onMenuItemUpdated = function() {
        this.$el.find('.alert').remove();
        return this.$el.prepend('<div class="alert alert-success">' + _.polyglot.t("Menu item updated") + '</div>');
      };

      MenuCollectionView.prototype.onTriggerOrderChange = function() {
        return _.delay((function(_this) {
          return function() {
            var order;
            order = _this.$el.find('.sortable-menu-items').sortable('toArray');
            return _this.sendData(order, _this.collection);
          };
        })(this), 600);
      };

      MenuCollectionView.prototype.itemViewOptions = function(collection, index) {
        return {
          itemIndex: index,
          collection: this.collection
        };
      };

      MenuCollectionView.prototype.serializeData = function() {
        var data;
        data = {
          menus: []
        };
        this.collection.each(function(model, index) {
          var menu;
          menu = {};
          menu.menu_item_url = model.get('menu_item_url');
          menu.menu_name = model.get('menu_item_title');
          return data.menus.push(menu);
        });
        return data;
      };

      return MenuCollectionView;

    })(Marionette.CompositeView);
  });
});
