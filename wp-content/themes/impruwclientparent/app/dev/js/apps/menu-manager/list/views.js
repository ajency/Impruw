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

      MenuItemView.prototype.template = '<div class="row menu-item"> <div class="col-sm-1 menu-dragger"><span class="bicon icon-uniF160"></span></div> <div class="col-sm-8 menu-name">{{title}}</div> <div class="col-sm-3 menu-edit"> {{#isCustom}} <a href="#menu-item-{{menu_id}}-{{ID}}" data-toggle="collapse" id="menuitem-{{menu_id}}-{{ID}}" class="blue-link"> <span class="glyphicon glyphicon-edit"></span> {{#polyglot}}Edit Link{{/polyglot}} </a> {{/isCustom}} <a class="delete-menu-item red-link"><span class="glyphicon glyphicon-trash"></span>&nbsp;{{#polyglot}}Delete{{/polyglot}}</a> </div> </div> {{#isCustom}} <div id="menu-item-{{menu_id}}-{{ID}}" class="collapse menu-item-edit"> <form class="form-inline custom-menu-item-update-form"> <div class="form-group"> <label class="control-label">{{#polyglot}}Custom Menu Name{{/polyglot}}</label> <input value="{{title}}" required type="text" name="menu-item-title" class="form-control menuname" /> </div> <div class="form-group"> <label class="control-label">{{#polyglot}}Custom Menu URL{{/polyglot}}</label> <input value="{{url}}" required type="url" name="menu-item-url" id="menu-item-url-{{ID}}" class="form-control menuname" /> </div> <div class="form-group form-actions"> <label class="control-label">&nbsp;</label> <input type="hidden" value="{{ID}}" name="ID"> <input type="hidden" value="custom" name="menu-item-type"> <button type="button" class="update-menu-item btn btn-default aj-imp-orange-btn"><span>{{#polyglot}}Update Menu Item{{/polyglot}}</span></button> <a href="#" class="blue-link cancel-menu-item"><span>{{#polyglot}}Cancel{{/polyglot}}</span></a> </div> </form> </div>{{/isCustom}}';

      MenuItemView.prototype.tagName = 'li';

      MenuItemView.prototype.className = 'list-group-item';

      MenuItemView.prototype.modelEvents = {
        'change': 'render'
      };

      MenuItemView.prototype.ui = {
        customMeuUpdateForm: '.custom-menu-item-update-form'
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
          if (!this.ui.customMeuUpdateForm.valid()) {
            return;
          }
          formdata = Backbone.Syphon.serialize(this);
          return this.trigger("update:menu:item:clicked", formdata, this.model);
        },
        'click .delete-menu-item': function() {
          var message;
          message = "<h4 class='delete-message'>" + _.polyglot.t('This menu item will be removed from all the occurrences of the menu. Are you sure you want to delete the menu item?') + "</h4>";
          return bootbox.confirm(message, (function(_this) {
            return function(answer) {
              if (answer === true) {
                return _this.trigger("delete:menu:item:clicked", _this.model);
              }
            };
          })(this));
        },
        'click .cancel-menu-item': function() {
          return this.$el.closest('.list-group-item').find('[data-toggle]').click();
        }
      };

      MenuItemView.prototype.onShow = function() {
        var options, urlField;
        urlField = "menu-item-url-" + (this.model.get('ID'));
        options = {
          rules: {}
        };
        options['rules'][urlField] = {
          url2: true
        };
        return this.ui.customMeuUpdateForm.validate(options);
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

      MenuCollectionView.prototype.itemView = MenuItemView;

      MenuCollectionView.prototype.emptyView = EmptyView;

      MenuCollectionView.prototype.itemViewContainer = 'ol.sortable-menu-items';

      MenuCollectionView.prototype.className = 'aj-imp-menu-item-list';

      MenuCollectionView.prototype.ui = {
        sortableList: '.sortable-menu-items'
      };

      MenuCollectionView.prototype.appendHtml = function(collectionView, childView, index) {
        if (this.collection.length === 0) {
          Marionette.CollectionView.prototype.appendHtml.apply(this, arguments);
          return;
        }
        if (childView.model.get('menu_item_parent') === '0') {
          collectionView.$(this.itemViewContainer).append(childView.el);
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
