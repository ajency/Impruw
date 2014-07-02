var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-translate/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguageTranslate', function(LanguageTranslate, App, Backbone, Marionette, $, _) {
    LanguageTranslate.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.languageTranslateView = this._getLanguageView();
        return this.show(this.languageTranslateView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(languageSetting) {
        return new LanguageTranslate.Views.LanguageTranslateView;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:language:translation:app", function(opts) {
      return new LanguageTranslate.Controller(opts);
    });
  });
});
