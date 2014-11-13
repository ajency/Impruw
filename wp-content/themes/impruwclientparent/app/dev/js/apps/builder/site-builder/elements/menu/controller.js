var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/menu/views', 'apps/builder/site-builder/elements/menu/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.Menu', function(Menu, App, Backbone, Marionette, $, _) {
    return Menu.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        this.newMenuItemAdded = __bind(this.newMenuItemAdded, this);
        this.addNewMenuItem = __bind(this.addNewMenuItem, this);
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

      Controller.prototype.addNewMenuItem = function(menu) {
        var data, menumodel;
        menumodel = App.request("create:new:menu:item");
        menumodel.set('menu_id', parseInt(this.layout.model.get('menu_id')));
        data = {
          menu_item_title: menu.get('post_title'),
          page_id: menu.get('original_id'),
          menu_item_parent: 0,
          order: 0
        };
        return menumodel.save(data, {
          wait: true,
          success: this.newMenuItemAdded
        });
      };

      Controller.prototype.newMenuItemAdded = function(model) {
        return this.menuCollection.add(model);
      };

      Controller.prototype._getMenuView = function(collection, templateClass) {
        return new Menu.Views.MenuView({
          collection: collection,
          prop: this.layout.model.toJSON(),
          templateClass: templateClass
        });
      };

      Controller.prototype._getMenuCollection = function() {
        if (_.isUndefined(this.menuCollection)) {
          if (this.layout.model.get('menu_id') > 0) {
            this.menuCollection = App.request("get:menu:items:by:menuid", this.layout.model.get('menu_id'));
          } else {
            this.menuCollection = App.request("get:menu:item:collection");
            this.menuCollection.once("add", (function(_this) {
              return function(model) {
                _this.layout.model.set('menu_id', model.get('menu_id'));
                return _this.layout.model.save();
              };
            })(this));
          }
        }
        return this.menuCollection;
      };

      Controller.prototype.renderElement = function() {
        var collection, model, templateClass, view, _ref;
        model = this.layout.model;
        templateClass = (_ref = [model.get('style')]) != null ? _ref : '';
        collection = new Backbone.Collection;
        view = this._getMenuView(collection, templateClass);
        return this.layout.elementRegion.show(view);
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
