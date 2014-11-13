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

      MenuItemView.prototype.template = '<a href="{{menu_item_url}}">{{menu_item_title}}</a>';

      MenuItemView.prototype.initialize = function(opt) {
        if (opt == null) {
          opt = {};
        }
        this.listenTo(this.model, "change", this.render);
        return MenuItemView.__super__.initialize.call(this, opt);
      };

      MenuItemView.prototype.tagName = 'li';

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
        return MenuView.__super__.constructor.apply(this, arguments);
      }

      MenuView.prototype.tagName = 'ul';

      MenuView.prototype.className = 'nav';

      MenuView.prototype.itemView = Views.MenuItemView;

      MenuView.prototype.emptyView = EmptyView;

      MenuView.prototype.events = {
        'click': function() {
          return App.execute("menu-manager", 0);
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
