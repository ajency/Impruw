var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-menus/show/view', 'apps/language-translation/language-menus/original-menu/controller', 'apps/language-translation/language-menus/translated-menu/controller'], function(App, AppController) {
  return App.module('LanguageApp.LanguageMenuContent', function(LanguageMenuContent, App, Backbone, Marionette, $, _) {
    LanguageMenuContent.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.editLang = opts.editLang;
        this.languageMenuContentLayout = this._getMenuContentLayout();
        $('.aj-imp-widget-content').show();
        this.show(this.languageMenuContentLayout, {
          loading: true
        });
        return this.listenTo(this.languageMenuContentLayout, 'show', (function(_this) {
          return function() {
            App.execute("original:menu:app", {
              region: _this.languageMenuContentLayout.originalMenuContent,
              editLang: _this.editLang
            });
            return App.execute("translated:menu:app", {
              region: _this.languageMenuContentLayout.translatedMenuContent,
              editLang: _this.editLang
            });
          };
        })(this));
      };

      Controller.prototype._getMenuContentLayout = function() {
        return new LanguageMenuContent.Views.LanguageMenuContentLayout;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:menu:content:app", function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new LanguageMenuContent.Controller(opts);
    });
  });
});
