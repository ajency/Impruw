var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/seo/show/view'], function(App, AppController) {
  return App.module('SeoApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this._loadSeoPageContent = __bind(this._loadSeoPageContent, this);
        this._loadNavBar = __bind(this._loadNavBar, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        this.seoLayoutView = this.getMainView();
        this.show(this.seoLayoutView, {
          loading: true
        });
        this.listenTo(this.seoLayoutView, 'show', (function(_this) {
          return function() {
            return App.execute('seo:language:selection:app', {
              region: _this.seoLayoutView.seoLanguageSelection
            });
          };
        })(this));
        this.listenTo(this.seoLayoutView.seoLanguageSelection, "load:seo:page:nav:bar", this._loadNavBar);
        return this.listenTo(this.seoLayoutView.seoPageNav, "load:seo:page:content", this._loadSeoPageContent);
      };

      Controller.prototype.getMainView = function() {
        return new Show.View.SeoView;
      };

      Controller.prototype._loadNavBar = function(selectedLanguage) {
        return App.execute("show:seo:page:nav:app", {
          region: this.seoLayoutView.seoPageNav,
          language: selectedLanguage
        });
      };

      Controller.prototype._loadSeoPageContent = function(language, pageId) {
        return App.execute("show:seo:page:content:app", {
          region: this.seoLayoutView.seoPageContent,
          language: language,
          pageId: pageId
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:seo", function(opts) {
      return new Show.Controller(opts);
    });
  });
});
