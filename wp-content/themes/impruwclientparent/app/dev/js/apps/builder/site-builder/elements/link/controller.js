var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/link/views', 'apps/builder/site-builder/elements/link/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.Link', function(Link, App, Backbone, Marionette, $, _) {
    return Link.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Link',
          link: '#',
          text: {
            'en': 'Add link',
            'nb': _.polyglot.t('Add link')
          },
          target: 'self'
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:style change:link change:text change:target", this.renderElement);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getLinkView = function(model) {
        return new Link.Views.LinkView({
          model: model
        });
      };

      Controller.prototype.renderElement = function() {
        var view;
        this.removeSpinner();
        view = this._getLinkView(this.layout.model);
        return this.layout.elementRegion.show(view);
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
