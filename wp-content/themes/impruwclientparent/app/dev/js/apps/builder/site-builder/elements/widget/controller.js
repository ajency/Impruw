var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/widget/views'], function(App, RegionController) {
  return App.module('SiteBuilderApp.Element.Widget', function(Widget, App) {
    return Widget.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Widget',
          htmlData: '<div class="fb-widget"><div class="fb-like-box" data-href="https://www.facebook.com/FacebookDevelopers" data-width="500" data-colorscheme="light" data-show-faces="true" data-header="true" data-stream="false" data-show-border="true"></div></div>'
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getWidgetView = function() {
        return new Widget.Views.WidgetView({
          model: this.layout.model
        });
      };

      Controller.prototype.renderElement = function() {
        this.removeSpinner();
        this.view = this._getWidgetView();
        return this.layout.elementRegion.show(this.view);
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
