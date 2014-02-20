// Generated by CoffeeScript 1.6.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'apps/builder/site-builder/elements/menu/views', 'apps/builder/site-builder/elements/menu/settings/controller'], function(App) {
    return App.module('SiteBuilderApp.Element.Menu', function(Menu, App, Backbone, Marionette, $, _) {
      var _ref;
      return Menu.Controller = (function(_super) {
        __extends(Controller, _super);

        function Controller() {
          this.renderElement = __bind(this.renderElement, this);
          _ref = Controller.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        Controller.prototype.initialize = function(options) {
          _.defaults(options.modelData, {
            element: 'Menu',
            justified: false,
            menu_id: 0,
            style: 'header'
          });
          return Controller.__super__.initialize.call(this, options);
        };

        Controller.prototype.bindEvents = function() {
          var _this = this;
          this.listenTo(this.layout.model, "change:menu_id", this.renderElement);
          this.listenTo(this.layout.model, "change:style", this.renderElement);
          this.listenTo(this.layout.model, "change:justified", function(model) {
            return _this.layout.elementRegion.currentView.triggerMethod("set:justified", model.get('justified'));
          });
          return Controller.__super__.bindEvents.call(this);
        };

        Controller.prototype._getMenuView = function(model, collection, templates) {
          return new Menu.Views.MenuView({
            model: model,
            collection: collection,
            templates: templates,
            prop: this.layout.model.toJSON()
          });
        };

        Controller.prototype.renderElement = function() {
          var elementBox, itemCollection, menu, model, templates, view;
          model = this.layout.model;
          menu = App.request("get:collection:model", "menucollection", model.get('menu_id'));
          itemCollection = menu.get('menu_items');
          elementBox = App.request("get:collection:model", "elementbox", 'Menu');
          templates = elementBox.get('templates')[model.get('style')];
          view = this._getMenuView(menu, itemCollection, templates);
          this.listenTo(itemCollection, "menu:order:updated", view.render);
          this.listenTo(view, "open:menu:manager", function() {
            return App.navigate("menu-manager", {
              trigger: true
            });
          });
          return this.layout.elementRegion.show(view);
        };

        return Controller;

      })(App.SiteBuilderApp.Element.Controller);
    });
  });

}).call(this);
