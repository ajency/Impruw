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
            return App.execute("when:fetched", _this.subscriptionCollection, function() {
              var currentSubscriptionModel;
              currentSubscriptionModel = _this.subscriptionCollection.at(0);
              _this.currentSubscriptionStatus = currentSubscriptionModel.get('subscription_status');
              _this.currentSubscriptionPrice = currentSubscriptionModel.get('price');
              return App.execute("when:fetched", _this.featurePlanCollection, function() {
                _this.view = _this.getView();
                _this.listenTo(_this.view, "switch:to:free:plan", _this.changeToFreePlan);
                return _this.layout.viewPlanRegion.show(_this.view);
              });
            });
          };
        })(this));
      };

      Controller.prototype.getLayout = function(model) {
        return new SitePaymentPlans.View.Layout;
      };

      Controller.prototype.getView = function() {
        return new SitePaymentPlans.View.PlansView({
          collection: this.featurePlanCollection,
          currentSubscriptionStatus: this.currentSubscriptionStatus,
          currentSubscriptionPrice: this.currentSubscriptionPrice
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
            return console.log(response);
          };
        })(this));
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:site:plans:app", function(opts) {
      return new SitePaymentPlans.Controller(opts);
    });
  });
});
