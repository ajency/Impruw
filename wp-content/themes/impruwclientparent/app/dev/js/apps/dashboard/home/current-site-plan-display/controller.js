var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/dashboard/home/current-site-plan-display/view'], function(App, AppController) {
  return App.module('Dashboard.Home.CurrentSitePlan', function(CurrentSitePlan, App, Backbone, Marionette, $, _) {
    CurrentSitePlan.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.featurePlanModel = App.request("get:active:feature:plan", SITEID['id']);
        return App.execute("when:fetched", this.featurePlanModel, (function(_this) {
          return function() {
            var currentPlanId;
            currentPlanId = _this.featurePlanModel.get('id');
            if (currentPlanId === '1') {
              _this.view = _this.getFreePlanView();
            } else {
              _this.view = _this.getPaidPlanView();
            }
            return _this.show(_this.view, {
              loading: true
            });
          };
        })(this));
      };

      Controller.prototype.getPaidPlanView = function() {
        return new CurrentSitePlan.View.CurrentSitePlanView({
          model: this.featurePlanModel
        });
      };

      Controller.prototype.getFreePlanView = function() {
        return new CurrentSitePlan.View.CurrentFreePlanView({
          model: this.featurePlanModel
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:current:site:plan", function(opts) {
      return new CurrentSitePlan.Controller(opts);
    });
  });
});
