var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('DashboardApp.Statistics.SiteAnalytics.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TrafficSingle;
    Views.OverviewChartView = (function(_super) {
      __extends(OverviewChartView, _super);

      function OverviewChartView() {
        return OverviewChartView.__super__.constructor.apply(this, arguments);
      }

      OverviewChartView.prototype.className = 'row';

      OverviewChartView.prototype.template = 'add overview chart markup here';

      OverviewChartView.prototype.onShow = function() {
        var data;
        return data = this.getChartData();
      };

      OverviewChartView.prototype.getChartData = function() {};

      return OverviewChartView;

    })(Marionette.ItemView);
    TrafficSingle = (function(_super) {
      __extends(TrafficSingle, _super);

      function TrafficSingle() {
        return TrafficSingle.__super__.constructor.apply(this, arguments);
      }

      TrafficSingle.prototype.className = '';

      TrafficSingle.prototype.template = 'add single traffic row markup here';

      return TrafficSingle;

    })(Marionette.ItemView);
    return Views.TrafficViewChart = (function(_super) {
      __extends(TrafficViewChart, _super);

      function TrafficViewChart() {
        return TrafficViewChart.__super__.constructor.apply(this, arguments);
      }

      TrafficViewChart.prototype.className = 'row';

      TrafficViewChart.prototype.template = '<add traffic chart markup here';

      TrafficViewChart.prototype.itemView = TrafficSingle;

      TrafficViewChart.prototype.onShow = function() {
        var data;
        return data = this.getChartData();
      };

      TrafficViewChart.prototype.getChartData = function() {};

      return TrafficViewChart;

    })(Marionette.CompositeView);
  });
});
