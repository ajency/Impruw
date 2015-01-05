var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/billing/account-summary/account-plan-info/views'], function(App, AppController) {
  return App.module('BillingApp.AccountPlanInfo', function(AccountPlanInfo, App, Backbone, Marionette, $, _) {
    AccountPlanInfo.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.getView = __bind(this.getView, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var featurePlanModel;
        featurePlanModel = App.request("get:active:feature:plan", SITEID['id']);
        App.vent.trigger("set:active:menu", 'billing');
        return App.execute("when:fetched", featurePlanModel, (function(_this) {
          return function() {
            _this.view = _this.getView(featurePlanModel);
            _this.listenTo(_this.view, "switch:to:free:plan", _this.changeToFreePlan);
            return _this.show(_this.view, {
              loading: true
            });
          };
        })(this));
      };

      Controller.prototype.getView = function(featurePlanModel) {
        return new AccountPlanInfo.View.AccountPlanInfoView({
          model: featurePlanModel
        });
      };

      Controller.prototype.changeToFreePlan = function() {
        var options, postURL;
        postURL = "" + SITEURL + "/api/ajbilling/defaultPlan/" + SITEID["id"] + "/site";
        options = {
          method: 'PUT',
          url: postURL
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            if (response.success === true) {
              Marionette.triggerMethod.call(_this.region, "load:subscription:info:app");
              return _this.view.triggerMethod("cancel:subscription:success");
            } else {
              return _this.view.triggerMethod("cancel:subscription:error", response.msg);
            }
          };
        })(this));
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:account:plan:info", function(opts) {
      return new AccountPlanInfo.Controller(opts);
    });
  });
});
