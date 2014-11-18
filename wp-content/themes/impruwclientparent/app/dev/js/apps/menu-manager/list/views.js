var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'bootbox'], function(App, bootbox) {
  return App.module('MenuManager.List.Views', function(Views, App) {
    var EmptyView, MenuItemView;
    MenuItemView = (function(_super) {
      __extends(MenuItemView, _super);

      function MenuItemView() {
        return MenuItemView.__super__.constructor.apply(this, arguments);
      }

      MenuItemView.prototype.template = '<div class="row menu-item"> <div class="col-sm-1 menu-dragger"><span class="bicon icon-uniF160"></span></div> <div class="col-sm-8 menu-name">{{title}}</div> <div class="col-sm-3 menu-edit"> {{#isCustom}} <a href="#menu-item-{{menu_id}}-{{ID}}" data-toggle="collapse" id="menuitem-{{menu_id}}-{{ID}}" class="blue-link"> <span class="glyphicon glyphicon-edit"></span> {{#polyglot}}Edit Link{{/polyglot}} </a> {{/isCustom}} <a class="delete-menu-item red-link"><span class="glyphicon glyphicon-trash"></span>&nbsp;{{#polyglot}}Delete{{/polyglot}}</a> </div> </div> {{#isCustom}} <div id="menu-item-{{menu_id}}-{{ID}}" class="collapse menu-item-edit"> <form class="form-inline"> <div class="form-group"> <label class="control-label">{{#polyglot}}Custom Menu Name{{/polyglot}}</label> <input value="{{title}}" parsley-required="true" type="text" name="menu_item_title" class="form-control menuname" /> </div> <div class="form-group"> <label class="control-label">{{#polyglot}}Custom Menu URL{{/polyglot}}</label> <input value="{{url}}" parsley-type="url" parsley-required="true" type="text" name="menu_item_url" class="form-control menutitle" /> </div> <div class="form-group form-actions"> <label class="control-label">&nbsp;</label> <button type="button" class="update-menu-item btn btn-default aj-imp-orange-btn"><span>{{#polyglot}}Update Menu Item{{/polyglot}}</span></button> <a href="#" class="blue-link cancel-menu-item"><span>{{#polyglot}}Cancel{{/polyglot}}</span></a> </div> </form> </div>{{/isCustom}}';

      MenuItemView.prototype.tagName = 'li';

      MenuItemView.prototype.className = 'list-group-item';

      MenuItemView.prototype.modelEvents = {
        'change': 'render'
      };

      MenuItemView.prototype.mixinTemplateHelpers = function(data) {
        data = MenuItemView.__super__.mixinTemplateHelpers.call(this, data);
        data.isCustom = data.object === 'custom';
        return data;
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
          return bootbox.confirm(_.polyglot.t('Delete menu item?'), (function(_this) {
            return function(answer) {
              if (answer === true) {
                return _this.trigger("delete:menu:item:clicked", _this.model);
              }
            };
          })(this));
        },
        'click .cancel-menu-item': function() {
          var menu_id, menu_item_id;
          menu_id = this.model.get('menu_id');
          menu_item_id = this.model.get('ID');
          this.$el.find('.menuname').val(this.model.get('menu_item_title'));
          this.$el.find('.menutitle').val(this.model.get('menu_item_url'));
          this.$el.find("#menuitem-" + menu_id + "-" + menu_item_id).click();
          return false;
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
        return MenuCollectionView.__super__.constructor.apply(this, arguments);
      }

      MenuCollectionView.prototype.template = '<div class="panel panel-default"> <ol class="list-group sortable-menu-items ui-sortable"></ol> </div>';

      MenuCollectionView.prototype.childView = MenuItemView;

      MenuCollectionView.prototype.emptyView = EmptyView;

      MenuCollectionView.prototype.childViewContainer = 'ol.sortable-menu-items';

      MenuCollectionView.prototype.className = 'aj-imp-menu-item-list';

      MenuCollectionView.prototype.ui = {
        sortableList: '.sortable-menu-items'
      };

      MenuCollectionView.prototype.attachHtml = function(collectionView, childView, index) {
        if (this.collection.length === 0) {
          Marionette.CollectionView.prototype.attachHtml.apply(this, arguments);
          return;
        }
        if (childView.model.get('menu_item_parent') === '0') {
          collectionView.$(this.childViewContainer).append(childView.el);
        } else {
          this.createSubMenuAndAppend(collectionView, childView);
        }
        return collectionView._bufferedChildren.push(childView);
      };

      MenuCollectionView.prototype.createSubMenuAndAppend = function(collectionView, childView) {
        var $ul, menuItemModel;
        menuItemModel = childView.model;
        $ul = collectionView.$el.find("#item-" + (menuItemModel.get('menu_item_parent')) + " ol");
        if ($ul.length === 0) {
          $ul = collectionView.$el.find("#item-" + (menuItemModel.get('menu_item_parent'))).append('<ol></ol>');
        }
        $ul = collectionView.$el.find("#item-" + (menuItemModel.get('menu_item_parent')) + " ol");
        return $ul.append(childView.el);
      };

      MenuCollectionView.prototype.onMenuOrderUpdated = function() {
        this.ui.sortableList.parents('.panel').before("<div class='alert alert-success alert-dismissible' role='alert'> <button type='button' class='close' data-dismiss='alert'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button> " + (_.polyglot.t('Order updated successfully')) + " </div>");
        return this.ui.sortableList.nestedSortable('enable');
      };

      MenuCollectionView.prototype.onShow = function() {
        return this.ui.sortableList.nestedSortable({
          handle: 'div.menu-dragger',
          items: 'li.list-group-item',
          tolerance: 'intersect',
          maxLevels: 2,
          stop: (function(_this) {
            return function(e, ui) {
              var newOrder, order;
              order = _this.ui.sortableList.nestedSortable('toArray');
              newOrder = [];
              _.each(order, function(item, index) {
                var itemData;
                if (!item['item_id']) {
                  return;
                }
                itemData = {};
                itemData['ID'] = item['item_id'];
                itemData['menu_order'] = index;
                if (item['parent_id']) {
                  itemData['menu_item_parent'] = item['parent_id'] + '';
                } else {
                  itemData['menu_item_parent'] = "0";
                }
                return newOrder.push(itemData);
              });
              _this.$el.find('.alert').remove();
              _this.trigger("menu:item:order:updated", newOrder);
              return _this.ui.sortableList.nestedSortable('disable');
            };
          })(this)
        });
      };

      return MenuCollectionView;

    })(Marionette.CompositeView);
  });
});
