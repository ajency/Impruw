var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/payment-page/views'], function(App, AppController) {
  return App.module('BillingApp.Payment', function(Payment, App, Backbone, Marionette, $, _) {
    Payment.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.userPayment = __bind(this.userPayment, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.siteModel = opts.model;
        this.selectedPlanId = opts.planId;
        this.layout = this.getLayout(this.siteModel);
        App.vent.trigger("set:active:menu", 'billing');
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            _this.selectedPlanModel = App.request("get:plan:by:id", _this.selectedPlanId);
            return App.execute("when:fetched", _this.selectedPlanModel, function() {
              return _this.layout.selectedPlanRegion.show(_this.selectedPlan(_this.selectedPlanModel));
            });
          };
        })(this));
        this.listenTo(this.layout, "credit:card:payment", this.userPayment);
        return this.show(this.layout);
      };

      Controller.prototype.userPayment = function(paymentMethodNonce) {
        var options, selectedPlanName;
        selectedPlanName = this.selectedPlanModel.get('plan_name');
        options = {
          method: 'POST',
          url: AJAXURL,
          data: {
            'paymentMethodNonce': paymentMethodNonce,
            'selectedPlanId': this.selectedPlanId,
            'selectedPlanName': selectedPlanName,
            'action': 'make-payment'
          }
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            if (response.code === "OK") {
              return _this.layout.triggerMethod("payment:success");
            } else {
              return _this.layout.triggerMethod("payment:error", response.msg);
            }
          };
        })(this));
      };

      Controller.prototype.getLayout = function(model) {
        return new Payment.View.Layout({
          model: model
        });
      };

      Controller.prototype.selectedPlan = function(selectedPlanModel) {
        return new Payment.View.SelectedPlanView({
          model: selectedPlanModel
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:payment:app", function(opts) {
      return new Payment.Controller(opts);
    });
  });
});
