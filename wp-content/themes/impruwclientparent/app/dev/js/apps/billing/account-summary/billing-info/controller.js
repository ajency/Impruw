var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/account-summary/billing-info/views'], function(App, AppController) {
  return App.module('BillingApp.BillingInfo', function(BillingInfo, App, Backbone, Marionette, $, _) {
    BillingInfo.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var subscriptionModel;
        subscriptionModel = opts.subscriptionModel;
        return App.execute("when:fetched", subscriptionModel, (function(_this) {
          return function() {
            var creditCardModel, creditCardToken;
            creditCardToken = subscriptionModel.get('payment_method_token');
            if (_.isEmpty(creditCardToken)) {
              _this.view = _this.getEmptyCardView();
            } else {
              creditCardModel = App.request("get:card:info", creditCardToken);
              _this.view = _this.getView(creditCardModel);
            }
            return _this.show(_this.view, {
              loading: true
            });
          };
        })(this));
      };

      Controller.prototype.getEmptyCardView = function() {
        return new BillingInfo.View.EmptyBillingInfoView;
      };

      Controller.prototype.getView = function(creditCardModel) {
        return new BillingInfo.View.BillingInfoView({
          model: creditCardModel
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:billing:info", function(opts) {
      return new BillingInfo.Controller(opts);
    });
  });
});
