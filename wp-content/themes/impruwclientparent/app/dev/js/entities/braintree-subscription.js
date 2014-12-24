var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.BraintreeSubscription", function(BraintreeSubscription, App, Backbone, Marionette, $, _) {
    var API, SiteBillingPlan;
    SiteBillingPlan = (function(_super) {
      __extends(SiteBillingPlan, _super);

      function SiteBillingPlan() {
        return SiteBillingPlan.__super__.constructor.apply(this, arguments);
      }

      SiteBillingPlan.prototype.name = 'sitebillingplan';

      SiteBillingPlan.prototype.idAttribute = 'object_id';

      SiteBillingPlan.prototype.sync = function(method, entity, options) {
        var xhr;
        if (options == null) {
          options = {};
        }
        xhr = window._bsync(method, entity, options);
        if (method === 'read') {
          return entity._fetch = xhr;
        }
      };

      SiteBillingPlan.prototype.url = function() {
        return SITEURL + '/api/ajbilling/plan/' + this.id + '/site';
      };

      return SiteBillingPlan;

    })(Backbone.Model);
    API = {
      getSiteBillingPlan: function(siteId) {
        var siteBillingPlanModel;
        siteBillingPlanModel = new SiteBillingPlan({
          'object_id': siteId
        });
        siteBillingPlanModel.fetch({
          success: function(model) {
            return siteBillingPlanModel = model;
          }
        });
        return siteBillingPlanModel;
      }
    };
    return App.reqres.setHandler("get:site:billing:plan", function(siteId) {
      return API.getSiteBillingPlan(siteId);
    });
  });
});
