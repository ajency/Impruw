var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.SiteFeaturePlans", function(SiteFeaturePlans, App, Backbone, Marionette, $, _) {
    var API, SiteFeaturePlan, SiteFeaturePlanCollection, siteFeaturePlanCollection;
    SiteFeaturePlan = (function(_super) {
      __extends(SiteFeaturePlan, _super);

      function SiteFeaturePlan() {
        return SiteFeaturePlan.__super__.constructor.apply(this, arguments);
      }

      SiteFeaturePlan.prototype.name = 'sitefeatureplan';

      SiteFeaturePlan.prototype.idAttribute = 'id';

      SiteFeaturePlan.prototype.sync = function(method, entity, options) {
        var xhr;
        if (options == null) {
          options = {};
        }
        xhr = window._bsync(method, entity, options);
        if (method === 'read') {
          return entity._fetch = xhr;
        }
      };

      SiteFeaturePlan.prototype.url = function() {
        return "" + SITEURL + "/api/ajbilling/featureplan/" + (this.get("object_id")) + "/site";
      };

      return SiteFeaturePlan;

    })(Backbone.Model);
    SiteFeaturePlanCollection = (function(_super) {
      __extends(SiteFeaturePlanCollection, _super);

      function SiteFeaturePlanCollection() {
        return SiteFeaturePlanCollection.__super__.constructor.apply(this, arguments);
      }

      SiteFeaturePlanCollection.prototype.model = SiteFeaturePlan;

      SiteFeaturePlanCollection.prototype.url = function() {
        return "" + SITEURL + "/api/ajbilling/featureplans/" + SITEID["id"] + "/site";
      };

      return SiteFeaturePlanCollection;

    })(Backbone.Collection);
    siteFeaturePlanCollection = new SiteFeaturePlanCollection;
    API = {
      getActiveFeaturePlan: function(siteId) {
        var activeFeaturePlanModel;
        activeFeaturePlanModel = new SiteFeaturePlan({
          'object_id': SITEID["id"]
        });
        activeFeaturePlanModel.fetch();
        return activeFeaturePlanModel;
      },
      getSiteFeaturePlanCollection: function() {
        if (siteFeaturePlanCollection.length === 0) {
          siteFeaturePlanCollection.fetch();
        }
        return siteFeaturePlanCollection;
      }
    };
    App.reqres.setHandler("get:active:feature:plan", function(siteId) {
      return API.getActiveFeaturePlan(siteId);
    });
    return App.reqres.setHandler("get:all:feature:plans", function() {
      return API.getSiteFeaturePlanCollection();
    });
  });
});
