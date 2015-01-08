var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/site-credit-cards/templates/credit-cards-layout.html', 'text!apps/billing/site-credit-cards/templates/credit-card-listing.html', 'text!apps/billing/site-credit-cards/templates/single-credit-card.html', 'bootbox'], function(App, creditCardLayoutViewTpl, creditCardListTpl, singleCardTpl, bootbox) {
  return App.module('BillingApp.SiteCreditCards.View', function(View, App, Backbone, Marionette, $, _) {
    var EmptyView, SingleCreditCard;
    View.Layout = (function(_super) {
      __extends(Layout, _super);

      function Layout() {
        return Layout.__super__.constructor.apply(this, arguments);
      }

      Layout.prototype.template = creditCardLayoutViewTpl;

      Layout.prototype.regions = {
        cardListingRegion: '#credit-card-listing'
      };

      return Layout;

    })(Marionette.Layout);
    EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.template = '<br/><div class="empty-info">{{#polyglot}}No Credit cards present{{/polyglot}}</div><br/>';

      return EmptyView;

    })(Marionette.ItemView);
    SingleCreditCard = (function(_super) {
      __extends(SingleCreditCard, _super);

      function SingleCreditCard() {
        return SingleCreditCard.__super__.constructor.apply(this, arguments);
      }

      SingleCreditCard.prototype.template = singleCardTpl;

      SingleCreditCard.prototype.onShow = function() {
        var activePaymentToken;
        activePaymentToken = Marionette.getOption(this, 'paymentMethodToken');
        if (this.model.get('token') === activePaymentToken) {
          return this.$el.find('.single-card').addClass('selected').parents('div').siblings().find('.single-card').removeClass("selected");
        }
      };

      SingleCreditCard.prototype.events = {
        'click': function() {
          return this.$el.find('.single-card').addClass('selected').parents('div').siblings().find('.single-card').removeClass("selected");
        }
      };

      return SingleCreditCard;

    })(Marionette.ItemView);
    return View.CreditCardListView = (function(_super) {
      __extends(CreditCardListView, _super);

      function CreditCardListView() {
        return CreditCardListView.__super__.constructor.apply(this, arguments);
      }

      CreditCardListView.prototype.template = creditCardListTpl;

      CreditCardListView.prototype.itemView = SingleCreditCard;

      CreditCardListView.prototype.emptyView = EmptyView;

      CreditCardListView.prototype.itemViewContainer = '.credit-cards';

      CreditCardListView.prototype.modelEvents = {
        'change': 'render'
      };

      CreditCardListView.prototype.itemViewOptions = function() {
        return {
          paymentMethodToken: Marionette.getOption(this, 'paymentMethodToken'),
          braintreeClientToken: Marionette.getOption(this, 'braintreeClientToken')
        };
      };

      CreditCardListView.prototype.serializeData = function() {
        var data;
        data = CreditCardListView.__super__.serializeData.call(this);
        if (this.collection.length === 0) {
          data.creditcardsExist = 0;
        } else {
          data.creditcardsExist = 1;
        }
        data.THEMEURL = THEMEURL;
        return data;
      };

      CreditCardListView.prototype.events = {
        'click #btn-add-new-card': function(e) {
          var braintreeClientToken, cardNumber, client, cvv, expMonth, expYear, nameOnCard;
          braintreeClientToken = Marionette.getOption(this, 'braintreeClientToken');
          e.preventDefault();
          this.$el.find('.addcard_loader').show();
          cardNumber = this.$el.find('#card_number').val();
          nameOnCard = this.$el.find('#card_name').val();
          expMonth = this.$el.find('#exp_month').val();
          expYear = this.$el.find('#exp_year').val();
          cvv = this.$el.find('#card-cvv').val();
          client = new braintree.api.Client({
            clientToken: braintreeClientToken
          });
          return client.tokenizeCard({
            number: cardNumber,
            cvv: cvv,
            cardholderName: nameOnCard,
            expiration_month: expMonth,
            expiration_year: expYear
          }, (function(_this) {
            return function(err, nonce) {
              return _this.trigger("add:new:credit:card", nonce);
            };
          })(this));
        },
        'click #btn-set-as-active': 'setActiveCard',
        'click #btn-forget-card': 'deleteCard'
      };

      CreditCardListView.prototype.setActiveCard = function(e) {
        var currentPaymentmethodToken, currentSubscriptionId, currentSubscriptionStatus, selectedCardToken;
        e.preventDefault();
        currentSubscriptionId = this.model.get('id');
        currentSubscriptionStatus = this.model.get('subscription_status');
        currentPaymentmethodToken = this.model.get('paymentMethodToken');
        selectedCardToken = this.$el.find('.selected .token').val();
        this.$el.find('.active_card_loader').show();
        return this.trigger("set:active:credit:card", currentSubscriptionId, selectedCardToken);
      };

      CreditCardListView.prototype.deleteCard = function(e) {
        var currentSubscriptionId, selectedCardToken;
        e.preventDefault();
        currentSubscriptionId = this.model.get('id');
        selectedCardToken = this.$el.find('.selected .token').val();
        this.$el.find('.forget_card_loader').show();
        return this.trigger("delete:credit:card", currentSubscriptionId, selectedCardToken);
      };

      CreditCardListView.prototype.onAddCreditCardSuccess = function() {
        var html;
        this.$el.find('.addcard_status').empty();
        this.$el.find('.addcard_loader').hide();
        html = '<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t("Card Added Successfully!") + '</div>';
        return this.$el.find('.addcard_status').append(html);
      };

      CreditCardListView.prototype.onAddCreditCardError = function(errorMsg) {
        var html;
        this.$el.find('.addcard_status').empty();
        this.$el.find('.addcard_loader').hide();
        html = "<div class='alert alert-error'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> " + errorMsg + " </div>";
        return this.$el.find('.addcard_status').append(html);
      };

      CreditCardListView.prototype.onSetActiveCreditCardSuccess = function() {
        var html;
        this.$el.find('.activeforget_card_status').empty();
        this.$el.find('.active_card_loader').hide();
        html = '<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t("Card successfully set as the active credit card") + '</div>';
        return this.$el.find('.activeforget_card_status').append(html);
      };

      CreditCardListView.prototype.onSetActiveCreditCardSuccessError = function(errorMsg) {
        var html;
        this.$el.find('.activeforget_card_status').empty();
        this.$el.find('.active_card_loader').hide();
        html = '<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t(errorMsg) + '</div>';
        return this.$el.find('.activeforget_card_status').append(html);
      };

      CreditCardListView.prototype.onDeleteCreditCardSuccess = function() {
        var html;
        this.$el.find('.activeforget_card_status').empty();
        this.$el.find('.forget_card_loader').hide();
        html = '<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t("Card successfully deleted") + '</div>';
        return this.$el.find('.activeforget_card_status').append(html);
      };

      CreditCardListView.prototype.onDeleteCreditCardError = function(errorMsg) {
        var html;
        this.$el.find('.activeforget_card_status').empty();
        this.$el.find('.forget_card_loader').hide();
        html = '<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t(errorMsg) + '</div>';
        return this.$el.find('.activeforget_card_status').append(html);
      };

      return CreditCardListView;

    })(Marionette.CompositeView);
  });
});
