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
        accountPlanRegion: '#account-plan-info',
        accountSubscriptionRegion: '#account-subscription-info',
        assistedSetupRegion: '#assisted-setup-info',
        siteAddOnRegion: '#site-addons-info',
        pendingSubscriptionRegion: '#pending-sub',
        billingInfoRegion: '#billing-info',
        purchaseHistoryRegion: '#purchase-history'
      };

      Layout.prototype.onRender = function() {
        $("html, body").animate({
          scrollTop: 0
        }, "slow");
        return this.$el.find('.spinner-markup').spin(this._getOptions());
      };

      Layout.prototype._getOptions = function() {
        return {
          lines: 10,
          length: 6,
          width: 2.5,
          radius: 7,
          corners: 1,
          rotate: 9,
          direction: 1,
          color: '#ff9e2c',
          speed: 1,
          trail: 60,
          shadow: false,
          hwaccel: true,
          className: 'spinner',
          zIndex: 2e9,
          top: '0px',
          left: '40px'
        };
      };

      return Layout;

    })(Marionette.Layout);
  });
});
