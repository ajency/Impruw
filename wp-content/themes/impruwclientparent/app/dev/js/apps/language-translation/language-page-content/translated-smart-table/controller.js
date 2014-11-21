var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-content/translated-smart-table/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedSmartTable', function(TranslatedSmartTable, App, Backbone, Marionette, $, _) {
    TranslatedSmartTable.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.pageId = opts.pageId;
        this.editLang = opts.editLang;
        this.originalId = opts.originalId;
        this.pageSmartTableCollection = App.request("get:smart:table:elements", this.originalId, this.editLang);
        this.translatedContentView = this._getLanguageView(this.pageSmartTableCollection);
        this.listenTo(this.translatedContentView, "itemview:page:smarttable:updated", this.updatePageSmartTable);
        return this.show(this.translatedContentView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(collection) {
        return new TranslatedSmartTable.Views.TranslatedSmartTablesView({
          collection: collection,
          language: this.editLang
        });
      };

      Controller.prototype.updatePageSmartTable = function(outerview, data) {
        var contents, editingLang, model, smarttableData;
        model = outerview.model;
        editingLang = this.editLang;
        smarttableData = data;
        contents = model.get('contents');
        if (!o.hasOwnProperty(editingLang)) {
          contents[editingLang] = new Array();
        }
        _.each(smarttableData, function(value, key) {
          return _.each(value, function(value, key) {
            return contents[editingLang][key] = value;
          });
        });
        model.set('contents', contents);
        model.set('source', 'dashboard');
        model.set('json-page-id', this.pageId);
        return model.save(null, {
          wait: true,
          success: this.contentUpdated
        });
      };

      Controller.prototype.contentUpdated = function() {
        return console.log("Successfully updated smart table content");
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("translated:smart:table:app", function(opts) {
      return new TranslatedSmartTable.Controller(opts);
    });
  });
});
