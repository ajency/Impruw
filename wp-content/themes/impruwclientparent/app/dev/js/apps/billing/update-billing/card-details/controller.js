var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/billing/update-billing/templates/noCardView.html'], function(App, AppController, noCardViewTpl) {
  return App.module('BillingApp.CardDetails', function(CardDetails, App, Backbone, Marionette, $, _) {
    var CardsView, NoCardView, SingleCardView;
    CardDetails.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var brainTreeCustomerId, creditCardCollection;
        brainTreeCustomerId = opts.customerId;
        creditCardCollection = App.request("get:credit:cards", brainTreeCustomerId);
        return App.execute("when:fetched", creditCardCollection, (function(_this) {
          return function() {
            var cardExists, creditCardFirstModel;
            creditCardFirstModel = creditCardCollection.at(0);
            cardExists = creditCardFirstModel.get('card_exists');
            if (cardExists === true) {
              _this.view = _this.getCardsView(creditCardCollection);
            } else {
              _this.view = _this.getNoCardView(creditCardFirstModel);
            }
            _this.listenTo(_this.view, "create:customer:with:card", _this.createCustomerWithCard);
            return _this.show(_this.view);
          };
        })(this));
      };

      Controller.prototype.getCardsView = function(creditCardCollection) {
        return new CardsView({
          collection: creditCardCollection
        });
      };

      Controller.prototype.getNoCardView = function(creditCardModel) {
        return new NoCardView({
          model: creditCardModel
        });
      };

      Controller.prototype.createCustomerWithCard = function(paymentMethodNonce) {
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

      NoCardView.prototype.template = noCardViewTpl;

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
              return _this.trigger("create:customer:with:card", nonce);
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
        html = "<div class='alert'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> " + errorMsg + " </div>";
        return this.$el.find('#billingsave_status').append(html);
      };

      return NoCardView;

    })(Marionette.ItemView);
    SingleCardView = (function(_super) {
      __extends(SingleCardView, _super);

      function SingleCardView() {
        return SingleCardView.__super__.constructor.apply(this, arguments);
      }

      SingleCardView.prototype.template = '<div class="col-sm-4"> <div class="single-card form-horizontal"> <div class="ticker"> <span class="glyphicon glyphicon-ok"></span> </div> <h6 class="aj-imp-sub-head-thin">{{card_type}}</h6> <div class="form-group"> <label class="control-label col-sm-5">Name on the Card:</label> <div class="col-sm-7 col-sm-offset-5"> <span class="form-control">{{customer_name}}</span> </div> </div> <div class="form-group"> <label class="control-label col-sm-5">Card Number:</label> <div class="col-sm-7 col-sm-offset-5"> <span class="form-control">{{card_number}}</span> </div> </div> <div class="form-group"> <label class="control-label col-sm-5">CVV:</label> <div class="col-sm-7 col-sm-offset-5"> <span class="form-control">***</span> </div> </div> <div class="form-group"> <label class="control-label col-sm-5">Expires On:</label> <div class="col-sm-7 col-sm-offset-5"> <span class="form-control">{{expiration_date}}</span> </div> </div> </div> </div>';

      return SingleCardView;

    })(Marionette.ItemView);
    CardsView = (function(_super) {
      __extends(CardsView, _super);

      function CardsView() {
        return CardsView.__super__.constructor.apply(this, arguments);
      }

      CardsView.prototype.template = "<div class='card-list row'></div>";

      CardsView.prototype.itemView = SingleCardView;

      CardsView.prototype.itemViewContainer = '.card-list';

      return CardsView;

    })(Marionette.CompositeView);
    return App.commands.setHandler("show:card", function(opts) {
      return new CardDetails.Controller(opts);
    });
  });
});
