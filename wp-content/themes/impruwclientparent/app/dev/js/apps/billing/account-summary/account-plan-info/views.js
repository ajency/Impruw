var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/account-summary/templates/accountPlanInfo.html'], function(App, viewTpl) {
  return App.module('BillingApp.AccountPlanInfo.View', function(View, App, Backbone, Marionette, $, _) {
    return View.AccountPlanInfoView = (function(_super) {
      __extends(AccountPlanInfoView, _super);

      function AccountPlanInfoView() {
        return AccountPlanInfoView.__super__.constructor.apply(this, arguments);
      }

      AccountPlanInfoView.prototype.template = viewTpl;

      return AccountPlanInfoView;

    })(Marionette.ItemView);
  });
});
