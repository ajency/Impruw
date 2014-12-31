var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/billing/account-summary/controller', 'apps/billing/update-billing/controller', 'apps/billing/pricing-plans/controller', 'apps/billing/site-plans/controller', 'apps/billing/site-payment-page/controller', 'apps/billing/payment-page/controller'], function(App) {
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
        'billing/pricing-plans': 'plans',
        'billing/payment-page/:id/:braintreeId': 'payment'
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
          braintreePlanId: braintreePlanId
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
