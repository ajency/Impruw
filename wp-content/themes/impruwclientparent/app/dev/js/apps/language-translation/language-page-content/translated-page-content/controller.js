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
        this.pageId = opts.pageId;
        this.editLang = opts.editLang;
        this.originalId = opts.originalId;
        this.pageModel = App.request("get:page:by:language", this.pageId, this.editLang);
        this.pageElementsCollection = App.request("get:page:elements", this.originalId);
        console.log(this.pageElementsCollection);
        this.translatedContentView = this._getLanguageView(this.pageModel, this.pageElementsCollection);
        this.listenTo(this.translatedContentView, "translated:page:title:updated", this.updateTranslatedPageTitle);
        this.listenTo(this.translatedContentView, "itemview:page:element:updated", this.updatePageElementContent);
        return this.show(this.translatedContentView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(model, collection) {
        return new TranslatedPage.Views.TranslatedPageView({
          model: model,
          collection: collection,
          language: this.editLang
        });
      };

      Controller.prototype.updateTranslatedPageTitle = function(newPageTitle, pageId) {
        var data;
        data = [];
        data['translatedPageTitle'] = newPageTitle;
        data['translatedPageID'] = pageId;
        this.pageModel.set(data);
        return $.post("" + AJAXURL + "?action=update-translated-page-title", {
          page_title: newPageTitle,
          page_id: pageId
        }, this.pageTitleUpdated, 'json');
      };

      Controller.pageTitleUpdated = function(response) {
        return Controller.translatedContentView.triggerMethod("page:title:updated");
      };

      Controller.prototype.updatePageElementContent = function(view, newElemContent) {
        var content, editLang, model;
        model = view.model;
        content = model.get('content');
        editLang = this.editLang;
        content[editLang] = newElemContent;
        model.set('content', content);
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
    return App.commands.setHandler("translated:page:content:app", function(opts) {
      return new TranslatedPage.Controller(opts);
    });
  });
});
