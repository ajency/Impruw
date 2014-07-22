var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.BraintreeTransaction", function(BraintreeTransaction, App, Backbone, Marionette, $, _) {
    var API, BraintreePlanCollection;
    BraintreeTransaction = (function(_super) {
      __extends(BraintreeTransaction, _super);

      function BraintreeTransaction() {
        return BraintreeTransaction.__super__.constructor.apply(this, arguments);
      }

      BraintreeTransaction.prototype.name = 'braintreetransaction';

      BraintreeTransaction.prototype.idAttribute = 'transaction_id';

      return BraintreeTransaction;

    })(Backbone.Model);
    BraintreePlanCollection = (function(_super) {
      __extends(BraintreePlanCollection, _super);

      function BraintreePlanCollection() {
        return BraintreePlanCollection.__super__.constructor.apply(this, arguments);
      }

      BraintreePlanCollection.prototype.model = BraintreeTransaction;

      BraintreePlanCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=fetch-braintreetransaction";
      };

      return BraintreePlanCollection;

    })(Backbone.Collection);
    API = {
      getTransactions: function() {
        var transactionCollection;
        transactionCollection = new BraintreePlanCollection;
        transactionCollection.fetch();
        return transactionCollection;
      }
    };
    return App.reqres.setHandler("get:transactions", function() {
      return API.getTransactions();
    });
  });
});
