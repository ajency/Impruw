var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-content/original-table-content/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageContent.OriginalTable', function(OriginalTable, App, Backbone, Marionette, $, _) {
    OriginalTable.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.pageId = opts.pageId;
        this.editLang = opts.editLang;
        this.pageTableCollection = App.request("get:page:table:elements", this.pageId, this.editLang);
        this.originalContentView = this._getLanguageView(this.pageTableCollection);
        return this.show(this.originalContentView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(collection) {
        return new OriginalTable.Views.OriginalTableView({
          collection: collection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("original:table:content:app", function(opts) {
      return new OriginalTable.Controller(opts);
    });
  });
});
