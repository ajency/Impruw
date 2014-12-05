var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-content/original-tab-accordion/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageContent.OriginalTabAccordion', function(OriginalTabAccordion, App, Backbone, Marionette, $, _) {
    OriginalTabAccordion.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.pageId = opts.pageId;
        this.editLang = opts.editLang;
        this.pageTabsAccordionCollection = App.request("get:tab:accordion:elements", this.pageId, this.editLang);
        console.log(this.pageTabsAccordionCollection);
        this.originalContentView = this._getLanguageView(this.pageTabsAccordionCollection);
        return this.show(this.originalContentView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(collection) {
        return new OriginalTabAccordion.Views.OriginalTabAccordionView({
          collection: collection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("original:tab:accordion:app", function(opts) {
      return new OriginalTabAccordion.Controller(opts);
    });
  });
});
