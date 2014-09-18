var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/seo/seo-page-content/view'], function(App, AppController) {
  return App.module('SeoApp.SeoPageContent', function(SeoPageContent, App, Backbone, Marionette, $, _) {
    SeoPageContent.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.pageSeoUpdated = __bind(this.pageSeoUpdated, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.pageId = opts.pageId;
        this.language = opts.language;
        $('.aj-imp-widget-content').show();
        this.seomodel = App.request("get:seo:model", this.pageId);
        this.seoPageContentView = this._getPageContentView(this.seomodel);
        this.listenTo(this.seoPageContentView, "page:seo:save", this.pageSeoSave);
        return this.show(this.seoPageContentView, {
          loading: true
        });
      };

      Controller.prototype._getPageContentView = function(model) {
        return new SeoPageContent.Views.SeoPageContentView({
          model: model
        });
      };

      Controller.prototype.pageSeoSave = function(newSeoTitle, newSeoDesc, newSeoKeywords) {
        var data;
        data = [];
        data['seo_title'] = newSeoTitle;
        data['meta_description'] = newSeoDesc;
        data['meta_keywords'] = newSeoKeywords;
        this.seomodel.set(data);
        return this.seomodel.save(null, {
          wait: true,
          onlyChanged: true,
          success: this.pageSeoUpdated
        });
      };

      Controller.prototype.pageSeoUpdated = function(model, response) {
        return this.seoPageContentView.triggerMethod("page:seo:updated");
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
