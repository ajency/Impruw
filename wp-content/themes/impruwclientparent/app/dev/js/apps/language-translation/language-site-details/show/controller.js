var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-site-details/show/view', 'apps/language-translation/language-site-details/original-address-content/controller'], function(App, AppController) {
  return App.module('LanguageApp.LanguageSiteContent', function(LanguageSiteContent, App, Backbone, Marionette, $, _) {
    LanguageSiteContent.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.editLang = opts.editLang;
        this.languageSiteContentLayout = this._getSiteContentLayout();
        $('.aj-imp-widget-content').show();
        this.show(this.languageSiteContentLayout, {
          loading: true
        });
        return this.listenTo(this.languageSiteContentLayout, 'show', (function(_this) {
          return function() {
            App.execute("original:address:app", {
              region: _this.languageSiteContentLayout.originalSiteContent,
              editLang: _this.editLang
            });
            return App.execute("translated:address:app", {
              region: _this.languageSiteContentLayout.translatedSiteContent,
              editLang: _this.editLang
            });
          };
        })(this));
      };

      Controller.prototype._getSiteContentLayout = function() {
        return new LanguageSiteContent.Views.LanguageSiteContentLayout;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:site:content:app", function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new LanguageSiteContent.Controller(opts);
    });
  });
});
