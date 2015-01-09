var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/site-transaction-history/views'], function(App, AppController) {
  return App.module('BillingApp.SiteTransactionHistory', function(SiteTransactionHistory, App, Backbone, Marionette, $, _) {
    SiteTransactionHistory.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.siteModel = App.request("get:site:model");
        this.layout = this.getLayout();
        App.vent.trigger("set:active:menu", 'billing');
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            _this.creditCardCollection = App.request("get:credit:cards");
            return App.execute("when:fetched", _this.creditCardCollection, function() {
              var existingCreditCards;
              _this.braintreeClientToken = _this.creditCardCollection.models[0].get('braintree_client_token');
              existingCreditCards = _this.creditCardCollection.where({
                card_exists: true
              });
              _this.existingCreditCardsCollection = new Backbone.Collection(existingCreditCards);
              _this.view = _this.getCardListingView();
              return _this.layout.transactionListingRegion.show(_this.view);
            });
          };
        })(this));
        return this.show(this.layout, {
          loading: true
        });
      };

      Controller.prototype.getLayout = function() {
        return new SiteTransactionHistory.View.Layout;
      };

      Controller.prototype.getCardListingView = function() {
        return new SiteTransactionHistory.View.TransactionListView({
          collection: this.existingCreditCardsCollection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:site:transaction:history:app", function(opts) {
      return new SiteTransactionHistory.Controller(opts);
    });
  });
});
