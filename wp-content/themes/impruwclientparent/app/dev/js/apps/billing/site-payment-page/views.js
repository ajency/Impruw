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
        selectedPlanRegion: '#selected-plan',
        paymentRegion: '#payment-region'
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

      return PaymentPageView;

    })(Marionette.CompositeView);
    return View.FirstTimePaymentView = (function(_super) {
      __extends(FirstTimePaymentView, _super);

      function FirstTimePaymentView() {
        return FirstTimePaymentView.__super__.constructor.apply(this, arguments);
      }

      FirstTimePaymentView.prototype.template = newCustomerPaymentViewTpl;

      FirstTimePaymentView.prototype.serializeData = function() {
        var data;
        data = FirstTimePaymentView.__super__.serializeData.call(this);
        data.THEMEURL = THEMEURL;
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

      return FirstTimePaymentView;

    })(Marionette.ItemView);
  });
});
