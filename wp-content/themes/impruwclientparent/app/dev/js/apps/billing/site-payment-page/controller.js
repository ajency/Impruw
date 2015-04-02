var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/site-payment-page/views'], function(App, AppController) {
  return App.module('BillingApp.SitePayment', function(SitePayment, App, Backbone, Marionette, $, _) {
    SitePayment.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.updateBillingGlobals = __bind(this.updateBillingGlobals, this);
        this.asstdSetupStoredCardPayment = __bind(this.asstdSetupStoredCardPayment, this);
        this.storedCardPayment = __bind(this.storedCardPayment, this);
        this.addCard = __bind(this.addCard, this);
        this.newCardAsstdSetupPayment = __bind(this.newCardAsstdSetupPayment, this);
        this.newCardPayment = __bind(this.newCardPayment, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var activePlanModel, currentSubscriptionModel, selectedPlanModel, subscriptionCollection;
        this.siteModel = App.request("get:site:model");
        this.braintreeCustomerId = this.siteModel.get('braintree_customer_id');
        this.selectedPlanId = opts.planId;
        this.braintreePlanId = opts.braintreePlanId;
        this.isSubscription = opts.subscription;
        if (this.isSubscription) {
          selectedPlanModel = App.request("get:feature:plan:by:id", this.selectedPlanId);
          this.selectedPlanName = selectedPlanModel.get('plan_title');
          this.selectedPlanAmount = selectedPlanModel.get('price');
          subscriptionCollection = App.request("get:site:subscriptions");
          currentSubscriptionModel = subscriptionCollection.at(0);
          this.activePaymentToken = currentSubscriptionModel.get('paymentMethodToken');
          this.currentSubscriptionAmount = currentSubscriptionModel.get('price');
          this.currencySymbol = currentSubscriptionModel.get('currency');
          this.billingPeriodStartDate = currentSubscriptionModel.get('billingPeriodStartDate');
          this.billingPeriodEndDate = currentSubscriptionModel.get('billingPeriodEndDate');
          this.nextBillingDate = currentSubscriptionModel.get('nextBillingDate');
          this.prorationCharge = this.getProrationCharge(this.currentSubscriptionAmount, this.selectedPlanAmount, this.billingPeriodStartDate, this.billingPeriodEndDate);
          console.log(this.prorationCharge);
          this.currentSubscriptionDaysLeft = this.getCurrentSubscriptionDaysLeft(this.billingPeriodStartDate, this.billingPeriodEndDate);
          if (PAYMENT_PLAN_ID === '1') {
            this.activePlanName = 'Free Trial Expired';
          } else if (PAYMENT_PLAN_ID === '2') {
            this.activePlanName = 'Free Trial';
          } else {
            activePlanModel = App.request("get:feature:plan:by:id", PAYMENT_PLAN_ID);
            this.activePlanName = activePlanModel.get('plan_title');
          }
        } else {
          this.selectedBraintreePlanModel = App.request("get:braintreeplan:by:id", this.braintreePlanId);
          App.execute("when:fetched", this.selectedBraintreePlanModel, (function(_this) {
            return function() {
              _this.selectedPlanName = _this.selectedBraintreePlanModel.get('name');
              _this.selectedPlanAmount = _this.selectedBraintreePlanModel.get('price');
              _this.currencyCode = _this.selectedBraintreePlanModel.get('currencyIsoCode');
              return _this.currencySymbol = CURRENCY_SYMBOLS[_this.currencyCode];
            };
          })(this));
        }
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
              _this.listenTo(_this.paymentView, "new:credit:card:payment", function(paymentMethodNonce) {
                return _this.newCardPayment(paymentMethodNonce);
              });
              _this.listenTo(_this.paymentView, "new:credit:card:assistedsetup:payment", function(paymentMethodNonce) {
                return _this.newCardAsstdSetupPayment(paymentMethodNonce);
              });
              _this.listenTo(_this.paymentView, "add:credit:card", function(paymentMethodNonce) {
                return _this.addCard(paymentMethodNonce);
              });
              _this.listenTo(_this.paymentView, "make:payment:with:stored:card", function(cardToken) {
                return _this.storedCardPayment(cardToken);
              });
              return _this.listenTo(_this.paymentView, "make:assistedsetup:payment:stored:card", function(cardToken) {
                return _this.asstdSetupStoredCardPayment(cardToken);
              });
            });
          };
        })(this));
        return this.show(this.layout, {
          loading: true
        });
      };

      Controller.prototype.getCurrentSubscriptionBalance = function(oldPrice, prorationCharge) {
        var currentBalance;
        if (PAYMENT_PLAN_ID === '1') {
          return 0;
        }
        currentBalance = oldPrice - prorationCharge;
        currentBalance = parseFloat(currentBalance).toFixed(2);
        return currentBalance;
      };

      Controller.prototype.getCurrentSubscriptionDaysLeft = function(oldStartDate, oldEndDate) {
        var daysLeftInBillingPeriod, oldEndDateFormatted, oldEndDateMoment, today, todayFormatted, todayMoment;
        if ((PAYMENT_PLAN_ID === '1') || (oldEndDate === 'N/A')) {
          return 0;
        }
        today = new Date();
        today = today.toGMTString();
        todayFormatted = moment(today).format('M/D/YYYY');
        oldEndDateFormatted = moment(oldEndDate).format('M/D/YYYY');
        todayMoment = moment(todayFormatted, 'M/D/YYYY');
        oldEndDateMoment = moment(oldEndDateFormatted, 'M/D/YYYY');
        daysLeftInBillingPeriod = oldEndDateMoment.diff(todayMoment, 'days');
        return daysLeftInBillingPeriod;
      };

      Controller.prototype.getProrationCharge = function(oldPrice, newPrice, oldStartDate, oldEndDate) {
        var daysInBillingPeriod, daysLeftInBillingPeriod, oldEndDateFormatted, oldEndDateMoment, oldStartDateFormatted, oldStartDateMoment, prorationCharge, today, todayFormatted, todayMoment;
        if (PAYMENT_PLAN_ID === '1' || (oldEndDate === 'N/A')) {
          return newPrice;
        }
        today = new Date();
        today = today.toGMTString();
        todayFormatted = moment(today).format('M/D/YYYY');
        oldStartDateFormatted = moment(oldStartDate).format('M/D/YYYY');
        oldEndDateFormatted = moment(oldEndDate).format('M/D/YYYY');
        todayMoment = moment(todayFormatted, 'M/D/YYYY');
        oldStartDateMoment = moment(oldStartDateFormatted, 'M/D/YYYY');
        oldEndDateMoment = moment(oldEndDateFormatted, 'M/D/YYYY');
        daysInBillingPeriod = oldEndDateMoment.diff(oldStartDateMoment, 'days') + 1;
        daysLeftInBillingPeriod = oldEndDateMoment.diff(todayMoment, 'days');
        prorationCharge = (newPrice - oldPrice) * daysLeftInBillingPeriod / daysInBillingPeriod;
        prorationCharge -= prorationCharge % .01;
        return prorationCharge;
      };

      Controller.prototype.getLayout = function(model) {
        return new SitePayment.View.Layout({
          model: model
        });
      };

      Controller.prototype.getPaymentPageView = function(creditCardCollection) {
        return new SitePayment.View.PaymentPageView({
          collection: creditCardCollection,
          activePlanName: this.activePlanName,
          currentSubscriptionAmount: this.currentSubscriptionAmount,
          currencySymbol: this.currencySymbol,
          billingPeriodStartDate: this.billingPeriodStartDate,
          billingPeriodEndDate: this.billingPeriodEndDate,
          nextBillingDate: this.nextBillingDate,
          selectedPlanName: this.selectedPlanName,
          selectedPlanAmount: this.selectedPlanAmount,
          prorationCharge: this.prorationCharge,
          currentSubscriptionDaysLeft: this.currentSubscriptionDaysLeft,
          activePaymentToken: this.activePaymentToken,
          isSubscription: this.isSubscription
        });
      };

      Controller.prototype.getFirstTimePaymentPageView = function(creditCardModel) {
        return new SitePayment.View.FirstTimePaymentView({
          model: creditCardModel,
          activePlanName: this.activePlanName,
          currentSubscriptionAmount: this.currentSubscriptionAmount,
          currencySymbol: this.currencySymbol,
          billingPeriodStartDate: this.billingPeriodStartDate,
          billingPeriodEndDate: this.billingPeriodEndDate,
          nextBillingDate: this.nextBillingDate,
          selectedPlanName: this.selectedPlanName,
          selectedPlanAmount: this.selectedPlanAmount,
          prorationCharge: this.prorationCharge,
          currentSubscriptionDaysLeft: this.currentSubscriptionDaysLeft,
          isSubscription: this.isSubscription
        });
      };

      Controller.prototype.getTranslatedBraintreeResponse = function(responseMessage) {
        var splitMsg, translatedMsgResponse;
        translatedMsgResponse = "";
        splitMsg = responseMessage.split("\n");
        _.each(splitMsg, function(value, key) {
          var translatedMsg;
          translatedMsg = _.polyglot.t(value);
          translatedMsg = translatedMsg + "<br/>";
          return translatedMsgResponse += translatedMsg;
        });
        return translatedMsgResponse;
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
            var msgResponse, newCreditCard, newCreditCardModel, translatedMsgResponse;
            if (response.subscription_success === true) {
              _this.updateBillingGlobals(response);
              newCreditCard = response.new_credit_card;
              newCreditCardModel = new Backbone.Model(newCreditCard);
              _this.creditCardCollection = App.request("get:credit:cards");
              _this.creditCardCollection.add(newCreditCardModel);
              return _this.paymentView.triggerMethod("payment:success");
            } else {
              msgResponse = response.msg;
              translatedMsgResponse = _this.getTranslatedBraintreeResponse(msgResponse);
              return _this.paymentView.triggerMethod("payment:error", translatedMsgResponse);
            }
          };
        })(this));
      };

      Controller.prototype.newCardAsstdSetupPayment = function(paymentMethodNonce) {
        var options, postURL;
        postURL = "" + SITEURL + "/api/ajbilling/oneTimeTransaction/" + SITEID["id"] + "/site/" + this.braintreePlanId;
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
            var newCreditCard, newCreditCardModel, translatedMsgResponse;
            if (response.success === true) {
              newCreditCard = response.credit_card;
              newCreditCardModel = new Backbone.Model(newCreditCard);
              _this.creditCardCollection = App.request("get:credit:cards");
              _this.creditCardCollection.add(newCreditCardModel);
              return _this.paymentView.triggerMethod("payment:success");
            } else {
              translatedMsgResponse = _this.getTranslatedBraintreeResponse(response.msg);
              return _this.paymentView.triggerMethod("payment:error", translatedMsgResponse);
            }
          };
        })(this));
      };

      Controller.prototype.addCard = function(paymentMethodNonce) {
        var options, postURL;
        postURL = "" + SITEURL + "/api/ajbilling/creditCard/" + SITEID["id"] + "/site";
        options = {
          method: 'POST',
          url: postURL,
          data: {
            'paymentMethodNonce': paymentMethodNonce
          }
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            var newCreditCard, newCreditCardModel, translatedMsgResponse;
            if (response.success === true) {
              newCreditCard = response.new_credit_card;
              newCreditCardModel = new Backbone.Model(newCreditCard);
              _this.creditCardCollection = App.request("get:credit:cards");
              _this.creditCardCollection.add(newCreditCardModel);
              return _this.paymentView.triggerMethod("add:credit:card:success");
            } else {
              translatedMsgResponse = _this.getTranslatedBraintreeResponse(response.msg);
              return _this.paymentView.triggerMethod("add:credit:card:error", translatedMsgResponse);
            }
          };
        })(this));
      };

      Controller.prototype.storedCardPayment = function(paymentMethodToken) {
        var options, postURL;
        postURL = "" + SITEURL + "/api/ajbilling/braintreePlan/" + SITEID["id"] + "/site/" + this.selectedPlanId + "/" + this.braintreePlanId;
        options = {
          method: 'POST',
          url: postURL,
          data: {
            'paymentMethodToken': paymentMethodToken
          }
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            var translatedMsgResponse;
            if (response.subscription_success === true) {
              _this.updateBillingGlobals(response);
              return _this.paymentView.triggerMethod("payment:success");
            } else {
              translatedMsgResponse = _this.getTranslatedBraintreeResponse(response.msg);
              return _this.paymentView.triggerMethod("payment:error", translatedMsgResponse);
            }
          };
        })(this));
      };

      Controller.prototype.asstdSetupStoredCardPayment = function(paymentMethodToken) {
        var options, postURL;
        postURL = "" + SITEURL + "/api/ajbilling/oneTimeTransaction/" + SITEID["id"] + "/site/" + this.braintreePlanId;
        options = {
          method: 'POST',
          url: postURL,
          data: {
            'paymentMethodToken': paymentMethodToken
          }
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            var translatedMsgResponse;
            if (response.success === true) {
              _this.updateBillingGlobals(response);
              return _this.paymentView.triggerMethod("payment:success");
            } else {
              translatedMsgResponse = _this.getTranslatedBraintreeResponse(response.msg);
              return _this.paymentView.triggerMethod("payment:error", translatedMsgResponse);
            }
          };
        })(this));
      };

      Controller.prototype.updateBillingGlobals = function(updateResponse) {
        var featureChanges, planFeatureCount, updatedSubscription, updatedSubscriptionModel;
        window.PAYMENT_PLAN_ID = updateResponse.plan_id;
        window.IS_EMAIL_ALLOWED = updateResponse.is_email_allowed;
        window.IS_SITEADDON_ALLOWED = updateResponse.is_siteaddon_allowed;
        featureChanges = updateResponse.feature_changes;
        planFeatureCount = {};
        _.each(featureChanges, function(featureChange, key) {
          var featureComponent;
          featureComponent = featureChange['feature_component'];
          if (featureComponent !== 'domain_mapping') {
            return planFeatureCount[featureComponent] = [
              {
                current_count: parseInt(featureChange['current_count']),
                allowed_count: parseInt(featureChange['allowed_count'])
              }
            ];
          }
        });
        window.PLAN_FEATURE_COUNT = planFeatureCount;
        updatedSubscription = updateResponse.updated_subscription;
        updatedSubscriptionModel = new Backbone.Model(updatedSubscription);
        this.subscriptionCollection = App.request("get:site:subscriptions");
        this.subscriptionCollection.reset();
        return this.subscriptionCollection.add(updatedSubscriptionModel);
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:site:payment:app", function(opts) {
      return new SitePayment.Controller(opts);
    });
  });
});
