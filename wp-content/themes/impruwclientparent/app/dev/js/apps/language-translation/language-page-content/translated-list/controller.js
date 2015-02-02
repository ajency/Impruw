var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-content/translated-list/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedListTable', function(TranslatedListTable, App, Backbone, Marionette, $, _) {
    TranslatedListTable.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.contentUpdated = __bind(this.contentUpdated, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.pageId = opts.pageId;
        this.editLang = opts.editLang;
        this.originalId = opts.originalId;
        this.pageListTableCollection = App.request("get:list:table:elements", this.originalId, this.editLang);
        this.translatedContentView = this._getLanguageView(this.pageListTableCollection);
        this.listenTo(this.translatedContentView, "itemview:page:listtable:updated", this.updatePageListTable);
        return this.show(this.translatedContentView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(collection) {
        return new TranslatedListTable.Views.TranslatedListTablesView({
          collection: collection,
          language: this.editLang
        });
      };

      Controller.prototype.updatePageListTable = function(outerview, data) {
        var contents, editingLang, listtableData, model;
        model = outerview.model;
        editingLang = this.editLang;
        listtableData = data;
        contents = model.get('contents');
        if (!o.hasOwnProperty(editingLang)) {
          contents[editingLang] = new Array();
        }
        _.each(listtableData, function(value, key) {
          return _.each(value, function(value, key) {
            return contents[editingLang][key] = value;
          });
        });
        _.each(contents, function(value, key) {
          return _.each(value, function(val1, key1) {
            return _.each(val1, function(val2, key2) {
              return contents[key][key1][key2] = _.stripslashes(val2);
            });
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
        return this.translatedContentView.triggerMethod('translate:listtable:updated');
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("translated:list:table:app", function(opts) {
      return new TranslatedListTable.Controller(opts);
    });
  });
});
