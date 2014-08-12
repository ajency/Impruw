var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/account-summary/account-info/views'], function(App, AppController) {
  return App.module('BillingApp.AccountInfo', function(AccountInfo, App, Backbone, Marionette, $, _) {
    AccountInfo.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var subscriptionModel;
        subscriptionModel = opts.subscriptionModel;
        this.view = this.getView(subscriptionModel);
        App.vent.trigger("set:active:menu", 'billing');
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getView = function(subscriptionModel) {
        return new AccountInfo.View.AccountInfoView({
          model: subscriptionModel
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:account:info", function(opts) {
      return new AccountInfo.Controller(opts);
    });
  });
});
