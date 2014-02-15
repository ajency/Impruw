// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['app'], function(App) {
    App.module('SiteBuilderApp.Element.Menu.Views', function(Views, App, Backbone, Marionette, $, _) {
      var _ref, _ref1, _ref2;
      Views.MenuItemView = (function(_super) {
        __extends(MenuItemView, _super);

        function MenuItemView() {
          _ref = MenuItemView.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        MenuItemView.prototype.initialize = function(opt) {
          if (opt == null) {
            opt = {};
          }
          this.template = opt.template;
          return MenuItemView.__super__.initialize.call(this, opt);
        };

        MenuItemView.prototype.tagName = 'li';

        return MenuItemView;

      })(Marionette.ItemView);
      Views.SubMenuView = (function(_super) {
        __extends(SubMenuView, _super);

        function SubMenuView() {
          _ref1 = SubMenuView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        SubMenuView.prototype.itemView = Views.MenuItemView;

        SubMenuView.prototype.itemViewContainer = 'ul.submenu';

        return SubMenuView;

      })(Marionette.CompositeView);
      return Views.MenuView = (function(_super) {
        __extends(MenuView, _super);

        function MenuView() {
          this.itemViewOptions = __bind(this.itemViewOptions, this);
          _ref2 = MenuView.__super__.constructor.apply(this, arguments);
          return _ref2;
        }

        MenuView.prototype.initialize = function(opt) {
          var _ref3;
          if (opt == null) {
            opt = {};
          }
          this.template = (_ref3 = opt.templates.menuTpl) != null ? _ref3 : '';
          return MenuView.__super__.initialize.call(this, opt);
        };

        MenuView.prototype.itemView = Views.MenuItemView;

        MenuView.prototype.itemViewOptions = function() {
          var _ref3;
          return {
            template: (_ref3 = this.options.templates.menuItemTpl) != null ? _ref3 : ''
          };
        };

        MenuView.prototype.itemViewContainer = 'ul.menu';

        MenuView.prototype.onBeforeRender = function() {
          return this.collection.sort();
        };

        return MenuView;

      })(Marionette.CompositeView);
    });
    return App.SiteBuilderApp.Element.Menu.Views;
  });

}).call(this);
