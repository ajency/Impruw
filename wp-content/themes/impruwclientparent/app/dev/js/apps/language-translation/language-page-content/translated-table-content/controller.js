var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-content/translated-table-content/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedTable', function(TranslatedTable, App, Backbone, Marionette, $, _) {
    TranslatedTable.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.pageId = opts.pageId;
        this.editLang = opts.editLang;
        this.originalId = opts.originalId;
        this.pageTableCollection = App.request("get:page:table:elements", this.originalId, this.editLang);
        this.translatedContentView = this._getLanguageView(this.pageTableCollection);
        this.listenTo(this.translatedContentView, "itemview:page:table:updated", this.updatePageTableContent);
        return this.show(this.translatedContentView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(collection) {
        return new TranslatedTable.Views.TranslatedTableView({
          collection: collection,
          language: this.editLang
        });
      };

      Controller.prototype.updatePageTableContent = function(view, newElemContent) {
        var data, editLang, model, translatedContent;
        model = view.model;
        translatedContent = model.get('content');
        if (_.isObject(translatedContent)) {
          data = translatedContent;
        } else {
          data = {};
          data['en'] = _.stripslashes(translatedContent);
          data['nb'] = _.stripslashes(translatedContent);
        }
        editLang = this.editLang;
        data[editLang] = newElemContent;
        model.set('content', data);
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
    return App.commands.setHandler("translated:table:content:app", function(opts) {
      return new TranslatedTable.Controller(opts);
    });
  });
});
