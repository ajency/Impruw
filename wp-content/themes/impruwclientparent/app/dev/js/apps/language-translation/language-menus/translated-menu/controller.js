var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-menus/translated-menu/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguageMenuContent.TranslatedMenu', function(TranslatedMenu, App, Backbone, Marionette, $, _) {
    TranslatedMenu.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var siteModel;
        this.editLang = opts.editLang;
        this.siteModel = siteModel = App.request("get:language:based:site", this.editLang);
        this.menuElementsCollection = App.request("get:site:menu:elements", this.editLang);
        this.translatedMenuView = this._getTranslatedMenuView(this.menuElementsCollection);
        return this.show(this.translatedMenuView, {
          loading: true
        });
      };

      Controller.prototype._getTranslatedMenuView = function(collection) {
        return new TranslatedMenu.Views.TranslatedMenuView({
          model: this.siteModel,
          collection: collection,
          language: this.editLang
        });
      };

      Controller.prototype.updateMenuElementContent = function(view, newElemContent) {
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

      Controller.prototype.contentUpdated = function() {
        return console.log("Successfully updated content");
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("translated:menu:app", function(opts) {
      return new TranslatedMenu.Controller(opts);
    });
  });
});
