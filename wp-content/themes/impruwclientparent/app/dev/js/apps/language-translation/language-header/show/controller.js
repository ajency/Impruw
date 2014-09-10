var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-header/show/view', 'apps/language-translation/language-header/original-header/controller', 'apps/language-translation/language-header/translated-header/controller'], function(App, AppController) {
  return App.module('LanguageApp.LanguageHeaderContent', function(LanguageHeaderContent, App, Backbone, Marionette, $, _) {
    LanguageHeaderContent.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.editLang = opts.editLang;
        this.languageHeaderContentLayout = this._getHeaderContentLayout();
        $('.aj-imp-widget-content').show();
        this.show(this.languageHeaderContentLayout, {
          loading: true
        });
        return this.listenTo(this.languageHeaderContentLayout, 'show', (function(_this) {
          return function() {
            App.execute("original:header:app", {
              region: _this.languageHeaderContentLayout.originalHeaderContent,
              editLang: _this.editLang
            });
            return App.execute("translated:header:app", {
              region: _this.languageHeaderContentLayout.translatedHeaderContent,
              editLang: _this.editLang
            });
          };
        })(this));
      };

      Controller.prototype._getHeaderContentLayout = function() {
        return new LanguageHeaderContent.Views.LanguageHeaderContentLayout;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:header:content:app", function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new LanguageHeaderContent.Controller(opts);
    });
  });
});
