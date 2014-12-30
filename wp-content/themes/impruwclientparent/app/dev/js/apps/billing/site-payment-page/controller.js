var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/site-payment-page/views'], function(App, AppController) {
  return App.module('BillingApp.SitePayment', function(SitePayment, App, Backbone, Marionette, $, _) {
    SitePayment.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.siteModel = App.request("get:site:model");
        this.selectedPlanId = opts.planId;
        this.selectedPlanModel = App.request("get:braintreeplan:by:id", this.selectedPlanId);
        this.layout = this.getLayout(this.siteModel);
        App.vent.trigger("set:active:menu", 'billing');
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {};
        })(this));
        return this.show(this.layout, {
          loading: true
        });
      };

      Controller.prototype.getLayout = function(model) {
        return new SitePayment.View.Layout({
          model: model
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:site:payment:app", function(opts) {
      return new SitePayment.Controller(opts);
    });
  });
});
