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
        this.sitePlanCollection = App.request("get:all:billing:plans");
        return App.execute("when:fetched", this.sitePlanCollection, (function(_this) {
          return function() {
            _this.view = _this.getView();
            App.vent.trigger("set:active:menu", 'billing');
            return _this.show(_this.view, {
              loading: true
            });
          };
        })(this));
      };

      Controller.prototype.getView = function() {
        return new SitePaymentPlans.View.PlansView({
          collection: this.sitePlanCollection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:site:plans:app", function(opts) {
      return new SitePaymentPlans.Controller(opts);
    });
  });
});
