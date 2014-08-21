var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/seo/seo-page-content/view'], function(App, AppController) {
  return App.module('SeoApp.SeoPageContent', function(SeoPageContent, App, Backbone, Marionette, $, _) {
    SeoPageContent.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.pageId = opts.pageId;
        this.language = opts.language;
        this.seomodel = App.request("get:site:model");
        this.seoPageContentView = this._getPageContentView(this.seomodel);
        return this.show(this.seoPageContentView, {
          loading: true
        });
      };

      Controller.prototype._getPageContentView = function(model) {
        return new SeoPageContent.Views.SeoPageContentView({
          model: model
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:seo:page:content:app", function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new SeoPageContent.Controller(opts);
    });
  });
});
