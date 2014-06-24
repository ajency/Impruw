var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/show/language-translation-view'], function(App, AppController) {
  return App.module('LanguageApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    return Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this._loadPageNavBar = __bind(this._loadPageNavBar, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        this.languageLayout = this._getLanguageLayout();
        this.show(this.languageLayout, {
          loading: true
        });
        this.listenTo(this.languageLayout, 'show', (function(_this) {
          return function() {
            return App.execute('show:language:selection:app', {
              region: _this.languageLayout.languageSelectionRegion
            });
          };
        })(this));
        return this.listenTo(this.languageLayout.languageSelectionRegion, "load:page:nav:bar", this._loadPageNavBar);
      };

      Controller.prototype._getLanguageLayout = function() {
        return new Show.Views.LanguageLayout;
      };

      Controller.prototype._loadPageNavBar = function(selectedEditingLanguage) {
        App.execute("show:language:page:nav:app", {
          region: this.languageLayout.languagePageNav,
          language: selectedEditingLanguage
        });
      };

      return Controller;

    })(AppController);
  });
});