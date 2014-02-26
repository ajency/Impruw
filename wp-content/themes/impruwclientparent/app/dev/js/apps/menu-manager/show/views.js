// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'text!apps/menu-manager/show/templates/menucollection.html', 'text!apps/menu-manager/show/templates/menumanager.html', 'text!apps/menu-manager/show/templates/menuitem.html'], function(App, menucollectionTpl, menumanagerTpl, menuItemTpl) {
    return App.module('MenuManager.Show.Views', function(Views, App) {
      var MenuItemView, SingleManagerView, _ref, _ref1, _ref2;
      MenuItemView = (function(_super) {
        __extends(MenuItemView, _super);

        function MenuItemView() {
          _ref = MenuItemView.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        MenuItemView.prototype.initialize = function() {
          return this.listenTo(this.model, "change", this.render);
        };

        MenuItemView.prototype.template = menuItemTpl;

        MenuItemView.prototype.tagName = 'li';

        MenuItemView.prototype.className = 'list-group-item';

        MenuItemView.prototype.events = {
          'click .update-menu-item': function() {
            return App.vent.trigger("itemview:update:menu:item", this.model, Backbone.Syphon.serialize(this));
          }
        };

        MenuItemView.prototype.onRender = function() {
          return this.$el.attr('id', 'item-' + this.model.get('ID'));
        };

        return MenuItemView;

      })(Marionette.ItemView);
      SingleManagerView = (function(_super) {
        __extends(SingleManagerView, _super);

        function SingleManagerView() {
          _ref1 = SingleManagerView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        SingleManagerView.prototype.initialize = function(opt) {
          this.itemIndex = opt.itemIndex;
          return SingleManagerView.__super__.initialize.call(this, opt);
        };

        SingleManagerView.prototype.template = menumanagerTpl;

        SingleManagerView.prototype.itemView = MenuItemView;

        SingleManagerView.prototype.itemViewContainer = 'ol.sortable-menu-items';

        SingleManagerView.prototype.className = 'tab-pane';

        SingleManagerView.prototype.events = {
          'click .add-menu-item': function() {
            var formData;
            formData = Backbone.Syphon.serialize(this);
            return this.trigger("new:menu:item:added", formData);
          }
        };

        SingleManagerView.prototype.onRender = function() {
          var _this = this;
          if (this.itemIndex === 0) {
            this.$el.addClass('active');
          }
          this.$el.attr('id', this.model.get('menu_slug'));
          return this.$el.find('.sortable-menu-items').sortable({
            handle: 'div.menu-dragger',
            items: 'li.list-group-item',
            toleranceElement: '> div',
            stop: function(e, ui) {
              var order;
              order = _this.$el.find('.sortable-menu-items').sortable('toArray');
              return _this.trigger('menu:order:changed', order);
            }
          });
        };

        return SingleManagerView;

      })(Marionette.CompositeView);
      return Views.MenuManagerView = (function(_super) {
        __extends(MenuManagerView, _super);

        function MenuManagerView() {
          _ref2 = MenuManagerView.__super__.constructor.apply(this, arguments);
          return _ref2;
        }

        MenuManagerView.prototype.initialize = function() {
          var _this = this;
          return this.on("itemview:menu:order:changed", function(iv, order) {
            return _this.trigger("menu:order:changed", iv.model, order);
          });
        };

        MenuManagerView.prototype.template = menucollectionTpl;

        MenuManagerView.prototype.itemView = SingleManagerView;

        MenuManagerView.prototype.itemViewOptions = function(item, index) {
          return {
            itemIndex: index,
            collection: item.get('menu_items')
          };
        };

        MenuManagerView.prototype.dialogOptions = {
          modal_title: 'Menu Manager'
        };

        MenuManagerView.prototype.serializeData = function() {
          var data;
          data = {
            menus: []
          };
          this.collection.each(function(model, index) {
            var menu;
            menu = {};
            menu.menu_slug = model.get('menu_slug');
            menu.menu_name = model.get('menu_name');
            return data.menus.push(menu);
          });
          return data;
        };

        MenuManagerView.prototype.itemViewContainer = '.tab-content';

        return MenuManagerView;

      })(Marionette.CompositeView);
    });
  });

}).call(this);
