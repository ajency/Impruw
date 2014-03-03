var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/map/views', 'apps/builder/site-builder/elements/map/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.Map', function(Map, App, Backbone, Marionette, $, _) {
    return Map.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Map',
          lat: 59.913041,
          lng: 10.756874,
          zoom: 14,
          address: 'Oslo, Norway'
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:style", this.renderElement);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getMapView = function(template, className) {
        var data;
        data = {};
        data.className = className;
        data.model = this.layout.model;
        if (!_(template).isBlank()) {
          data.template = template;
        }
        return new Map.Views.MapView(data);
      };

      Controller.prototype.renderElement = function() {
        var className, template, view;
        template = !_(this.layout.model.get('style')).isBlank() ? this._getElementTemplate(this.layout.model) : '';
        className = _.slugify(this.layout.model.get('style'));
        view = this._getMapView(template, className);
        return this.layout.elementRegion.show(view);
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
