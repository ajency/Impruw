var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'backbone'], function(App, Backbone) {
  return App.module("Entities.Analytics", function(Analytics, App, Backbone, Marionette, $, _) {
    var API, AnalyticsCollection, AnalyticsModel, overViewAnalytics, trafficAnalytics, weeklyAnalytics;
    AnalyticsModel = (function(_super) {
      __extends(AnalyticsModel, _super);

      function AnalyticsModel() {
        return AnalyticsModel.__super__.constructor.apply(this, arguments);
      }

      AnalyticsModel.prototype.parse = function(resp) {
        return resp;
      };

      return AnalyticsModel;

    })(Backbone.Model);
    AnalyticsCollection = (function(_super) {
      __extends(AnalyticsCollection, _super);

      function AnalyticsCollection() {
        return AnalyticsCollection.__super__.constructor.apply(this, arguments);
      }

      AnalyticsCollection.prototype.model = AnalyticsModel;

      AnalyticsCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=get_analytics_data";
      };

      return AnalyticsCollection;

    })(Backbone.Collection);
    weeklyAnalytics = new AnalyticsCollection;
    weeklyAnalytics.comparator = 'date';
    overViewAnalytics = new AnalyticsCollection;
    trafficAnalytics = new AnalyticsCollection;
    API = {
      getWeeklyAnalyticsData: function() {
        var date, endDate, metrices, startDate;
        date = new Date();
        endDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        startDate = endDate - (7 * 86400000);
        metrices = 'ga:newVisits,ga:visits,ga:visitBounceRate,ga:pageviews,ga:pageviewsPerVisit,ga:uniquePageviews,ga:visitors,ga:timeOnSite';
        weeklyAnalytics.fetch({
          reset: true,
          data: {
            start_date: startDate,
            end_date: endDate,
            metrices: metrices,
            ids: 81856773
          }
        });
        return weeklyAnalytics;
      },
      getAnalyticsData: function() {}
    };
    App.reqres.setHandler("get:weekly:data", function() {
      return API.getWeeklyAnalyticsData();
    });
    return App.reqres.setHandler("get:site:analytics:data", function(startDate, endDate) {
      return API.getAnalyticsData(startDate, endDate);
    });
  });
});
