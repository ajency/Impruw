var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-content/show/view', 'apps/language-translation/language-page-content/original-page-content/controller', 'apps/language-translation/language-page-content/translated-page-content/controller', 'apps/language-translation/language-page-content/original-table-content/controller', 'apps/language-translation/language-page-content/translated-table-content/controller', 'apps/language-translation/language-page-content/original-smart-table/controller', 'apps/language-translation/language-page-content/translated-smart-table/controller', 'apps/language-translation/language-page-content/original-slider-content/controller', 'apps/language-translation/language-page-content/translated-slider-content/controller'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageContent', function(LanguagePageContent, App, Backbone, Marionette, $, _) {
    LanguagePageContent.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.pageId = opts.pageId;
        this.editLang = opts.editLang;
        this.originalId = opts.originalId;
        this.languagePageContentLayout = this._getPageContentLayout();
        $('.aj-imp-widget-content').show();
        this.show(this.languagePageContentLayout, {
          loading: true
        });
        return this.listenTo(this.languagePageContentLayout, 'show', (function(_this) {
          return function() {
            App.execute("original:page:content:app", {
              region: _this.languagePageContentLayout.originalPageContent,
              editLang: _this.editLang,
              pageId: _this.originalId
            });
            App.execute("translated:page:content:app", {
              region: _this.languagePageContentLayout.translatedPageContent,
              editLang: _this.editLang,
              pageId: _this.pageId,
              originalId: _this.originalId
            });
            App.execute("original:table:content:app", {
              region: _this.languagePageContentLayout.originalTableContent,
              editLang: _this.editLang,
              pageId: _this.originalId
            });
            App.execute("translated:table:content:app", {
              region: _this.languagePageContentLayout.translatedTableContent,
              editLang: _this.editLang,
              pageId: _this.pageId,
              originalId: _this.originalId
            });
            App.execute("original:smart:table:app", {
              region: _this.languagePageContentLayout.originalSmartTable,
              editLang: _this.editLang,
              pageId: _this.originalId
            });
            App.execute("translated:smart:table:app", {
              region: _this.languagePageContentLayout.translatedSmartTable,
              editLang: _this.editLang,
              pageId: _this.pageId,
              originalId: _this.originalId
            });
            App.execute("original:slider:content:app", {
              region: _this.languagePageContentLayout.originalSliderContent,
              editLang: _this.editLang,
              pageId: _this.originalId
            });
            return App.execute("translated:slider:content:app", {
              region: _this.languagePageContentLayout.translatedSliderContent,
              editLang: _this.editLang,
              pageId: _this.originalId
            });
          };
        })(this));
      };

      Controller.prototype._getPageContentLayout = function() {
        return new LanguagePageContent.Views.LanguagePageContentLayout;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:language:page:content:app", function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new LanguagePageContent.Controller(opts);
    });
  });
});
