var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/account-summary/templates/accountInfo.html'], function(App, viewTpl) {
  return App.module('BillingApp.AccountInfo.View', function(View, App, Backbone, Marionette, $, _) {
    return View.AccountInfoView = (function(_super) {
      __extends(AccountInfoView, _super);

      function AccountInfoView() {
        return AccountInfoView.__super__.constructor.apply(this, arguments);
      }

      AccountInfoView.prototype.template = viewTpl;

      AccountInfoView.prototype.onShow = function() {
        var planName;
        planName = this.model.get('plan_name');
        if (planName === "Free") {
          return this.$el.find('#deactivate-sub').hide();
        }
      };

      return AccountInfoView;

    })(Marionette.ItemView);
  });
});
