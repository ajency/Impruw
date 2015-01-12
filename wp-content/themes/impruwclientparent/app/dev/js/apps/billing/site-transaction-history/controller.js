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
            return App.execute("when:fetched", _this.siteModel, function() {
              _this.braintree_customer_id = _this.siteModel.get('braintree_customer_id');
              if (_.isEmpty(_this.braintree_customer_id)) {
                _this.view = _this.getEmptyView();
                return _this.layout.transactionListingRegion.show(_this.view);
              } else {
                _this.transactionCollection = App.request("get:customer:transactions", _this.braintree_customer_id);
                return App.execute("when:fetched", _this.transactionCollection, function() {
                  _this.view = _this.getCardListingView();
                  return _this.layout.transactionListingRegion.show(_this.view);
                });
              }
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
          collection: this.transactionCollection
        });
      };

      Controller.prototype.getEmptyView = function() {
        return new SiteTransactionHistory.View.EmptyView;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:site:transaction:history:app", function(opts) {
      return new SiteTransactionHistory.Controller(opts);
    });
  });
});
