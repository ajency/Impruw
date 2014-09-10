var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-header/translated-header/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguageHeaderContent.TranslatedHeader', function(TranslatedHeader, App, Backbone, Marionette, $, _) {
    TranslatedHeader.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var siteModel;
        this.editLang = opts.editLang;
        this.siteModel = siteModel = App.request("get:language:based:site", this.editLang);
        this.headerElementsCollection = App.request("get:header:elements");
        this.translatedHeaderView = this._getTranslatedHeaderView(this.headerElementsCollection);
        this.listenTo(this.translatedHeaderView, "itemview:header:element:updated", this.updateHeaderElementContent);
        return this.show(this.translatedHeaderView, {
          loading: true
        });
      };

      Controller.prototype._getTranslatedHeaderView = function(collection) {
        return new TranslatedHeader.Views.TranslatedHeaderView({
          model: this.siteModel,
          collection: collection,
          language: this.editLang
        });
      };

      Controller.prototype.updateHeaderElementContent = function(view, newElemContent) {
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
    return App.commands.setHandler("translated:header:app", function(opts) {
      return new TranslatedHeader.Controller(opts);
    });
  });
});
