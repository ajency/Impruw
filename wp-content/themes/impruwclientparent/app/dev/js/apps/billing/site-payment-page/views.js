var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/site-payment-page/templates/payment-layout.html', 'text!apps/billing/site-payment-page/templates/paymentView.html', 'text!apps/billing/site-payment-page/templates/cardList.html', 'text!apps/billing/site-payment-page/templates/newCustomerPaymentView.html'], function(App, paymentLayoutViewTpl, paymentViewTpl, cardListTpl, newCustomerPaymentViewTpl) {
  return App.module('BillingApp.SitePayment.View', function(View, App, Backbone, Marionette, $, _) {
    var SingleCreditCard;
    View.Layout = (function(_super) {
      __extends(Layout, _super);

      function Layout() {
        return Layout.__super__.constructor.apply(this, arguments);
      }

      Layout.prototype.template = paymentLayoutViewTpl;

      Layout.prototype.regions = {
        paymentRegion: '#payment-page-region'
      };

      return Layout;

    })(Marionette.Layout);
    SingleCreditCard = (function(_super) {
      __extends(SingleCreditCard, _super);

      function SingleCreditCard() {
        return SingleCreditCard.__super__.constructor.apply(this, arguments);
      }

      SingleCreditCard.prototype.template = cardListTpl;

      SingleCreditCard.prototype.events = {
        'click': function() {
          return this.$el.find('.single-card').addClass('selected').parents('div').siblings().find('.single-card').removeClass("selected");
        }
      };

      return SingleCreditCard;

    })(Marionette.ItemView);
    View.PaymentPageView = (function(_super) {
      __extends(PaymentPageView, _super);

      function PaymentPageView() {
        return PaymentPageView.__super__.constructor.apply(this, arguments);
      }

      PaymentPageView.prototype.template = paymentViewTpl;

      PaymentPageView.prototype.itemView = SingleCreditCard;

      PaymentPageView.prototype.itemViewContainer = '.card-list';

      PaymentPageView.prototype.modelEvents = {
        'change': 'render'
      };

      PaymentPageView.prototype.serializeData = function() {
        var activePlanName, billingPeriodEndDate, billingPeriodStartDate, currencySymbol, currentSubscriptionAmount, currentSubscriptionBalance, data, nextBillingDate, prorationCharge, selectedPlanAmount, selectedPlanName;
        activePlanName = Marionette.getOption(this, 'activePlanName');
        currentSubscriptionAmount = Marionette.getOption(this, 'currentSubscriptionAmount');
        currencySymbol = Marionette.getOption(this, 'currencySymbol');
        billingPeriodStartDate = Marionette.getOption(this, 'billingPeriodStartDate');
        billingPeriodEndDate = Marionette.getOption(this, 'billingPeriodEndDate');
        nextBillingDate = Marionette.getOption(this, 'nextBillingDate');
        selectedPlanName = Marionette.getOption(this, 'selectedPlanName');
        selectedPlanAmount = Marionette.getOption(this, 'selectedPlanAmount');
        prorationCharge = Marionette.getOption(this, 'prorationCharge');
        currentSubscriptionBalance = Marionette.getOption(this, 'currentSubscriptionBalance');
        data = PaymentPageView.__super__.serializeData.call(this);
        data.THEMEURL = THEMEURL;
        data.activePlanName = activePlanName;
        data.currentSubscriptionAmount = currentSubscriptionAmount;
        data.currencySymbol = currencySymbol;
        data.billingPeriodStartDate = billingPeriodStartDate;
        data.billingPeriodEndDate = billingPeriodEndDate;
        data.nextBillingDate = nextBillingDate;
        data.selectedPlanName = selectedPlanName;
        data.selectedPlanAmount = selectedPlanAmount;
        data.prorationCharge = prorationCharge;
        data.currentSubscriptionBalance = currentSubscriptionBalance;
        return data;
      };

      PaymentPageView.prototype.events = {
        'click #btn-add-card': function(e) {
          var cardNumber, client, clientToken, cvv, expMonth, expYear, nameOnCard;
          e.preventDefault();
          this.$el.find('#addcard_loader').show();
          cardNumber = this.$el.find('#card_number').val();
          nameOnCard = this.$el.find('#card_name').val();
          expMonth = this.$el.find('#exp_month').val();
          expYear = this.$el.find('#exp_year').val();
          cvv = this.$el.find('#card-cvv').val();
          clientToken = this.collection.models[0].get('braintree_client_token');
          client = new braintree.api.Client({
            clientToken: clientToken
          });
          return client.tokenizeCard({
            number: cardNumber,
            cvv: cvv,
            cardholderName: nameOnCard,
            expiration_month: expMonth,
            expiration_year: expYear
          }, (function(_this) {
            return function(err, nonce) {
              return _this.trigger("add:credit:card", nonce);
            };
          })(this));
        },
        'click #btn-stored-pay': function(e) {
          var cardToken, html;
          e.preventDefault();
          cardToken = this.$el.find('.selected .token').val();
          if (_.isUndefined(cardToken)) {
            html = '<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t("Please select a card") + '</div>';
            return this.$el.find('#billingpay_status').append(html);
          } else {
            this.$el.find('#paycredit_loader').show();
            return this.trigger("make:payment:with:stored:card", cardToken);
          }
        }
      };

      PaymentPageView.prototype.onAddCreditCardSuccess = function() {
        var html;
        this.$el.find('input').val('');
        this.$el.find('#addcard_status').empty();
        this.$el.find('#addcard_loader').hide();
        html = '<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t("Card Added Successfully!") + '</div>';
        return this.$el.find('#addcard_status').append(html);
      };

      PaymentPageView.prototype.onAddCreditCardError = function(errorMsg) {
        var html;
        this.$el.find('#addcard_status').empty();
        this.$el.find('#addcard_loader').hide();
        html = "<div class='alert alert-error'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> " + errorMsg + " </div>";
        return this.$el.find('#addcard_status').append(html);
      };

      PaymentPageView.prototype.onPaymentSuccess = function() {
        var html;
        this.$el.find('#billingpay_status').empty();
        this.$el.find('#paycredit_loader').hide();
        html = '<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t("Payment Successful!") + '</div>';
        return this.$el.find('#billingpay_status').append(html);
      };

      PaymentPageView.prototype.onPaymentError = function(errorMsg) {
        var html;
        this.$el.find('#billingpay_status').empty();
        this.$el.find('#paycredit_loader').hide();
        html = "<div class='alert alert-error'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> " + errorMsg + " </div>";
        return this.$el.find('#billingpay_status').append(html);
      };

      return PaymentPageView;

    })(Marionette.CompositeView);
    return View.FirstTimePaymentView = (function(_super) {
      __extends(FirstTimePaymentView, _super);

      function FirstTimePaymentView() {
        return FirstTimePaymentView.__super__.constructor.apply(this, arguments);
      }

      FirstTimePaymentView.prototype.template = newCustomerPaymentViewTpl;

      FirstTimePaymentView.prototype.serializeData = function() {
        var activePlanName, billingPeriodEndDate, billingPeriodStartDate, currencySymbol, currentSubscriptionAmount, currentSubscriptionBalance, data, nextBillingDate, prorationCharge, selectedPlanAmount, selectedPlanName;
        activePlanName = Marionette.getOption(this, 'activePlanName');
        currentSubscriptionAmount = Marionette.getOption(this, 'currentSubscriptionAmount');
        currencySymbol = Marionette.getOption(this, 'currencySymbol');
        billingPeriodStartDate = Marionette.getOption(this, 'billingPeriodStartDate');
        billingPeriodEndDate = Marionette.getOption(this, 'billingPeriodEndDate');
        nextBillingDate = Marionette.getOption(this, 'nextBillingDate');
        selectedPlanName = Marionette.getOption(this, 'selectedPlanName');
        selectedPlanAmount = Marionette.getOption(this, 'selectedPlanAmount');
        prorationCharge = Marionette.getOption(this, 'prorationCharge');
        currentSubscriptionBalance = Marionette.getOption(this, 'currentSubscriptionBalance');
        data = FirstTimePaymentView.__super__.serializeData.call(this);
        data.THEMEURL = THEMEURL;
        data.activePlanName = activePlanName;
        data.currentSubscriptionAmount = currentSubscriptionAmount;
        data.currencySymbol = currencySymbol;
        data.billingPeriodStartDate = billingPeriodStartDate;
        data.billingPeriodEndDate = billingPeriodEndDate;
        data.nextBillingDate = nextBillingDate;
        data.selectedPlanName = selectedPlanName;
        data.selectedPlanAmount = selectedPlanAmount;
        data.prorationCharge = prorationCharge;
        data.currentSubscriptionBalance = currentSubscriptionBalance;
        return data;
      };

      FirstTimePaymentView.prototype.events = {
        'click #btn-pay': function(e) {
          var cardNumber, client, clientToken, cvv, expMonth, expYear, nameOnCard;
          e.preventDefault();
          this.$el.find('#pay_loader').show();
          cardNumber = this.$el.find('#card_number').val();
          nameOnCard = this.$el.find('#card_name').val();
          expMonth = this.$el.find('#exp_month').val();
          expYear = this.$el.find('#exp_year').val();
          cvv = this.$el.find('#card-cvv').val();
          clientToken = this.model.get('braintree_client_token');
          client = new braintree.api.Client({
            clientToken: clientToken
          });
          return client.tokenizeCard({
            number: cardNumber,
            cvv: cvv,
            cardholderName: nameOnCard,
            expiration_month: expMonth,
            expiration_year: expYear
          }, (function(_this) {
            return function(err, nonce) {
              return _this.trigger("new:credit:card:payment", nonce);
            };
          })(this));
        }
      };

      FirstTimePaymentView.prototype.onPaymentSuccess = function() {
        var html;
        this.$el.find('#billingsave_status').empty();
        this.$el.find('#pay_loader').hide();
        html = '<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t("Payment Successful!") + '</div>';
        return this.$el.find('#billingsave_status').append(html);
      };

      FirstTimePaymentView.prototype.onPaymentError = function(errorMsg) {
        var html;
        this.$el.find('#billingsave_status').empty();
        this.$el.find('#pay_loader').hide();
        html = "<div class='alert alert-error'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> " + errorMsg + " </div>";
        return this.$el.find('#billingsave_status').append(html);
      };

      return FirstTimePaymentView;

    })(Marionette.ItemView);
  });
});
