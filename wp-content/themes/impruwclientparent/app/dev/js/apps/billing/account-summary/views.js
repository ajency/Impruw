var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/account-summary/templates/mainView.html'], function(App, viewTpl) {
  return App.module('BillingApp.AccountSummary.View', function(View, App, Backbone, Marionette, $, _) {
    return View.Layout = (function(_super) {
      __extends(Layout, _super);

      function Layout() {
        return Layout.__super__.constructor.apply(this, arguments);
      }

      Layout.prototype.template = viewTpl;

      Layout.prototype.regions = {
        accountInfoRegion: '#account-info',
        siteAddOnRegion: '#site-addons-info',
        pendingSubscriptionRegion: '#pending-sub',
        billingInfoRegion: '#billing-info',
        purchaseHistoryRegion: '#purchase-history'
      };

      return Layout;

    })(Marionette.Layout);
  });
});
