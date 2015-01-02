var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/site-payment-page/views'], function(App, AppController) {
  return App.module('BillingApp.SitePayment', function(SitePayment, App, Backbone, Marionette, $, _) {
    SitePayment.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.newCardPayment = __bind(this.newCardPayment, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.siteModel = App.request("get:site:model");
        this.selectedPlanId = opts.planId;
        this.braintreePlanId = opts.braintreePlanId;
        this.selectedPlanModel = App.request("get:braintreeplan:by:id", this.selectedPlanId);
        this.layout = this.getLayout(this.siteModel);
        App.vent.trigger("set:active:menu", 'billing');
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            var creditCardCollection;
            creditCardCollection = App.request("get:credit:cards");
            return App.execute("when:fetched", creditCardCollection, function() {
              var cardExists, creditCardFirstModel;
              creditCardFirstModel = creditCardCollection.at(0);
              cardExists = creditCardFirstModel.get('card_exists');
              _this.customerId = creditCardFirstModel.get('customer_id');
              if (cardExists === true) {
                _this.paymentView = _this.getPaymentPageView(creditCardCollection);
              } else {
                _this.paymentView = _this.getFirstTimePaymentPageView(creditCardFirstModel);
              }
              _this.layout.paymentRegion.show(_this.paymentView);
              return _this.listenTo(_this.paymentView, "new:credit:card:payment", function(paymentMethodNonce) {
                return _this.newCardPayment(paymentMethodNonce);
              });
            });
          };
        })(this));
        return this.show(this.layout, {
          loading: true
        });
      };

      Controller.prototype.getLayout = function(model) {
        return new SitePayment.View.Layout({
          model: model
        });
      };

      Controller.prototype.getPaymentPageView = function(creditCardCollection) {
        return new SitePayment.View.PaymentPageView({
          collection: creditCardCollection
        });
      };

      Controller.prototype.getFirstTimePaymentPageView = function(creditCardModel) {
        return new SitePayment.View.FirstTimePaymentView({
          model: creditCardModel
        });
      };

      Controller.prototype.newCardPayment = function(paymentMethodNonce) {
        var options, postURL;
        postURL = "" + SITEURL + "/api/ajbilling/braintreePlan/" + SITEID["id"] + "/site/" + this.selectedPlanId + "/" + this.braintreePlanId;
        options = {
          method: 'POST',
          url: postURL,
          data: {
            'paymentMethodNonce': paymentMethodNonce,
            'customerName': USER['data']['display_name'],
            'customerEmail': USER['data']['user_email']
          }
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            if (response.subscription_success === true) {
              window.PAYMENT_PLAN_ID = response.plan_id;
              return _this.paymentView.triggerMethod("payment:success");
            } else {
              return _this.paymentView.triggerMethod("payment:error", response.msg);
            }
          };
        })(this));
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:site:payment:app", function(opts) {
      return new SitePayment.Controller(opts);
    });
  });
});
