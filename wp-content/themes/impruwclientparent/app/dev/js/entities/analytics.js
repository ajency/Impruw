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
      getAllAnalyticsCollection: function(start, end) {
        var analyticsCollection;
        analyticsCollection = App.request("get:collection", "analyticscollection");
        if (start >= analyticsCollection.startDate) {
          return analyticsCollection;
        } else {
          analyticsCollection = API.fetchAnalytics(start, analyticsCollection.startDate);
          App.execute("reload:overview:chart", start, end);
          return analyticsCollection;
        }
      },
      getAnalyticsCollectionByDate: function(startDate, endDate) {
        var analyticsArray, analyticsCollection;
        analyticsCollection = App.request("get:collection", 'analyticscollection');
        console.log(startDate + "     " + endDate);
        analyticsArray = analyticsCollection.filter(function(analytics) {
          return analytics.id >= startDate && analytics.id <= endDate;
        });
        return analyticsArray;
      },
      getMissingDataForDateRange: function(startDate, endDate) {
        var analyticsCollection, end, start;
        analyticsCollection = App.request("get:collection", 'analyticscollection');
        start = startDate;
        while (!(start > endDate)) {
          if (analyticsCollection.get(start)) {
            start = start + 86400000;
          } else {
            end = start;
            while (!(end > endDate)) {
              if (!analyticsCollection.get(end)) {
                end = end + 86400000;
              } else {
                end = end - 86400000;
                break;
              }
            }
            analyticsCollection = API.fetchAnalytics(start, end);
            console.log(App.DashboardApp.Statistics.fetchCount);
            console.log(" super fetch for " + start + "   to  " + end);
            start = end + 86400000;
          }
        }
        analyticsCollection = App.request("get:collection", 'analyticscollection');
        return analyticsCollection;
      },
      fetchAnalytics: function(start, end) {
        var analyticsCollection;
        console.log("fetching from " + start + " to " + end);
        analyticsCollection = App.request("get:collection", 'analyticscollection');
        analyticsCollection.url = "" + AJAXURL + "?action=get_analytics_data";
        analyticsCollection.startDate = start;
        analyticsCollection.fetch({
          reset: false,
          remove: false,
          add: true,
          data: {
            metrices: 'ga:visits,ga:visitors,ga:newVisits,ga:pageviews,ga:pageviewsPerVisit,ga:bounces',
            start_date: start,
            end_date: end,
            ids: 81856773
          }
        });
        analyticsCollection.comparator = 'date';
        analyticsCollection.sort();
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
    App.reqres.setHandler("get:all:analytics", function(startDate, endDate) {
      return API.getAllAnalyticsCollection(startDate, endDate);
    });
    return App.reqres.setHandler("get:missing:data", function(startDate, endDate) {
      return API.getMissingDataForDateRange(startDate, endDate);
    });
  });
});
