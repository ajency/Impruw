var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/pricing-plans/views'], function(App, AppController) {
  return App.module('BillingApp.PaymentPlans', function(PaymentPlans, App, Backbone, Marionette, $, _) {
    PaymentPlans.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.getView = __bind(this.getView, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.siteModel = App.request("get:site:model");
        return App.execute("when:fetched", this.siteModel, (function(_this) {
          return function() {
            var brainTreePlans;
            _this.siteName = _this.siteModel.get('site_name');
            _this.subscriptionId = _this.siteModel.get('braintree_subscription');
            _this.currency = _this.siteModel.get('currency');
            brainTreePlans = App.request("get:braintree:plans");
            _this.subscriptionModel = App.request("get:subscription:by:id", _this.subscriptionId);
            _this.pendingSubscriptionModel = App.request("get:pending:subscription", _this.subscriptionId);
            return App.execute("when:fetched", _this.subscriptionModel, function() {
              _this.billStart = _this.subscriptionModel.get('bill_start');
              _this.billEnd = _this.subscriptionModel.get('bill_end');
              _this.activePlanId = _this.subscriptionModel.get('plan_id');
              return App.execute("when:fetched", _this.pendingSubscriptionModel, function() {
                _this.startDate = _this.pendingSubscriptionModel.get('start_date');
                _this.pendingPlanId = _this.pendingSubscriptionModel.get('plan_id');
                _this.view = _this.getView(brainTreePlans);
                _this.listenTo(_this.view, "switch:to:free:plan", _this.changeToFreePlan);
                App.vent.trigger("set:active:menu", 'billing');
                return _this.show(_this.view);
              });
            });
          };
        })(this));
      };

      Controller.prototype.getView = function(brainTreePlanCollection) {
        return new PaymentPlans.View.PlansView({
          collection: brainTreePlanCollection,
          currency: this.currency,
          activePlanId: this.activePlanId,
          pendingPlanId: this.pendingPlanId,
          siteName: this.siteName,
          billStart: this.billStart,
          billEnd: this.billEnd,
          startDate: this.startDate
        });
      };

      Controller.prototype.changeToFreePlan = function() {
        var cancelDate, options, subscriptionType;
        subscriptionType = this.subscriptionModel.get('subscription_type');
        cancelDate = this.subscriptionModel.get('bill_end');
        options = {
          method: 'POST',
          url: AJAXURL,
          data: {
            'currentSubscriptionId': this.subscriptionId,
            'cancelDate': cancelDate,
            'subscriptionType': subscriptionType,
            'action': 'change-to-free-plan'
          }
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            return _this.view.triggerMethod("free:plan:switch");
          };
        })(this));
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:plans:app", function(opts) {
      return new PaymentPlans.Controller(opts);
    });
  });
});
