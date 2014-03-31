var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'backbone'], function(App, Backbone) {
  return App.module("Entities.Analytics", function(Analytics, App, Backbone, Marionette, $, _) {
    var API, analyticsCollection;
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
    analyticsCollection = new Analytics.AnalyticsCollection;
    API = {
      getAnalyticsData: function(start, end) {
        var params;
        params = {
          metrices: 'ga:visits,ga:newVisits,ga:visitBounceRate,ga:avgTimeOnSite,ga:uniquePageviews,ga:visitBounceRate,ga:pageviews,ga:pageviewsPerVisit',
          start_date: start,
          end_date: end,
          ids: 81856773
        };
        analyticsCollection.fetch({
          data: params
        });
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
    App.reqres.setHandler("get:weekly:data", function() {
      return API.getWeeklyData();
    });
    return App.reqres.setHandler("get:site:analytics:data", function(start, end) {
      return API.getAnalyticsData(start, end);
    });
  });
});
