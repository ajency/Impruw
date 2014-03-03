var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/social/views', 'apps/builder/site-builder/elements/social/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.Social', function(Social, App, Backbone, Marionette, $, _) {
    return Social.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Social',
          style: 'Default Style'
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:style", this.renderElement);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getAddressView = function(collection, style) {
        return new Social.Views.SocialView({
          collection: collection,
          style: style
        });
      };

      Controller.prototype.renderElement = function() {
        var collection, style, view;
        this.removeSpinner();
        style = this.layout.model.get('style');
        collection = App.request("get:site:social");
        view = this._getAddressView(collection, style);
        return this.layout.elementRegion.show(view);
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
