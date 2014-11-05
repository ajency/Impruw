var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-content/original-slider-content/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageContent.OriginalSlider', function(OriginalSlider, App, Backbone, Marionette, $, _) {
    OriginalSlider.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.pageId = opts.pageId;
        this.editLang = opts.editLang;
        this.pageSliderCollection = App.request("get:page:slider:elements", this.pageId, this.editLang);
        this.originalContentView = this._getLanguageView();
        return this.show(this.originalContentView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function() {
        return new OriginalSlider.Views.OriginalSliderView({
          collection: this.pageSliderCollection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("original:slider:content:app", function(opts) {
      return new OriginalSlider.Controller(opts);
    });
  });
});
