var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/logo/views', 'apps/builder/site-builder/elements/logo/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.Logo', function(Logo, App, Backbone, Marionette, $, _) {
    return Logo.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Logo',
          image_id: 0,
          size: 'thumbnail',
          align: 'left',
          heightRatio: 'auto',
          topRatio: 0
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype._getImageView = function(imageModel) {
        return new Logo.Views.LogoView({
          model: imageModel,
          imageHeightRatio: this.layout.model.get('heightRatio'),
          positionTopRatio: this.layout.model.get('topRatio'),
          templateHelpers: this._getTemplateHelpers()
        });
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Image.Controller);
  });
});
