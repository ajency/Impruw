var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-content/translated-page-content/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedPage', function(TranslatedPage, App, Backbone, Marionette, $, _) {
    TranslatedPage.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var editLang, pageModel;
        editLang = opts.editLang;
        this.editingLang = editLang;
        this.pageModel = pageModel = App.request("get:room:entities");
        console.log(this.pageModel);
        this.translatedContentView = this._getLanguageView(this.pageModel);
        return this.show(this.translatedContentView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(model) {
        return new TranslatedPage.Views.TranslatedPageItemView({
          model: model
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("translated:page:content:app", function(opts) {
      return new TranslatedPage.Controller(opts);
    });
  });
});
