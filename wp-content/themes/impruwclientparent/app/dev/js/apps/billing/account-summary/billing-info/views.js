var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/account-summary/templates/billingInfo.html'], function(App, viewTpl) {
  return App.module('BillingApp.BillingInfo.View', function(View, App, Backbone, Marionette, $, _) {
    View.BillingInfoView = (function(_super) {
      __extends(BillingInfoView, _super);

      function BillingInfoView() {
        return BillingInfoView.__super__.constructor.apply(this, arguments);
      }

      BillingInfoView.prototype.template = viewTpl;

      return BillingInfoView;

    })(Marionette.ItemView);
    return View.EmptyBillingInfoView = (function(_super) {
      __extends(EmptyBillingInfoView, _super);

      function EmptyBillingInfoView() {
        return EmptyBillingInfoView.__super__.constructor.apply(this, arguments);
      }

      EmptyBillingInfoView.prototype.template = '<div class="row"> <div class="col-sm-12"> <div class="alert alert-info"> No Billing Info Available </div> </div> </div>';

      return EmptyBillingInfoView;

    })(Marionette.ItemView);
  });
});
