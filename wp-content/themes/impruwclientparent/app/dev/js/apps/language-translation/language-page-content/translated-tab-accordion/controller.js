var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-content/translated-tab-accordion/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedTabAccordion', function(TranslatedTabAccordion, App, Backbone, Marionette, $, _) {
    TranslatedTabAccordion.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.contentUpdated = __bind(this.contentUpdated, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.pageId = opts.pageId;
        this.editLang = opts.editLang;
        this.originalId = opts.originalId;
        this.pageTabsAccordionCollection = App.request("get:tab:accordion:elements", this.pageId, this.editLang);
        this.translatedContentView = this._getLanguageView(this.pageTabsAccordionCollection);
        this.listenTo(this.translatedContentView, "itemview:page:tabaccordion:updated", this.updatePageTabAccordion);
        return this.show(this.translatedContentView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(collection) {
        return new TranslatedTabAccordion.Views.TranslatedTabAccordionView({
          collection: collection,
          language: this.editLang
        });
      };

      Controller.prototype.updatePageTabAccordion = function(outerview) {
        var contents, editingLang, model;
        model = outerview.model;
        editingLang = this.editLang;
        contents = model.get('tabElements');
        model.set('json-page-id', this.pageId);
        model.set('edit-lang', this.editLang);
        return model.save(null, {
          wait: true,
          success: this.contentUpdated
        });
      };

      Controller.prototype.contentUpdated = function() {
        return this.translatedContentView.triggerMethod('translate:tab:accordion:updated');
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("translated:tab:accordion:app", function(opts) {
      return new TranslatedTabAccordion.Controller(opts);
    });
  });
});
