var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-footer/translated-footer/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguageFooterContent.TranslatedFooter', function(TranslatedFooter, App, Backbone, Marionette, $, _) {
    TranslatedFooter.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var siteModel;
        this.editLang = opts.editLang;
        this.siteModel = siteModel = App.request("get:language:based:site", this.editLang);
        this.footerElementsCollection = App.request("get:footer:elements");
        this.translatedFooterView = this._getTranslatedFooterView(this.footerElementsCollection);
        this.listenTo(this.translatedFooterView, "itemview:footer:element:updated", this.updateFooterElementContent);
        return this.show(this.translatedFooterView, {
          loading: true
        });
      };

      Controller.prototype._getTranslatedFooterView = function(collection) {
        return new TranslatedFooter.Views.TranslatedFooterView({
          model: this.siteModel,
          collection: collection,
          language: this.editLang
        });
      };

      Controller.prototype.updateFooterElementContent = function(view, newElemContent) {
        var content_text, editLang, model, translatedContent;
        model = view.model;
        if (model.get('element') === 'Link') {
          content_text = 'text';
        } else {
          content_text = 'content';
        }
        translatedContent = model.get(content_text);
        editLang = this.editLang;
        translatedContent[editLang] = newElemContent;
        model.set(content_text, translatedContent);
        return model.save(null, {
          wait: true,
          success: this.contentUpdated
        });
      };

      Controller.contentUpdated = function() {
        return console.log("Successfully updated content");
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("translated:footer:app", function(opts) {
      return new TranslatedFooter.Controller(opts);
    });
  });
});
