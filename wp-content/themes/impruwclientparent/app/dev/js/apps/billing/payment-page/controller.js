var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/payment-page/views'], function(App, AppController) {
  return App.module('BillingApp.Payment', function(Payment, App, Backbone, Marionette, $, _) {
    Payment.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.payWithStoredCard = __bind(this.payWithStoredCard, this);
        this.userPayment = __bind(this.userPayment, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.siteModel = App.request("get:site:model");
        this.selectedPlanId = opts.planId;
        this.selectedPlanModel = App.request("get:plan:by:id", this.selectedPlanId);
        this.layout = this.getLayout(this.siteModel);
        App.vent.trigger("set:active:menu", 'billing');
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            var brainTreeCustomerId, creditCardModel, subscriptionModel;
            App.execute("when:fetched", _this.selectedPlanModel, function() {
              return _this.layout.selectedPlanRegion.show(_this.selectedPlan(_this.selectedPlanModel));
            });
            _this.subscriptionId = _this.siteModel.get('braintree_subscription');
            subscriptionModel = App.request("get:subscription:by:id", _this.subscriptionId);
            App.execute("when:fetched", subscriptionModel, function() {
              return _this.layout.activeSubscriptionRegion.show(_this.activeSubscription(subscriptionModel));
            });
            brainTreeCustomerId = _this.siteModel.get('braintree_customer_id');
            creditCardModel = App.request("get:card:info", brainTreeCustomerId);
            return App.execute("when:fetched", creditCardModel, function() {
              var cardExists;
              cardExists = creditCardModel.get('card_exists');
              if (cardExists === true) {
                _this.paymentView = _this.getPaymentView(creditCardModel);
              } else {
                _this.paymentView = _this.getFirstTimePaymentView(creditCardModel);
              }
              _this.layout.paymentRegion.show(_this.paymentView);
              _this.listenTo(_this.paymentView, "credit:card:payment", _this.userPayment);
              return _this.listenTo(_this.paymentView, "make:payment:with:stored:card", _this.payWithStoredCard);
            });
          };
        })(this));
        return this.show(this.layout, {
          loading: true
        });
      };

      Controller.prototype.userPayment = function(paymentMethodNonce) {
        var options;
        options = {
          method: 'POST',
          url: AJAXURL,
          data: {
            'paymentMethodNonce': paymentMethodNonce,
            'selectedPlanId': this.selectedPlanId,
            'action': 'make-payment'
          }
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            if (response.code === "OK") {
              return _this.paymentView.triggerMethod("payment:success");
            } else {
              return _this.paymentView.triggerMethod("payment:error", response.msg);
            }
          };
        })(this));
      };

      Controller.prototype.payWithStoredCard = function(data) {
        var options;
        options = {
          method: 'POST',
          url: AJAXURL,
          data: {
            'cardToken': data.token,
            'selectedPlanId': this.selectedPlanId,
            'currentSubscriptionId': this.subscriptionId,
            'action': data.action
          }
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            if (response.code === "OK") {
              return _this.paymentView.triggerMethod("payment:success");
            } else {
              return _this.paymentView.triggerMethod("payment:error", response.msg);
            }
          };
        })(this));
      };

      Controller.prototype.getLayout = function(model) {
        return new Payment.View.Layout({
          model: model
        });
      };

      Controller.prototype.selectedPlan = function(selectedPlanModel) {
        return new Payment.View.SelectedPlanView({
          model: selectedPlanModel
        });
      };

      Controller.prototype.activeSubscription = function(subscriptionModel) {
        return new Payment.View.ActiveSubscriptionView({
          model: subscriptionModel
        });
      };

      Controller.prototype.getPaymentView = function(creditCardModel) {
        return new Payment.View.PaymentView({
          model: creditCardModel
        });
      };

      Controller.prototype.getFirstTimePaymentView = function(creditCardModel) {
        return new Payment.View.FirstPaymentView({
          model: creditCardModel
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:payment:app", function(opts) {
      return new Payment.Controller(opts);
    });
  });
});
