var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/menu/views', 'apps/builder/site-builder/elements/menu/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.Menu', function(Menu, App, Backbone, Marionette, $, _) {
    return Menu.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Menu',
          justified: false,
          style: '',
          menu_id: 0
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:menu_id", this.renderElement);
        this.listenTo(this.layout.model, "change:style", this.renderElement);
        this.listenTo(this.layout.model, "change:justified", (function(_this) {
          return function(model) {
            return _this.layout.elementRegion.currentView.triggerMethod("set:justified", model.get('justified'));
          };
        })(this));
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getMenuView = function(collection, templateClass) {
        return new Menu.Views.MenuView({
          collection: collection,
          prop: this.layout.model.toJSON(),
          templateClass: templateClass
        });
      };

      Controller.prototype.renderElement = function() {
        var menu, menuId, menuItemCollection, model, templateClass, view;
        model = this.layout.model;
        this.listenTo(this.layout.model, "positionupdated", this.renderElement);
        templateClass = model.get('style') !== '' ? model.get('style') : '';
        menuId = model.get('menu_id');
        if (parseInt(menuId) > 0 && window.menusCollection.length > 0) {
          menu = window.menusCollection.get(menuId);
          menuItemCollection = menu.get('menuItems');
          if (menuItemCollection.length === 0) {
            menuItemCollection.fetch({
              menu_id: menuId
            });
          }
        } else {
          menuItemCollection = new Backbone.Collection;
        }
        view = this._getMenuView(menuItemCollection, templateClass);
        view.on('show', view.removeMenuSettingsIcon);
        this.listenTo(view, "menu:element:clicked", (function(_this) {
          return function() {
            return App.execute("menu-manager", model, model.get('menu_id'));
          };
        })(this));
        return this.layout.elementRegion.show(view);
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
