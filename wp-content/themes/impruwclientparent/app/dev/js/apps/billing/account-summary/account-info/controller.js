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
        var siteModel, subscriptionId, subscriptionModel;
        siteModel = opts.model;
        subscriptionId = siteModel.get('braintree_subscription');
        this.activationDate = siteModel.get('subscription_start_date');
        subscriptionModel = App.request("get:subscription:by:id", subscriptionId);
        return App.execute("when:fetched", subscriptionModel, (function(_this) {
          return function() {
            _this.view = _this.getView(subscriptionModel);
            App.vent.trigger("set:active:menu", 'billing');
            return _this.show(_this.view, {
              loading: true
            });
          };
        })(this));
      };

      Controller.prototype.getView = function(subscriptionModel) {
        return new AccountInfo.View.AccountInfoView({
          model: subscriptionModel,
          activationDate: this.activationDate
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:account:info", function(opts) {
      return new AccountInfo.Controller(opts);
    });
  });
});
