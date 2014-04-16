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
          style: ''
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

      Controller.prototype._getMenuCollection = function() {
        var menuModel;
        if (!this.menuCollection) {
          if (this.layout.model.get('menu_id') > 0) {
            menuModel = App.request("get:menu:by:id", this.layout.model.get('menu_id'));
            this.menuCollection = menuModel.get('menu_items');
          } else {
            this.menuCollection = App.request("get:menu:collection");
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
        var itemCollection, model;
        this.itemCollection = itemCollection = this._getMenuCollection();
        model = this.layout.model;
        return App.execute("when:fetched", itemCollection, (function(_this) {
          return function() {
            var menu_id, templateClass, view, _ref;
            templateClass = (_ref = [model.get('style')]) != null ? _ref : '';
            view = _this._getMenuView(itemCollection, templateClass);
            _this.menu_id = menu_id = _this.layout.model.get('menu_id');
            _this.listenTo(itemCollection, "menu:order:updated", view.render);
            _this.listenTo(view, "open:menu:manager", function() {
              console.log(_this.itemCollection);
              return App.execute("menu-manager", _this.itemCollection, _this.menu_id);
            });
            return _this.layout.elementRegion.show(view);
          };
        })(this));
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
