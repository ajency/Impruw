var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/billing/update-billing/templates/cardView.html'], function(App, AppController, viewTpl) {
  return App.module('BillingApp.CardDetails', function(CardDetails, App, Backbone, Marionette, $, _) {
    var CardView, NoCardView;
    CardDetails.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var brainTreeCustomerId, creditCardModel;
        brainTreeCustomerId = opts.customerId;
        creditCardModel = App.request("get:card:info", brainTreeCustomerId);
        return App.execute("when:fetched", creditCardModel, (function(_this) {
          return function() {
            var cardExists;
            cardExists = creditCardModel.get('card_exists');
            if (cardExists === true) {
              _this.view = _this.getCardView(creditCardModel);
            } else {
              _this.view = _this.getNoCardView(creditCardModel);
            }
            _this.listenTo(_this.view, "add:card:to:customer", _this.addCardToCustomer);
            return _this.show(_this.view);
          };
        })(this));
      };

      Controller.prototype.getCardView = function(creditCardModel) {
        return new CardView({
          model: creditCardModel
        });
      };

      Controller.prototype.getNoCardView = function(creditCardModel) {
        return new NoCardView({
          model: creditCardModel
        });
      };

      Controller.prototype.addCardToCustomer = function(paymentMethodNonce) {
        var options;
        options = {
          method: 'POST',
          url: AJAXURL,
          data: {
            'paymentMethodNonce': paymentMethodNonce,
            'action': 'create-customer-with-card'
          }
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            if (response.code === "OK") {
              return _this.view.triggerMethod("card:success");
            } else {
              return _this.view.triggerMethod("card:error", response.msg);
            }
          };
        })(this));
      };

      return Controller;

    })(AppController);
    NoCardView = (function(_super) {
      __extends(NoCardView, _super);

      function NoCardView() {
        return NoCardView.__super__.constructor.apply(this, arguments);
      }

      NoCardView.prototype.template = viewTpl;

      NoCardView.prototype.onShow = function() {
        return this.$el.find('select').selectpicker();
      };

      NoCardView.prototype.serializeData = function() {
        var data;
        data = NoCardView.__super__.serializeData.call(this);
        data.THEMEURL = THEMEURL;
        return data;
      };

      NoCardView.prototype.events = {
        'click #btn-add': function() {
          var cardNumber, client, clientToken, cvv, expMonth, expYear, nameOnCard;
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
              return _this.trigger("add:card:to:customer", nonce);
            };
          })(this));
        }
      };

      NoCardView.prototype.onCardSuccess = function() {
        var html;
        this.$el.find('#billingsave_status').empty();
        this.$el.find('#pay_loader').hide();
        html = '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"> &times; </button> Payment Processed';
        this.$el.find('#billingsave_status').append(html);
        return this.$el.find('#btn-reset').click();
      };

      NoCardView.prototype.onCardError = function(errorMsg) {
        var html;
        this.$el.find('#billingsave_status').empty();
        this.$el.find('#pay_loader').hide();
        html = "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> " + errorMsg;
        return this.$el.find('#billingsave_status').append(html);
      };

      return NoCardView;

    })(Marionette.ItemView);
    CardView = (function(_super) {
      __extends(CardView, _super);

      function CardView() {
        return CardView.__super__.constructor.apply(this, arguments);
      }

      CardView.prototype.template = '<div class=""> <label class="">Name on the Card</label> <div class=""> <span>{{customer_name}}</span> </div> </div> <div class=""> <label class="">Card Number</label> <div class=""> <span>{{card_number}}</span> </div> </div> <div class=""> <label class="">CVV</label> <div class=""> <span>***</span> </div> </div> <div class=""> <label class="">Expires On</label> <div class=""> <span>{{expiration_date}}</span> </div> </div>';

      return CardView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:card", function(opts) {
      return new CardDetails.Controller(opts);
    });
  });
});
