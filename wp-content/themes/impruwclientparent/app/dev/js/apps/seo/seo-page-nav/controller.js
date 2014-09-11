var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/seo/seo-page-nav/view'], function(App, AppController) {
  return App.module('SeoApp.SeoPageNav', function(SeoPageNav, App, Backbone, Marionette, $, _) {
    SeoPageNav.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var collection, language;
        language = opts.language;
        this.language = language;
        this.collection = collection = App.request("get:language:pages", language);
        this.seoPageNavView = this._getPageNavView(this.collection);
        this.listenTo(this.seoPageNavView, "seo:room:content", this.loadSeoRoomContent);
        this.listenTo(this.seoPageNavView, "itemview:page:content", this.loadSeoPageContent);
        return this.show(this.seoPageNavView, {
          loading: true
        });
      };

      Controller.prototype._getPageNavView = function(collection) {
        return new SeoPageNav.Views.SeoPageNavView({
          collection: collection
        });
      };

      Controller.prototype.loadSeoRoomContent = function() {
        return Marionette.triggerMethod.call(this.region, "load:seo:room:content", this.language);
      };

      Controller.prototype.loadSeoPageContent = function(collection, pageId) {
        var data, responseFn;
        data = {
          pageId: pageId,
          language: this.language
        };
        responseFn = (function(_this) {
          return function(response) {
            var originalId;
            originalId = response.data.original_id;
            pageId = response.data.translated_id;
            return Marionette.triggerMethod.call(_this.region, "load:seo:page:content", _this.language, pageId);
          };
        })(this);
        return $.post("" + AJAXURL + "?action=get-language-page", data, responseFn, 'json');
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:seo:page:nav:app", function(opts) {
      return new SeoPageNav.Controller(opts);
    });
  });
});
