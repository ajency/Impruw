var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/billing/account-summary/controller', 'apps/billing/update-billing/controller', 'apps/billing/pricing-plans/controller', 'apps/billing/site-plans/controller', 'apps/billing/site-payment-page/controller', 'apps/billing/site-credit-cards/controller', 'apps/billing/site-transaction-history/controller', 'apps/billing/payment-page/controller'], function(App) {
  return App.module('BillingApp', function(BillingApp, App, Backbone, Marionette, $, _) {
    var API;
    BillingApp.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'billing': 'summary',
        'billing/account-summary': 'summary',
        'billing/credit-cards': 'creditCards',
        'billing/update-billing': 'updateBilling',
        'billing/pricing-plans': 'plans',
        'billing/payment-page/:id/:braintreeId': 'payment',
        'billing/payment-page/:braintreeId': 'oneTimePayment',
        'billing/transaction-history': 'transactionHistory'
      };

      return Router;

    })(Marionette.AppRouter);
    API = {
      summary: function() {
        return App.execute("show:account:summary:app", {
          region: App.rightRegion
        });
      },
      plans: function() {
        return App.execute("show:site:plans:app", {
          region: App.rightRegion
        });
      },
      payment: function(planId, braintreePlanId) {
        return App.execute("show:site:payment:app", {
          region: App.rightRegion,
          planId: planId,
          braintreePlanId: braintreePlanId,
          subscription: true
        });
      },
      oneTimePayment: function(braintreePlanId) {
        return App.execute("show:site:payment:app", {
          region: App.rightRegion,
          braintreePlanId: braintreePlanId,
          subscription: false
        });
      },
      creditCards: function() {
        return App.execute("show:site:credit:cards:app", {
          region: App.rightRegion
        });
      },
      updateBilling: function() {
        return App.execute("show:billing:info:app", {
          region: App.rightRegion
        });
      },
      transactionHistory: function() {
        return App.execute("show:site:transaction:history:app", {
          region: App.rightRegion
        });
      }
    };
    return BillingApp.on({
      'start': function() {
        return new BillingApp.Router({
          controller: API
        });
      }
    });
  });
});
