var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.BraintreecreditCard", function(BraintreecreditCard, App, Backbone, Marionette, $, _) {
    var API, CreditCard, CreditCardCollection;
    CreditCard = (function(_super) {
      __extends(CreditCard, _super);

      function CreditCard() {
        return CreditCard.__super__.constructor.apply(this, arguments);
      }

      CreditCard.prototype.name = 'creditcard';

      CreditCard.prototype.idAttribute = 'token';

      return CreditCard;

    })(Backbone.Model);
    CreditCardCollection = (function(_super) {
      __extends(CreditCardCollection, _super);

      function CreditCardCollection() {
        return CreditCardCollection.__super__.constructor.apply(this, arguments);
      }

      CreditCardCollection.prototype.model = CreditCard;

      CreditCardCollection.prototype.url = function() {
        return "" + SITEURL + "/api/ajbilling/creditcards/" + SITEID["id"] + "/site";
      };

      return CreditCardCollection;

    })(Backbone.Collection);
    API = {
      getCreditCards: function() {
        var creditCardCollection;
        creditCardCollection = new CreditCardCollection;
        creditCardCollection.fetch();
        return creditCardCollection;
      },
      newCreditCard: function(newCard) {
        var creditCardModel;
        creditCardModel = new CreditCard(newCard);
        return creditCardModel;
      }
    };
    App.reqres.setHandler("get:credit:cards", function() {
      return API.getCreditCards();
    });
    return App.reqres.setHandler("new:credit:card", function(newCard) {
      return API.newCreditCard(newCard);
    });
  });
});
