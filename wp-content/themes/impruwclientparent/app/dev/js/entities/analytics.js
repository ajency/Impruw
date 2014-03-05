var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'backbone'], function(App, Backbone) {
  return App.module("Entities.Analytics", function(Analytics, App, Backbone, Marionette, $, _) {
    var API;
    Analytics.AnalyticsModel = (function(_super) {
      __extends(AnalyticsModel, _super);

      function AnalyticsModel() {
        return AnalyticsModel.__super__.constructor.apply(this, arguments);
      }

      AnalyticsModel.prototype.idAttribute = 'date';

      return AnalyticsModel;

    })(Backbone.Model);
    Analytics.AnalyticsCollection = (function(_super) {
      __extends(AnalyticsCollection, _super);

      function AnalyticsCollection() {
        return AnalyticsCollection.__super__.constructor.apply(this, arguments);
      }

      AnalyticsCollection.prototype.startDate = Date.parse(new Date().toDateString());

      AnalyticsCollection.prototype.endDate = Date.parse(new Date().toDateString());

      AnalyticsCollection.prototype.model = Analytics.AnalyticsModel;

      return AnalyticsCollection;

    })(Backbone.Collection);
    API = {
      createStoreCollection: function() {
        var analyticsCollection;
        analyticsCollection = new Analytics.AnalyticsCollection;
        return App.request("set:collection", 'analyticscollection', analyticsCollection);
      },
      getAnalyticsCollection: function() {
        var analyticsCollection;
        analyticsCollection = App.request("get:collection", "analyticscollection");
        return analyticsCollection;
      },
      getAnalyticsCollectionByDate: function(start, end) {
        var analyticsCollection;
        analyticsCollection = App.request("get:collection", 'analyticscollection');
        if (start >= analyticsCollection.startDate) {
          return analyticsCollection.filter(function(analytics) {
            return analytics.id >= start && analytics.id <= end;
          });
        }
      },
      fetchAnalytics: function(start, end) {
        var analyticsCollection;
        analyticsCollection = App.request("get:collection", 'analyticscollection');
        analyticsCollection.url = "" + AJAXURL + "?action=get_analytics_data";
        analyticsCollection.startDate = start;
        analyticsCollection.fetch({
          data: {
            metrices: 'ga:visits,ga:visitors,ga:newVisits,ga:pageviews,ga:pageviewsPerVisit,ga:bounces',
            start_date: start,
            end_date: end,
            ids: 81856773
          }
        });
        return analyticsCollection;
      }
    };
    App.commands.setHandler("create:analytics:store", function() {
      console.log("collection init");
      return API.createStoreCollection();
    });
    App.reqres.setHandler("get:analytics:by:date", function(startDate, endDate) {
      return API.getAnalyticsCollectionByDate(startDate, endDate);
    });
    App.reqres.setHandler("fetch:analytics", function(startDate, endDate) {
      return API.fetchAnalytics(startDate, endDate);
    });
    return App.reqres.setHandler("get:analytics", function() {
      return API.getAnalyticsCollection();
    });
  });
});
