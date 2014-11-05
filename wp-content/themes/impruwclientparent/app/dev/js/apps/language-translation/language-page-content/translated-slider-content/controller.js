var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-content/translated-slider-content/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedSlider', function(TranslatedSlider, App, Backbone, Marionette, $, _) {
    TranslatedSlider.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.pageId = opts.pageId;
        this.editLang = opts.editLang;
        this.pageSliderCollection = App.request("get:page:slider:elements", this.pageId, this.editLang);
        this.translatedContentView = this._getLanguageView();
        this.listenTo(this.translatedContentView, "itemview:itemview:page:slide:updated", this.updatePageSlideContent);
        return this.show(this.translatedContentView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function() {
        return new TranslatedSlider.Views.TranslatedSliderView({
          collection: this.pageSliderCollection,
          language: this.editLang
        });
      };

      Controller.prototype.updatePageSlideContent = function(outerview, innerview, newCaptionTitle, newCaptionDesc, slideParentId, sliderId) {
        var data, model, responseFn;
        model = innerview.model;
        data = {
          newCaptionTitle: newCaptionTitle,
          newCaptionDesc: newCaptionDesc,
          language: this.editLang,
          slideParentId: slideParentId,
          sliderId: sliderId
        };
        responseFn = (function(_this) {
          return function(response) {
            return console.log("Success");
          };
        })(this);
        return $.post("" + AJAXURL + "?action=update-translated-page-slide", data, responseFn, 'json');
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("translated:slider:content:app", function(opts) {
      return new TranslatedSlider.Controller(opts);
    });
  });
});
