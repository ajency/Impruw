var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.BraintreeTransaction", function(BraintreeTransaction, App, Backbone, Marionette, $, _) {
    var API, BraintreeTransactionCollection;
    BraintreeTransaction = (function(_super) {
      __extends(BraintreeTransaction, _super);

      function BraintreeTransaction() {
        return BraintreeTransaction.__super__.constructor.apply(this, arguments);
      }

      BraintreeTransaction.prototype.name = 'braintreetransaction';

      BraintreeTransaction.prototype.idAttribute = 'transaction_id';

      return BraintreeTransaction;

    })(Backbone.Model);
    BraintreeTransactionCollection = (function(_super) {
      __extends(BraintreeTransactionCollection, _super);

      function BraintreeTransactionCollection() {
        return BraintreeTransactionCollection.__super__.constructor.apply(this, arguments);
      }

      BraintreeTransactionCollection.prototype.model = BraintreeTransaction;

      BraintreeTransactionCollection.prototype.url = function() {
        return "" + SITEURL + "/api/ajbilling/braintreeTransactions";
      };

      return BraintreeTransactionCollection;

    })(Backbone.Collection);
    API = {
      getTransactions: function(customerId) {
        var transactionCollection;
        transactionCollection = new BraintreeTransactionCollection;
        transactionCollection.fetch({
          data: {
            'customerID': customerId
          },
          type: "POST"
        });
        return transactionCollection;
      }
    };
    return App.reqres.setHandler("get:customer:transactions", function(customerId) {
      return API.getTransactions(customerId);
    });
  });
});
