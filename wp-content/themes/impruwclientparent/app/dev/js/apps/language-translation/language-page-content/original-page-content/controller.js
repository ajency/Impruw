var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-content/original-page-content/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageContent.OriginalPage', function(OriginalPage, App, Backbone, Marionette, $, _) {
    OriginalPage.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.pageId = opts.pageId;
        this.editLang = opts.editLang;
        this.pageModel = App.request("get:default:page", this.pageId);
        this.pageElementsCollection = App.request("get:page:elements", this.pageId, this.editLang);
        this.originalContentView = this._getLanguageView(this.pageModel, this.pageElementsCollection);
        return this.show(this.originalContentView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(model, collection) {
        return new OriginalPage.Views.OriginalPageView({
          model: model,
          collection: collection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("original:page:content:app", function(opts) {
      return new OriginalPage.Controller(opts);
    });
  });
});
