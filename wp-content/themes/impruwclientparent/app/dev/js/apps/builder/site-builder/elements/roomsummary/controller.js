var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/roomsummary/views', 'apps/builder/site-builder/elements/roomsummary/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.RoomSummary', function(RoomSummary, App, Backbone, Marionette, $, _) {
    return RoomSummary.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'RoomSummary'
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:style", this.renderElement);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getRoomSummaryView = function(model, template) {
        return new RoomSummary.Views.RoomSummaryView({
          model: model,
          template: template
        });
      };

      Controller.prototype.renderElement = function() {
        var template, view;
        this.removeSpinner();
        template = this._getElementTemplate(this.layout.model);
        view = this._getRoomSummaryView(this.layout.model, template);
        return this.layout.elementRegion.show(view);
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
