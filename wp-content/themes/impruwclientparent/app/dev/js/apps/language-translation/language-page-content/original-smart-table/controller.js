var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-content/original-smart-table/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageContent.OriginalSmartTable', function(OriginalSmartTable, App, Backbone, Marionette, $, _) {
    OriginalSmartTable.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.pageId = opts.pageId;
        this.editLang = opts.editLang;
        this.pageSmartTableCollection = App.request("get:smart:table:elements", this.pageId, this.editLang);
        this.originalContentView = this._getLanguageView(this.pageSmartTableCollection);
        return this.show(this.originalContentView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(collection) {
        return new OriginalSmartTable.Views.OriginalSmartTablesView({
          collection: collection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("original:smart:table:app", function(opts) {
      return new OriginalSmartTable.Controller(opts);
    });
  });
});
