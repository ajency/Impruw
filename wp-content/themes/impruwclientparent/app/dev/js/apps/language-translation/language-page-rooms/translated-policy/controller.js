var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-rooms/translated-policy/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageRooms.TranslatedPolicy', function(TranslatedPolicy, App, Backbone, Marionette, $, _) {
    TranslatedPolicy.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var editLang, siteModel;
        editLang = opts.editLang;
        this.editLang = editLang;
        this.siteModel = siteModel = App.request("get:language:based:site", this.editLang);
        console.log(siteModel);
        this.translatedPolicyView = this._getTranslatedPolicyView(siteModel);
        this.listenTo(this.translatedPolicyView, "update:translated:policy", this.updateTranslatedPolicy);
        return this.show(this.translatedPolicyView, {
          loading: true
        });
      };

      Controller.prototype._getTranslatedPolicyView = function(model) {
        return new TranslatedPolicy.Views.TranslatedPolicyView({
          model: model
        });
      };

      Controller.prototype.updateTranslatedPolicy = function(translatedSiteprofile) {
        var data, responseFn;
        data = {
          translatedSiteprofile: translatedSiteprofile,
          editingLanguage: this.editLang
        };
        responseFn = (function(_this) {
          return function(response) {
            return _this.translatedPolicyView.triggerMethod("policy:updated");
          };
        })(this);
        return $.post("" + AJAXURL + "?action=update-translated-siteprofile", data, responseFn, 'json');
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("translated:room:policy:app", function(opts) {
      return new TranslatedPolicy.Controller(opts);
    });
  });
});
