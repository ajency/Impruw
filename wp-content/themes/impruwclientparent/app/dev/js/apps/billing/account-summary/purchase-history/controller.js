var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/account-summary/purchase-history/views'], function(App, AppController) {
  return App.module('BillingApp.PurchaseHistory', function(PurchaseHistory, App, Backbone, Marionette, $, _) {
    PurchaseHistory.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var transaction;
        transaction = App.request("get:transactions");
        return App.execute("when:fetched", transaction, (function(_this) {
          return function() {
            _this.view = _this.getView(transaction);
            App.vent.trigger("set:active:menu", 'billing');
            return _this.show(_this.view);
          };
        })(this));
      };

      Controller.prototype.getView = function(transaction) {
        return new PurchaseHistory.View.Transaction({
          collection: transaction
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:purchase:history", function(opts) {
      return new PurchaseHistory.Controller(opts);
    });
  });
});
