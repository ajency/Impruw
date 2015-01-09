var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/site-credit-cards/views'], function(App, AppController) {
  return App.module('BillingApp.SiteCreditCards', function(SiteCreditCards, App, Backbone, Marionette, $, _) {
    SiteCreditCards.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.deleteCreditCard = __bind(this.deleteCreditCard, this);
        this.setActiveCard = __bind(this.setActiveCard, this);
        this.addCard = __bind(this.addCard, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.siteModel = App.request("get:site:model");
        this.layout = this.getLayout();
        App.vent.trigger("set:active:menu", 'billing');
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            _this.activeSubscriptionModel = App.request("get:active:subscription", SITEID['id']);
            return App.execute("when:fetched", _this.activeSubscriptionModel, function() {
              _this.paymentMethodToken = _this.activeSubscriptionModel.get('paymentMethodToken');
              _this.creditCardCollection = App.request("get:credit:cards");
              return App.execute("when:fetched", _this.creditCardCollection, function() {
                var existingCreditCards;
                _this.braintreeClientToken = _this.creditCardCollection.models[0].get('braintree_client_token');
                existingCreditCards = _this.creditCardCollection.where({
                  card_exists: true
                });
                _this.existingCreditCardsCollection = new Backbone.Collection(existingCreditCards);
                _this.view = _this.getCardListingView();
                _this.listenTo(_this.view, "add:new:credit:card", function(paymentMethodNonce) {
                  return _this.addCard(paymentMethodNonce);
                });
                _this.listenTo(_this.view, "set:active:credit:card", function(currentSubscriptionId, selectedCardToken) {
                  return _this.setActiveCard(currentSubscriptionId, selectedCardToken);
                });
                _this.listenTo(_this.view, "delete:credit:card", function(currentSubscriptionId, selectedCardToken) {
                  return _this.deleteCreditCard(currentSubscriptionId, selectedCardToken);
                });
                return _this.layout.cardListingRegion.show(_this.view);
              });
            });
          };
        })(this));
        return this.show(this.layout, {
          loading: true
        });
      };

      Controller.prototype.getLayout = function() {
        return new SiteCreditCards.View.Layout;
      };

      Controller.prototype.getCardListingView = function() {
        return new SiteCreditCards.View.CreditCardListView({
          collection: this.existingCreditCardsCollection,
          model: this.activeSubscriptionModel,
          paymentMethodToken: this.paymentMethodToken,
          braintreeClientToken: this.braintreeClientToken
        });
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
            var newCreditCard, newCreditCardModel;
            if (response.success === true) {
              newCreditCard = response.new_credit_card;
              newCreditCardModel = App.request("new:credit:card", newCreditCard);
              _this.existingCreditCardsCollection.add(newCreditCardModel);
              _this.creditCardCollection.add(newCreditCardModel);
              return _this.view.triggerMethod("add:credit:card:success");
            } else {
              return _this.view.triggerMethod("add:credit:card:error", response.msg);
            }
          };
        })(this));
      };

      Controller.prototype.setActiveCard = function(currentSubscriptionId, selectedCardToken) {
        var options, postURL;
        postURL = "" + SITEURL + "/api/ajbilling/setActiveCard/" + currentSubscriptionId + "/" + selectedCardToken;
        options = {
          method: 'POST',
          url: postURL
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            if (response.change_card_success === true) {
              return _this.view.triggerMethod("set:active:credit:card:success", selectedCardToken);
            } else {
              return _this.view.triggerMethod("set:active:credit:card:error", response.msg);
            }
          };
        })(this));
      };

      Controller.prototype.deleteCreditCard = function(currentSubscriptionId, selectedCardToken) {
        var options, postURL;
        postURL = "" + SITEURL + "/api/ajbilling/deleteCreditCard/" + currentSubscriptionId + "/" + selectedCardToken;
        options = {
          method: 'POST',
          url: postURL
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            var deleteCardModel, deletedCardToken;
            if (response.success === true) {
              deletedCardToken = response.deleted_token;
              _this.creditCardCollection = App.request("get:credit:cards");
              deleteCardModel = _this.creditCardCollection.get(deletedCardToken);
              _this.creditCardCollection.remove(deleteCardModel);
              _this.existingCreditCardsCollection.remove(deleteCardModel);
              return _this.view.triggerMethod("delete:credit:card:success");
            } else {
              return _this.view.triggerMethod("delete:credit:card:error", response.msg);
            }
          };
        })(this));
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:site:credit:cards:app", function(opts) {
      return new SiteCreditCards.Controller(opts);
    });
  });
});
