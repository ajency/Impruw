var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/account-summary/templates/accountSubscriptionInfo.html'], function(App, viewTpl) {
  return App.module('BillingApp.AccountSubscriptionInfo.View', function(View, App, Backbone, Marionette, $, _) {
    return View.AccountSubscriptionInfoView = (function(_super) {
      __extends(AccountSubscriptionInfoView, _super);

      function AccountSubscriptionInfoView() {
        return AccountSubscriptionInfoView.__super__.constructor.apply(this, arguments);
      }

      AccountSubscriptionInfoView.prototype.template = viewTpl;

      AccountSubscriptionInfoView.prototype.serializeData = function() {
        var data;
        data = AccountSubscriptionInfoView.__super__.serializeData.call(this);
        data.timezone = BT_TIMEZONE;
        if (data.subscription_status === 'Canceled') {
          data.nextBillingDate = 'N/A';
          data.nextBillAmount = '0';
        }
        return data;
      };

      return AccountSubscriptionInfoView;

    })(Marionette.ItemView);
  });
});
