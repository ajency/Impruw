var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/pricing-plans/views'], function(App, AppController) {
  return App.module('BillingApp.PaymentPlans', function(PaymentPlans, App, Backbone, Marionette, $, _) {
    PaymentPlans.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.getView = __bind(this.getView, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var brainTreePlans;
        this.siteModel = App.request("get:site:model");
        brainTreePlans = App.request("get:braintree:plans");
        this.view = this.getView(brainTreePlans);
        App.vent.trigger("set:active:menu", 'billing');
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getView = function(brainTreePlanCollection) {
        return new PaymentPlans.View.PlansView({
          collection: brainTreePlanCollection,
          model: this.siteModel
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:plans:app", function(opts) {
      return new PaymentPlans.Controller(opts);
    });
  });
});
