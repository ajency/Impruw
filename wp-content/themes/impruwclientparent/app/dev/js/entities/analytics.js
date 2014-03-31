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

      AnalyticsModel.prototype.parse = function(resp) {
        resp['ga:avgTimeOnSite'] = resp['ga:avgTimeOnSite'].toFixed(2);
        resp['ga:pageviewsPerVisit'] = resp['ga:pageviewsPerVisit'].toFixed(2);
        resp['ga:visitBounceRate'] = resp['ga:visitBounceRate'].toFixed(2);
        return resp;
      };

      return AnalyticsModel;

    })(Backbone.Model);
    Analytics.AnalyticsCollection = (function(_super) {
      __extends(AnalyticsCollection, _super);

      function AnalyticsCollection() {
        return AnalyticsCollection.__super__.constructor.apply(this, arguments);
      }

      AnalyticsCollection.prototype.model = Analytics.AnalyticsModel;

      AnalyticsCollection.prototype.comparator = function(model) {
        return -model.get('date');
      };

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
            metrices: 'ga:visits,ga:visitBounceRate,ga:avgTimeOnSite,ga:uniquePageviews,ga:visitBounceRate,ga:avgTimeOnSite,ga:visitors,ga:newVisits,ga:pageviews,ga:pageviewsPerVisit,ga:bounces',
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
        var collection, date, endDate, params, startDate;
        collection = new Analytics.AnalyticsCollection;
        date = new Date();
        endDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        startDate = endDate - 7 * 86400000;
        params = {
          metrices: 'ga:visits,ga:newVisits,ga:visitBounceRate,ga:avgTimeOnSite,ga:uniquePageviews,ga:visitBounceRate,ga:pageviews,ga:pageviewsPerVisit',
          start_date: startDate,
          end_date: endDate,
          ids: 81856773
        };
        collection.fetch({
          data: params
        });
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
