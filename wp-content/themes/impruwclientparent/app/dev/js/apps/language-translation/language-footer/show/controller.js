var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-footer/show/view', 'apps/language-translation/language-footer/original-footer/controller', 'apps/language-translation/language-footer/translated-footer/controller'], function(App, AppController) {
  return App.module('LanguageApp.LanguageFooterContent', function(LanguageFooterContent, App, Backbone, Marionette, $, _) {
    LanguageFooterContent.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.editLang = opts.editLang;
        this.languageFooterContentLayout = this._getFooterContentLayout();
        $('.aj-imp-widget-content').show();
        this.show(this.languageFooterContentLayout, {
          loading: true
        });
        return this.listenTo(this.languageFooterContentLayout, 'show', (function(_this) {
          return function() {
            App.execute("original:footer:app", {
              region: _this.languageFooterContentLayout.originalFooterContent,
              editLang: _this.editLang
            });
            return App.execute("translated:footer:app", {
              region: _this.languageFooterContentLayout.translatedFooterContent,
              editLang: _this.editLang
            });
          };
        })(this));
      };

      Controller.prototype._getFooterContentLayout = function() {
        return new LanguageFooterContent.Views.LanguageFooterContentLayout;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:footer:content:app", function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new LanguageFooterContent.Controller(opts);
    });
  });
});
