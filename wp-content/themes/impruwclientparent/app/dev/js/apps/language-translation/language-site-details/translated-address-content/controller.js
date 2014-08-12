var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-site-details/translated-address-content/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguageSiteContent.TranslatedAddress', function(TranslatedAddress, App, Backbone, Marionette, $, _) {
    TranslatedAddress.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var siteModel;
        this.editLang = opts.editLang;
        this.siteModel = siteModel = App.request("get:language:based:site", this.editLang);
        this.translatedAddressView = this._getTranslatedAddressView(siteModel);
        this.listenTo(this.translatedAddressView, "update:translated:siteprofile", this.updateTranslatedSiteprofile);
        return this.show(this.translatedAddressView, {
          loading: true
        });
      };

      Controller.prototype._getTranslatedAddressView = function(model) {
        return new TranslatedAddress.Views.TranslatedAddressItemView({
          model: model,
          language: this.editLang
        });
      };

      Controller.prototype.updateTranslatedSiteprofile = function(translatedSiteprofile) {
        var data, responseFn;
        data = {
          translatedSiteprofile: translatedSiteprofile,
          editingLanguage: this.editLang
        };
        responseFn = (function(_this) {
          return function(response) {
            return _this.translatedAddressView.triggerMethod("siteprofile:updated");
          };
        })(this);
        return $.post("" + AJAXURL + "?action=update-translated-siteprofile", data, responseFn, 'json');
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("translated:address:app", function(opts) {
      return new TranslatedAddress.Controller(opts);
    });
  });
});
