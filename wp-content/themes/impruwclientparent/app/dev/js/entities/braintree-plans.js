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

      BraintreePlan.prototype.idAttribute = 'id';

      BraintreePlan.prototype.sync = function(method, entity, options) {
        var xhr;
        if (options == null) {
          options = {};
        }
        xhr = window._bsync(method, entity, options);
        if (method === 'read') {
          return entity._fetch = xhr;
        }
      };

      BraintreePlan.prototype.url = function() {
        return "" + SITEURL + "/api/ajbilling/braintreePlans/" + (this.get("id"));
      };

      return BraintreePlan;

    })(Backbone.Model);
    BraintreePlanCollection = (function(_super) {
      __extends(BraintreePlanCollection, _super);

      function BraintreePlanCollection() {
        return BraintreePlanCollection.__super__.constructor.apply(this, arguments);
      }

      BraintreePlanCollection.prototype.model = BraintreePlan;

      return BraintreePlanCollection;

    })(Backbone.Collection);
    API = {
      getBraintreePlansCollection: function() {
        var braintreePlanCollection;
        braintreePlanCollection = new BraintreePlanCollection;
        braintreePlanCollection.fetch();
        return braintreePlanCollection;
      },
      getPlanByPlanId: function(planId) {
        var brainTreePlanModel;
        brainTreePlanModel = new BraintreePlan({
          'id': planId
        });
        brainTreePlanModel.fetch();
        return brainTreePlanModel;
      }
    };
    App.reqres.setHandler("get:braintree:plans", function() {
      return API.getBraintreePlansCollection();
    });
    return App.reqres.setHandler("get:braintreeplan:by:id", function(planId) {
      return API.getPlanByPlanId(planId);
    });
  });
});
