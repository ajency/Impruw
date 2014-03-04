var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/dashboard/statistics/charts/overview-chart/views'], function(App, AppController) {
  return App.module("DashboardApp.Statistics.OverViewChart", function(OverViewChart, App) {
    var OverViewChartController, data, graphNames;
    this.startWithParent = false;
    data = null;
    graphNames = ['ga:visits', 'ga:visitors', 'ga:newVisits', 'ga:pageviews'];
    OverViewChartController = (function(_super) {
      __extends(OverViewChartController, _super);

      function OverViewChartController() {
        return OverViewChartController.__super__.constructor.apply(this, arguments);
      }

      OverViewChartController.prototype.initialize = function(options) {
        this.layout = this._getLayout();
        this.show(this.layout);
        this.listenTo(this.layout, 'button:clicked', (function(_this) {
          return function(criterion) {
            return _this._renderRegion(criterion);
          };
        })(this));
        return this._renderRegion(graphNames);
      };

      OverViewChartController.prototype._renderRegion = function(requiredGraphs) {
        var graphData;
        graphData = new Array();
        _.each(requiredGraphs, function(graph) {
          var graphArray, graphObject;
          if (graph === "ga:visits") {
            graphArray = new Array();
            _.each(data, function(day) {
              var dailydata;
              dailydata = {};
              dailydata.x = _.first(_.values(_.pick(day, 'date')));
              dailydata.y = parseInt(_.first(_.values(_.pick(day, 'ga:visits'))));
              return graphArray.push(dailydata);
            });
            graphObject = {
              key: 'Visits',
              values: graphArray
            };
            graphData.push(graphObject);
          }
          if (graph === "ga:visitors") {
            graphArray = new Array();
            _.each(data, function(day) {
              var dailydata;
              dailydata = {};
              dailydata.x = _.first(_.values(_.pick(day, 'date')));
              dailydata.y = parseInt(_.first(_.values(_.pick(day, 'ga:visitors'))));
              return graphArray.push(dailydata);
            });
            graphObject = {
              key: 'Unique Visits',
              values: graphArray
            };
            graphData.push(graphObject);
          }
          if (graph === "ga:newVisits") {
            graphArray = new Array();
            _.each(data, function(day) {
              var dailydata;
              dailydata = {};
              dailydata.x = _.first(_.values(_.pick(day, 'date')));
              dailydata.y = parseInt(_.first(_.values(_.pick(day, 'ga:newVisits'))));
              return graphArray.push(dailydata);
            });
            graphObject = {
              key: 'New Visitors',
              values: graphArray
            };
            graphData.push(graphObject);
          }
          if (graph === "ga:pageviews") {
            graphArray = new Array();
            _.each(data, function(day) {
              var dailydata;
              dailydata = {};
              dailydata.x = _.first(_.values(_.pick(day, 'date')));
              dailydata.y = parseInt(_.first(_.values(_.pick(day, 'ga:pageviews'))));
              return graphArray.push(dailydata);
            });
            graphObject = {
              key: 'Page Views',
              values: graphArray
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

      OverViewChartController.prototype._getLayout = function() {
        return new OverViewChart.Views.Layout;
      };

      return OverViewChartController;

    })(AppController);
    return OverViewChart.on('start', function(options) {
      data = options.collection;
      return new OverViewChartController({
        region: options.region
      });
    });
  });
});
