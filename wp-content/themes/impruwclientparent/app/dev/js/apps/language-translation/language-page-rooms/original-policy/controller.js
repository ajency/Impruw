var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-rooms/original-policy/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageRooms.OriginalPolicy', function(OriginalPolicy, App, Backbone, Marionette, $, _) {
    OriginalPolicy.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var editLang, siteModel;
        editLang = opts.editLang;
        this.siteModel = siteModel = App.request("get:site:model");
        this.policyView = this._getPolicyView(siteModel);
        return this.show(this.policyView, {
          loading: true
        });
      };

      Controller.prototype._getPolicyView = function(model) {
        return new OriginalPolicy.Views.OriginalPolicyView({
          model: model
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("original:room:policy:app", function(opts) {
      return new OriginalPolicy.Controller(opts);
    });
  });
});
