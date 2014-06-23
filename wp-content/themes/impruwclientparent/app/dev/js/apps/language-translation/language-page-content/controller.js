var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-content/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageContent', function(LanguagePageContent, App, Backbone, Marionette, $, _) {
    LanguagePageContent.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.languagePageContentView = this._getPageContentView();
        return this.show(this.languagePageContentView, {
          loading: true
        });
      };

      Controller.prototype._getPageContentView = function() {
        return new LanguagePageContent.Views.LanguagePageContentView;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:language:page:content:app", function(opts) {
      return new LanguagePageContent.Controller(opts);
    });
  });
});
