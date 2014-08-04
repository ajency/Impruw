var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.BraintreePlans", function(BraintreePlans, App, Backbone, Marionette, $, _) {
    var API, BraintreePlan, BraintreePlanCollection;
    BraintreePlan = (function(_super) {
      __extends(BraintreePlan, _super);

      function BraintreePlan() {
        return BraintreePlan.__super__.constructor.apply(this, arguments);
      }

      BraintreePlan.prototype.name = 'braintreeplan';

      BraintreePlan.prototype.idAttribute = 'plan_id';

      return BraintreePlan;

    })(Backbone.Model);
    BraintreePlanCollection = (function(_super) {
      __extends(BraintreePlanCollection, _super);

      function BraintreePlanCollection() {
        return BraintreePlanCollection.__super__.constructor.apply(this, arguments);
      }

      BraintreePlanCollection.prototype.model = BraintreePlan;

      BraintreePlanCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=get-braintree-plans";
      };

      return BraintreePlanCollection;

    })(Backbone.Collection);
    API = {
      getBraintreePlansCollection: function() {
        var planCollection;
        planCollection = new BraintreePlanCollection;
        planCollection.fetch();
        return planCollection;
      },
      getPlanByPlanId: function(planId) {
        var planModel;
        planModel = new BraintreePlan({
          'plan_id': planId
        });
        planModel.fetch();
        return planModel;
      }
    };
    App.reqres.setHandler("get:braintree:plans", function() {
      return API.getBraintreePlansCollection();
    });
    return App.reqres.setHandler("get:plan:by:id", function(planId) {
      return API.getPlanByPlanId(planId);
    });
  });
});
