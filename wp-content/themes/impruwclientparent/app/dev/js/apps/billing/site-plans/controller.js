var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/site-plans/views'], function(App, AppController) {
  return App.module('BillingApp.SitePaymentPlans', function(SitePaymentPlans, App, Backbone, Marionette, $, _) {
    SitePaymentPlans.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.subscriptionCollection = App.request("get:site:subscriptions");
        this.featurePlanCollection = App.request("get:all:feature:plans");
        this.layout = this.getLayout();
        App.vent.trigger("set:active:menu", 'billing');
        this.show(this.layout, {
          loading: true
        });
        return this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            return App.execute("when:fetched", _this.featurePlanCollection, function() {
              _this.view = _this.getView();
              return _this.layout.viewPlanRegion.show(_this.view);
            });
          };
        })(this));
      };

      Controller.prototype.getLayout = function(model) {
        return new SitePaymentPlans.View.Layout;
      };

      Controller.prototype.getView = function() {
        return new SitePaymentPlans.View.PlansView({
          collection: this.featurePlanCollection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:site:plans:app", function(opts) {
      return new SitePaymentPlans.Controller(opts);
    });
  });
});
