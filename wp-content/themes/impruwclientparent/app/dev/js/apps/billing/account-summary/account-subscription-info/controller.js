var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/account-summary/account-subscription-info/views'], function(App, AppController) {
  return App.module('BillingApp.AccountSubscriptionInfo', function(AccountSubscriptionInfo, App, Backbone, Marionette, $, _) {
    AccountSubscriptionInfo.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.getView = __bind(this.getView, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var activeSubscriptionModel;
        activeSubscriptionModel = App.request("get:active:subscription", SITEID['id']);
        App.vent.trigger("set:active:menu", 'billing');
        return App.execute("when:fetched", activeSubscriptionModel, (function(_this) {
          return function() {
            _this.view = _this.getView(activeSubscriptionModel);
            return _this.show(_this.view, {
              loading: true
            });
          };
        })(this));
      };

      Controller.prototype.getView = function(activeSubscriptionModel) {
        return new AccountSubscriptionInfo.View.AccountSubscriptionInfoView({
          model: activeSubscriptionModel
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:account:subscription:info", function(opts) {
      return new AccountSubscriptionInfo.Controller(opts);
    });
  });
});
