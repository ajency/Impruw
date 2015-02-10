var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/account-summary/assisted-setup-info/views'], function(App, AppController) {
  return App.module('BillingApp.AssistedSetupInfo', function(AssistedSetupInfo, App, Backbone, Marionette, $, _) {
    AssistedSetupInfo.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.siteModel = App.request("get:site:model");
        return App.execute("when:fetched", this.siteModel, (function(_this) {
          return function() {
            _this.assistedSetupPlanId = _this.siteModel.get('assistedSetUpPlanId');
            _this.assistedSetUpTransactionId = _this.siteModel.get('braintree_assisted_setup');
            App.vent.trigger("set:active:menu", 'billing');
            if (_this.assistedSetUpTransactionId === "") {
              _this.view = _this.getView();
            } else {
              _this.view = _this.getPaidView();
            }
            return _this.show(_this.view, {
              loading: true
            });
          };
        })(this));
      };

      Controller.prototype.getView = function() {
        return new AssistedSetupInfo.View.AssistedSetupInfoView({
          assistedSetupPlanId: this.assistedSetupPlanId
        });
      };

      Controller.prototype.getPaidView = function() {
        return new AssistedSetupInfo.View.AssistedSetupPaidInfoView({
          assistedSetupPlanId: this.assistedSetupPlanId,
          assistedSetUpTransactionId: this.assistedSetUpTransactionId
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:assisted:setup:info", function(opts) {
      return new AssistedSetupInfo.Controller(opts);
    });
  });
});
