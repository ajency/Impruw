var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['app'], function(App) {
  App.module('SiteBuilderApp.Element.Menu.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyView;
    Views.MenuItemView = (function(_super) {
      __extends(MenuItemView, _super);

      function MenuItemView() {
        return MenuItemView.__super__.constructor.apply(this, arguments);
      }

      MenuItemView.prototype.template = '<a href="#">{{title}}</a>';

      MenuItemView.prototype.initialize = function(opt) {
        if (opt == null) {
          opt = {};
        }
        this.listenTo(this.model, "change", this.render);
        return MenuItemView.__super__.initialize.call(this, opt);
      };

      MenuItemView.prototype.tagName = 'li';

      MenuItemView.prototype.onRender = function() {
        return this.$el.attr('id', 'item-' + this.model.get('ID'));
      };

      return MenuItemView;

    })(Marionette.ItemView);
    Views.SubMenuView = (function(_super) {
      __extends(SubMenuView, _super);

      function SubMenuView() {
        return SubMenuView.__super__.constructor.apply(this, arguments);
      }

      SubMenuView.prototype.itemView = Views.MenuItemView;

      SubMenuView.prototype.itemViewContainer = 'ul.submenu';

      return SubMenuView;

    })(Marionette.CompositeView);
    EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.tagsName = 'ul';

      EmptyView.prototype.template = '<div class="empty-view"><span class="bicon icon-uniF14E"></span>{{#polyglot}}No menu found. Click to Edit or Create a Menu.{{/polyglot}}</div>';

      return EmptyView;

    })(Marionette.ItemView);
    return Views.MenuView = (function(_super) {
      __extends(MenuView, _super);

      function MenuView() {
        this.setAlignment = __bind(this.setAlignment, this);
        this.removeMenuSettingsIcon = __bind(this.removeMenuSettingsIcon, this);
        return MenuView.__super__.constructor.apply(this, arguments);
      }

      MenuView.prototype.tagName = 'ul';

      MenuView.prototype.className = 'nav slimmenu';

      MenuView.prototype.itemView = Views.MenuItemView;

      MenuView.prototype.emptyView = EmptyView;

      MenuView.prototype.events = {
        'click': function(e) {
          e.preventDefault();
          return this.trigger("menu:element:clicked");
        },
        'click a': function(evt) {
          return evt.preventDefault();
        }
      };

      MenuView.prototype.onRender = function() {
        this.$el.removeClass();
        this.$el.addClass(this.className);
        this.$el.addClass(_.slugify(this.options.templateClass));
        return this.onSetJustified(this.options.prop.justified);
      };

      MenuView.prototype.appendHtml = function(collectionView, childView, index) {
        if (this.collection.length === 0) {
          Marionette.CollectionView.prototype.appendHtml.apply(this, arguments);
          return;
        }
        if (childView.model.get('menu_item_parent') === '0') {
          collectionView.$el.append(childView.el);
        } else {
          this.createSubMenuAndAppend(collectionView, childView);
        }
        return collectionView._bufferedChildren.push(childView);
      };

      MenuView.prototype.createSubMenuAndAppend = function(collectionView, childView) {
        var $ul, menuItemModel;
        menuItemModel = childView.model;
        $ul = collectionView.$el.find("#item-" + (menuItemModel.get('menu_item_parent')) + " ul");
        if ($ul.length === 0) {
          $ul = collectionView.$el.find("#item-" + (menuItemModel.get('menu_item_parent'))).append('<ul></ul>');
        }
        $ul = collectionView.$el.find("#item-" + (menuItemModel.get('menu_item_parent')) + " ul");
        return $ul.append(childView.el);
      };

      MenuView.prototype.removeMenuSettingsIcon = function() {
        return this.$el.closest('.element-wrapper').find('.element-controls .aj-imp-settings-btn').remove();
      };

      MenuView.prototype.onShow = function() {
        return this.$el.slimmenu();
      };

      MenuView.prototype.onBeforeRender = function() {};

      MenuView.prototype.setAlignment = function(align) {
        this.$el.removeClass('navbar-left navbar-center navbar-right');
        return this.$el.addClass("navbar-" + align);
      };

      MenuView.prototype.onSetJustified = function(val) {
        if (val === true) {
          return this.$el.addClass("nav-justified");
        } else {
          return this.$el.removeClass("nav-justified");
        }
      };

      return MenuView;

    })(Marionette.CompositeView);
  });
  return App.SiteBuilderApp.Element.Menu.Views;
});
