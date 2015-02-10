var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/account-summary/templates/accountPlanInfo.html', 'bootbox'], function(App, viewTpl, bootbox) {
  return App.module('BillingApp.AccountPlanInfo.View', function(View, App, Backbone, Marionette, $, _) {
    return View.AccountPlanInfoView = (function(_super) {
      __extends(AccountPlanInfoView, _super);

      function AccountPlanInfoView() {
        return AccountPlanInfoView.__super__.constructor.apply(this, arguments);
      }

      AccountPlanInfoView.prototype.template = viewTpl;

      AccountPlanInfoView.prototype.events = {
        'click .deactivate-subscription': 'deactivateSubscription'
      };

      AccountPlanInfoView.prototype.onShow = function() {
        return $('[data-toggle="popover"]').popover();
      };

      AccountPlanInfoView.prototype.serializeData = function() {
        var data;
        data = AccountPlanInfoView.__super__.serializeData.call(this);
        data.THEMEURL = THEMEURL;
        return data;
      };

      AccountPlanInfoView.prototype.mixinTemplateHelpers = function(data) {
        data = AccountPlanInfoView.__super__.mixinTemplateHelpers.call(this, data);
        if (data.plan_title === "Default plan") {
          data.plan_title = _.polyglot.t("Free");
        }
        return data;
      };

      AccountPlanInfoView.prototype.deactivateSubscription = function(e) {
        var html;
        e.preventDefault();
        if (PAYMENT_PLAN_ID === '1') {
          html = '<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t("You are already on a free plan") + '</div>';
          this.$el.find('#deactivate_plan_status').empty();
          this.$el.find('#deactivate_plan_status').append(html);
          return;
        }
        if (PAYMENT_PLAN_ID !== '1') {
          return bootbox.confirm("<h4 class='delete-message'>" + (_.polyglot.t('Are you sure you want to switch to free plan?')) + "</h4><p>" + (_.polyglot.t('Doing so will cancel your current paid subscription and default free plan will be activated at the end of your current billing cycle')) + "</p>", (function(_this) {
            return function(result) {
              if (result === true) {
                _this.$el.find('#deactivate_plan_loader').show();
                return _this.trigger("switch:to:free:plan");
              }
            };
          })(this));
        }
      };

      AccountPlanInfoView.prototype.onCancelSubscriptionSuccess = function() {
        var html;
        this.$el.find('#deactivate_plan_loader').hide();
        html = '<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t("Your subscription has been successfully cancelled.You will be defaulted to the free plan at the end of the subscription's cycle") + '</div>';
        this.$el.find('#deactivate_plan_status').empty();
        return this.$el.find('#deactivate_plan_status').append(html);
      };

      AccountPlanInfoView.prototype.onCancelSubscriptionError = function(errorMsg) {
        var html;
        this.$el.find('#deactivate_plan_loader').hide();
        html = '<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + errorMsg + '</div>';
        this.$el.find('#deactivate_plan_status').empty();
        return this.$el.find('#deactivate_plan_status').append(html);
      };

      return AccountPlanInfoView;

    })(Marionette.ItemView);
  });
});
