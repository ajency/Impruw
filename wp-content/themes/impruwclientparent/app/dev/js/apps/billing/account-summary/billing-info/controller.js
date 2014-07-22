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
        var brainTreeCustomerId, cardExists, creditCardModel, siteModel;
        siteModel = opts.model;
        brainTreeCustomerId = siteModel.get('braintree_customer_id');
        creditCardModel = App.request("get:card:info", brainTreeCustomerId);
        cardExists = creditCardModel.get('card_exists');
        if (cardExists === true) {
          this.view = this.getView(creditCardModel);
        } else {
          this.view = this.getEmptyCardView();
        }
        App.vent.trigger("set:active:menu", 'billing');
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getEmptyCardView = function() {
        return new BillingInfo.View.EmptyBillingInfoView;
      };

      Controller.prototype.getView = function(subscriptionModel) {
        return new BillingInfo.View.BillingInfoView({
          model: subscriptionModel,
          activationDate: this.activationDate
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:billing:info", function(opts) {
      return new BillingInfo.Controller(opts);
    });
  });
});
