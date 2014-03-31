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

      AnalyticsCollection.prototype.model = Analytics.AnalyticsModel;

      AnalyticsCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=get_analytics_data";
      };

      return AnalyticsCollection;

    })(Backbone.Collection);
    API = {
      createStoreCollection: function() {
        var analyticsCollection;
        analyticsCollection = new Analytics.AnalyticsCollection;
        return App.request("set:collection", 'analyticscollection', analyticsCollection);
      },
      getAllAnalyticsCollection: function() {
        var analyticsCollection;
        analyticsCollection = App.request("get:collection", "analyticscollection");
        return analyticsCollection;
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
            start = end + 86400000;
          }
        }
        return analyticsCollection;
      },
      fetchAnalytics: function(start, end) {
        var analyticsCollection;
        analyticsCollection = App.request("get:collection", 'analyticscollection');
        analyticsCollection.url = "" + AJAXURL + "?action=get_analytics_data";
        analyticsCollection.fetch({
          reset: false,
          remove: false,
          add: true,
          data: {
            metrices: 'ga:visits,ga:visitors,ga:newVisits,ga:pageviews,ga:pageviewsPerVisit,ga:bounces',
            start_date: start,
            end_date: end,
            ids: 81856773
          },
          success: function() {
            return setTimeout(function() {
              console.log("fetched");
              App.execute("refresh:chart");
              return null;
            }, 1000);
          }
        });
        analyticsCollection.comparator = 'date';
        analyticsCollection.sort();
        return analyticsCollection;
      },
      getWeeklyData: function() {
        var collection;
        collection = new Analytics.AnalyticsCollection;
        collection.set([
          {
            "date": 1.39536e+12,
            "ga:visits": 32,
            "ga:visitors": 23,
            "ga:newVisits": 19,
            "ga:pageviews": 173,
            "ga:pageviewsPerVisit": 5.40625,
            "ga:bounces": 9
          }, {
            "date": 1.3954464e+12,
            "ga:visits": 0,
            "ga:visitors": 0,
            "ga:newVisits": 0,
            "ga:pageviews": 0,
            "ga:pageviewsPerVisit": 0,
            "ga:bounces": 0
          }, {
            "date": 1.3955328e+12,
            "ga:visits": 16,
            "ga:visitors": 10,
            "ga:newVisits": 9,
            "ga:pageviews": 97,
            "ga:pageviewsPerVisit": 6.0625,
            "ga:bounces": 7
          }, {
            "date": 1.3956192e+12,
            "ga:visits": 35,
            "ga:visitors": 26,
            "ga:newVisits": 24,
            "ga:pageviews": 169,
            "ga:pageviewsPerVisit": 4.82857142857,
            "ga:bounces": 12
          }, {
            "date": 1.3957056e+12,
            "ga:visits": 16,
            "ga:visitors": 16,
            "ga:newVisits": 14,
            "ga:pageviews": 151,
            "ga:pageviewsPerVisit": 9.4375,
            "ga:bounces": 4
          }, {
            "date": 1.395792e+12,
            "ga:visits": 23,
            "ga:visitors": 22,
            "ga:newVisits": 17,
            "ga:pageviews": 144,
            "ga:pageviewsPerVisit": 6.26086956522,
            "ga:bounces": 2
          }, {
            "date": 1.3958784e+12,
            "ga:visits": 20,
            "ga:visitors": 20,
            "ga:newVisits": 18,
            "ga:pageviews": 74,
            "ga:pageviewsPerVisit": 3.7,
            "ga:bounces": 5
          }, {
            "date": 1.3959648e+12,
            "ga:visits": 19,
            "ga:visitors": 18,
            "ga:newVisits": 16,
            "ga:pageviews": 100,
            "ga:pageviewsPerVisit": 5.26315789474,
            "ga:bounces": 4
          }
        ]);
        return collection;
      }
    };
    App.commands.setHandler("create:analytics:store", function() {
      return API.createStoreCollection();
    });
    App.reqres.setHandler("get:weekly:data", function() {
      return API.getWeeklyData();
    });
    App.reqres.setHandler("fetch:analytics", function(startDate, endDate) {
      return API.fetchAnalytics(startDate, endDate);
    });
    App.reqres.setHandler("get:all:analytics", function() {
      return API.getAllAnalyticsCollection();
    });
    return App.reqres.setHandler("get:missing:data", function(startDate, endDate) {
      return API.getMissingDataForDateRange(startDate, endDate);
    });
  });
});
