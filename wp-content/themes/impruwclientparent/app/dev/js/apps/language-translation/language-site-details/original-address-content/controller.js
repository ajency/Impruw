var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-site-details/original-address-content/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguageSiteContent.OriginalAddress', function(OriginalAddress, App, Backbone, Marionette, $, _) {
    OriginalAddress.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var siteModel;
        this.siteModel = siteModel = App.request("get:site:model");
        this.originalAddressView = this._getAddressView(siteModel);
        return this.show(this.originalAddressView, {
          loading: true
        });
      };

      Controller.prototype._getAddressView = function(model) {
        return new OriginalAddress.Views.OriginalAddressItemView({
          model: model
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("original:address:app", function(opts) {
      return new OriginalAddress.Controller(opts);
    });
  });
});
