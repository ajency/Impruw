var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/account-summary/account-info/controller', 'apps/billing/account-summary/billing-info/controller', 'apps/billing/account-summary/purchase-history/controller', 'apps/billing/account-summary/views'], function(App, AppController) {
  return App.module('BillingApp.AccountSummary', function(AccountSummary, App, Backbone, Marionette, $, _) {
    AccountSummary.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.layout = this.getLayout();
        this.siteModel = App.request("get:site:model");
        App.vent.trigger("set:active:menu", 'billing');
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            return App.execute("when:fetched", _this.siteModel, function() {
              _this.subscriptionId = _this.siteModel.get('braintree_subscription');
              App.execute("show:account:info", {
                region: _this.layout.accountInfoRegion,
                subscriptionId: _this.subscriptionId
              });
              App.execute("show:billing:info", {
                region: _this.layout.billingInfoRegion,
                model: _this.siteModel
              });
              return App.execute("show:purchase:history", {
                region: _this.layout.purchaseHistoryRegion,
                model: _this.siteModel
              });
            });
          };
        })(this));
        return this.show(this.layout);
      };

      Controller.prototype.getLayout = function() {
        return new AccountSummary.View.Layout;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:account:summary:app", function(opts) {
      return new AccountSummary.Controller(opts);
    });
  });
});
