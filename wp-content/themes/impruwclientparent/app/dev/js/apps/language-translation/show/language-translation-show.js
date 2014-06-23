var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/show/language-translation-view'], function(App, AppController) {
  return App.module('LanguageApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    return Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        this.languageLayout = this._getLanguageLayout();
        this.listenTo(this.languageLayout, 'show', function() {
          App.execute('show:language:selection:app', {
            region: this.languageLayout.languageSelectionRegion
          });
          return App.execute('show:language:translation:app', {
            region: this.languageLayout.languageTranslateRegion
          });
        });
        return this.show(this.languageLayout, {
          loading: true
        });
      };

      Controller.prototype._getLanguageLayout = function() {
        return new Show.Views.LanguageLayout;
      };

      return Controller;

    })(AppController);
  });
});
