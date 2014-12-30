var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/site-payment-page/templates/payment-layout.html'], function(App, viewTpl) {
  return App.module('BillingApp.SitePayment.View', function(View, App, Backbone, Marionette, $, _) {
    return View.Layout = (function(_super) {
      __extends(Layout, _super);

      function Layout() {
        return Layout.__super__.constructor.apply(this, arguments);
      }

      Layout.prototype.template = viewTpl;

      Layout.prototype.regions = {
        selectedPlanRegion: '#selected-plan',
        activeSubscriptionRegion: '#active-sub-region',
        paymentRegion: '#payment-region'
      };

      return Layout;

    })(Marionette.Layout);
  });
});
