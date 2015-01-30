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
        this.assistedSetupPlanId = opts.assistedSetupPlanId;
        this.assistedSetUpTransactionId = opts.assistedSetUpTransactionId;
        App.vent.trigger("set:active:menu", 'billing');
        if (this.assistedSetUpTransactionId === "") {
          this.view = this.getView();
        } else {
          this.view = this.getPaidView();
        }
        return this.show(this.view, {
          loading: true
        });
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
