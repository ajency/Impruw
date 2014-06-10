var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/dashboard/statistics/charts/overview-chart/views'], function(App, AppController) {
  return App.module("DashboardApp.Statistics.OverViewChart", function(OverViewChart, App) {
    var OverViewChartController;
    this.startWithParent = false;
    OverViewChartController = (function(_super) {
      __extends(OverViewChartController, _super);

      function OverViewChartController() {
        return OverViewChartController.__super__.constructor.apply(this, arguments);
      }

      OverViewChartController.prototype.initialize = function(options) {
        this.analyticsCollection = options.collection;
        this.startDate = options.startDate;
        this.endDate = options.endDate;
        this.layout = this._getLayout(this.analyticsCollection);
        this.listenTo(this.layout, 'button:clicked', (function(_this) {
          return function(criterion) {
            return _this._renderRegion(criterion);
          };
        })(this));
        this.listenTo(this.layout, 'show', function() {
          return this._renderRegion(App.DashboardApp.Statistics.graphNames);
        });
        return this.show(this.layout, {
          loading: true
        });
      };

      OverViewChartController.prototype._getLayout = function(analyticsCollection) {
        return new OverViewChart.Views.Layout({
          collection: analyticsCollection
        });
      };

      OverViewChartController.prototype._renderRegion = function(requiredGraphs) {
        var analyticsArray, analyticsJSON, end, graphData, start;
        start = this.startDate;
        end = this.endDate;
        analyticsArray = this.analyticsCollection.filter(function(analytics) {
          return analytics.id >= start && analytics.id <= end;
        });
        analyticsJSON = _.map(analyticsArray, function(analyticsModel) {
          return analyticsModel.toJSON();
        });
        graphData = new Array();
        _.each(requiredGraphs, function(graph) {
          var graphArray, graphObject;
          if (graph === "ga:visits") {
            graphArray = new Array();
            _.each(analyticsJSON, function(day) {
              var dailydata;
              dailydata = {};
              dailydata.x = _.first(_.values(_.pick(day, 'date')));
              dailydata.y = _.first(_.values(_.pick(day, 'ga:visits')));
              return graphArray.push(dailydata);
            });
            graphObject = {
              area: true,
              key: 'Visits',
              values: graphArray,
              color: "red"
            };
            graphData.push(graphObject);
          }
          if (graph === "ga:visitors") {
            graphArray = new Array();
            _.each(analyticsJSON, function(day) {
              var dailydata;
              dailydata = {};
              dailydata.x = _.first(_.values(_.pick(day, 'date')));
              dailydata.y = _.first(_.values(_.pick(day, 'ga:visitors')));
              return graphArray.push(dailydata);
            });
            graphObject = {
              key: 'Unique Visits',
              values: graphArray,
              color: "green"
            };
            graphData.push(graphObject);
          }
          if (graph === "ga:newVisits") {
            graphArray = new Array();
            _.each(analyticsJSON, function(day) {
              var dailydata;
              dailydata = {};
              dailydata.x = _.first(_.values(_.pick(day, 'date')));
              dailydata.y = _.first(_.values(_.pick(day, 'ga:newVisits')));
              return graphArray.push(dailydata);
            });
            graphObject = {
              key: 'New Visitors',
              values: graphArray,
              color: "blue"
            };
            graphData.push(graphObject);
          }
          if (graph === "ga:pageviews") {
            graphArray = new Array();
            _.each(analyticsJSON, function(day) {
              var dailydata;
              dailydata = {};
              dailydata.x = _.first(_.values(_.pick(day, 'date')));
              dailydata.y = _.first(_.values(_.pick(day, 'ga:pageviews')));
              return graphArray.push(dailydata);
            });
            graphObject = {
              key: 'Page Views',
              values: graphArray,
              color: "yellow"
            };
            return graphData.push(graphObject);
          }
        });
        return this.layout.chartRegion.show(this._getChartView(graphData));
      };

      OverViewChartController.prototype._getChartView = function(chartData) {
        return new OverViewChart.Views.Chart({
          data: chartData
        });
      };

      return OverViewChartController;

    })(AppController);
    return App.commands.setHandler("show:overview:chart", function(options) {
      return new OverViewChartController({
        region: options.region,
        collection: options.collection,
        startDate: options.startDate,
        endDate: options.endDate
      });
    });
  });
});
