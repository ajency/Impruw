var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.CreditCard", function(BraintreecreditCard, App, Backbone, Marionette, $, _) {
    var API, BillingAddress, CreditCard, CreditCardCollection;
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
        return "" + AJAXURL + "?action=get-credit-cards";
      };

      return CreditCardCollection;

    })(Backbone.Collection);
    BillingAddress = (function(_super) {
      __extends(BillingAddress, _super);

      function BillingAddress() {
        return BillingAddress.__super__.constructor.apply(this, arguments);
      }

      BillingAddress.prototype.name = 'billingaddress';

      BillingAddress.prototype.idAttribute = 'customerId';

      return BillingAddress;

    })(Backbone.Model);
    API = {
      getCardById: function(customerId) {
        var creditCardModel;
        creditCardModel = new CreditCard({
          'customer_id': customerId
        });
        creditCardModel.fetch();
        return creditCardModel;
      },
      getBillingAddress: function(customerId) {
        var BillingAddressModel;
        BillingAddressModel = new BillingAddress({
          'customerId': customerId
        });
        BillingAddressModel.fetch();
        return BillingAddressModel;
      },
      getCreditCards: function(customerId) {
        var creditCardCollection;
        creditCardCollection = new CreditCardCollection;
        creditCardCollection.fetch({
          data: {
            'customerId': customerId
          }
        });
        return creditCardCollection;
      }
    };
    App.reqres.setHandler("get:card:info", function(customerId) {
      return API.getCardById(customerId);
    });
    App.reqres.setHandler("get:credit:cards", function(customerId) {
      return API.getCreditCards(customerId);
    });
    return App.reqres.setHandler("get:billing:address", function(customerId) {
      return API.getBillingAddress(customerId);
    });
  });
});
