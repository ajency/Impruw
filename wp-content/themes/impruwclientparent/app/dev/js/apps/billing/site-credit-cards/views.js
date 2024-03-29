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

      Layout.prototype.onRender = function() {
        $("html, body").animate({
          scrollTop: 0
        }, "slow");
        return this.$el.find('.spinner-markup').spin(this._getOptions());
      };

      Layout.prototype._getOptions = function() {
        return {
          lines: 10,
          length: 6,
          width: 2.5,
          radius: 7,
          corners: 1,
          rotate: 9,
          direction: 1,
          color: '#ff9e2c',
          speed: 1,
          trail: 60,
          shadow: false,
          hwaccel: true,
          className: 'spinner',
          zIndex: 2e9,
          top: '0px',
          left: '40px'
        };
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

      SingleCreditCard.prototype.serializeData = function() {
        var creditCardIndex, data;
        data = SingleCreditCard.__super__.serializeData.call(this);
        creditCardIndex = Marionette.getOption(this, 'creditCardIndex');
        data.creditCardIndex = creditCardIndex + 1;
        return data;
      };

      SingleCreditCard.prototype.onShow = function() {
        var activePaymentToken;
        activePaymentToken = Marionette.getOption(this, 'paymentMethodToken');
        if (this.model.get('token') === activePaymentToken) {
          return this.$el.find('.single-card').addClass('active').parents('div').siblings().find('.single-card').removeClass("active");
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

      CreditCardListView.prototype.itemViewOptions = function(model, index) {
        return {
          paymentMethodToken: Marionette.getOption(this, 'paymentMethodToken'),
          braintreeClientToken: Marionette.getOption(this, 'braintreeClientToken'),
          creditCardIndex: index
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

      CreditCardListView.prototype.onRender = function() {
        $('.spinner-markup').spin(false);
        this.$el.find('#exp_month').selectpicker();
        return this.$el.find('#exp_year').selectpicker();
      };

      CreditCardListView.prototype.events = {
        'click #btn-add-new-card': function(e) {
          var braintreeClientToken, cardNumber, client, cvv, expMonth, expYear, nameOnCard;
          braintreeClientToken = Marionette.getOption(this, 'braintreeClientToken');
          e.preventDefault();
          if (this.$el.find('.add-card-form').valid()) {
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
          }
        },
        'click #btn-set-as-active': 'setActiveCard',
        'click #btn-forget-card': 'deleteCard'
      };

      CreditCardListView.prototype.setActiveCard = function(e) {
        var currentPaymentmethodToken, currentSubscriptionId, currentSubscriptionStatus, html, selectedCardToken;
        e.preventDefault();
        currentSubscriptionId = this.model.get('id');
        currentSubscriptionStatus = this.model.get('subscription_status');
        currentPaymentmethodToken = this.model.get('paymentMethodToken');
        selectedCardToken = this.$el.find('.selected .token').val();
        if (_.isUndefined(selectedCardToken)) {
          this.$el.find('.activeforget_card_status').html('');
          html = '<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t("Please select a card or add a new card") + '</div>';
          return this.$el.find('.activeforget_card_status').append(html);
        } else if (currentSubscriptionId === 'DefaultFree') {
          this.$el.find('.activeforget_card_status').empty();
          html = '<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t("You are currently subscribed to a free plan. Please change to a paid plan to set an active credit card.") + '</div>';
          return this.$el.find('.activeforget_card_status').append(html);
        } else {
          this.$el.find('.active_card_loader').show();
          return this.trigger("set:active:credit:card", currentSubscriptionId, selectedCardToken);
        }
      };

      CreditCardListView.prototype.deleteCard = function(e) {
        var currentSubscriptionId, html, selectedCardToken;
        e.preventDefault();
        currentSubscriptionId = this.model.get('id');
        selectedCardToken = this.$el.find('.selected .token').val();
        if (_.isUndefined(selectedCardToken)) {
          this.$el.find('.activeforget_card_status').html('');
          html = '<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t("Please select a card") + '</div>';
          return this.$el.find('.activeforget_card_status').append(html);
        } else {
          this.$el.find('.forget_card_loader').show();
          return this.trigger("delete:credit:card", currentSubscriptionId, selectedCardToken);
        }
      };

      CreditCardListView.prototype.onAddCreditCardSuccess = function() {
        var currentSubscriptionId, html, successMsg;
        currentSubscriptionId = this.model.get('id');
        if (currentSubscriptionId === 'DefaultFree' || _.isUndefined(this.model.get('paymentMethodToken'))) {
          successMsg = _.polyglot.t("Card Added Successfully.");
        } else {
          successMsg = _.polyglot.t("Card Added Successfully. However this card will not be used for billing. If you want this card to be used for billing simply change your active card by selecting a card and clicking on 'Set as Active'.");
        }
        this.$el.find('#add-new-credit-card input').val('');
        this.$el.find('.addcard_status').empty();
        this.$el.find('.addcard_loader').hide();
        html = '<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + successMsg + '</div>';
        return this.$el.find('.addcard_status').append(html);
      };

      CreditCardListView.prototype.onAddCreditCardError = function(errorMsg) {
        var html;
        this.$el.find('.addcard_status').empty();
        this.$el.find('.addcard_loader').hide();
        html = "<div class='alert alert-error'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> " + errorMsg + " </div>";
        return this.$el.find('.addcard_status').append(html);
      };

      CreditCardListView.prototype.onSetActiveCreditCardSuccess = function(token) {
        var activeCardClass, html;
        activeCardClass = ".singlecard-" + token;
        this.$el.find('.single-card').removeClass('active');
        this.$el.find(activeCardClass).addClass('active').parents('div').siblings().find('.single-card').removeClass("active");
        this.$el.find('.activeforget_card_status').empty();
        this.$el.find('.active_card_loader').hide();
        html = '<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t("Card successfully set as the active credit card") + '</div>';
        return this.$el.find('.activeforget_card_status').append(html);
      };

      CreditCardListView.prototype.onSetActiveCreditCardError = function(errorMsg) {
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
