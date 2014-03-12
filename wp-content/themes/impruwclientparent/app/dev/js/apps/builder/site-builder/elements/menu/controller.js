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
          menu_id: 2,
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

      Controller.prototype.renderElement = function() {
        var menu, model;
        model = this.layout.model;
        menu = App.request("get:menu:by:id", model.get('menu_id'));
        return App.execute("when:fetched", menu, (function(_this) {
          return function() {
            var elementBox, itemCollection, templateClass, templates, view, _ref;
            itemCollection = menu.get('menu_items');
            elementBox = App.request("get:collection:model", "elementbox", 'Menu');
            templates = elementBox.get('templates');
            templateClass = (_ref = [model.get('style')]) != null ? _ref : '';
            view = _this._getMenuView(itemCollection, templateClass);
            _this.listenTo(itemCollection, "menu:order:updated", view.render);
            _this.listenTo(view, "open:menu:manager", function() {
              return App.navigate("menu-manager", {
                trigger: true
              });
            });
            return _this.layout.elementRegion.show(view);
          };
        })(this));
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
