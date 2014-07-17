var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/pricing-plans/views'], function(App, AppController) {
  return App.module('BillingApp.PaymentPlans', function(PaymentPlans, App, Backbone, Marionette, $, _) {
    PaymentPlans.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.view = this.getView();
        this.brainTreePlans = App.request("get:braintree:plans");
        console.log(this.brainTreePlans);
        App.vent.trigger("set:active:menu", 'billing');
        return this.show(this.view);
      };

      Controller.prototype.getView = function() {
        return new PaymentPlans.View.Layout;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:plans:app", function(opts) {
      return new PaymentPlans.Controller(opts);
    });
  });
});
