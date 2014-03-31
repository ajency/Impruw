var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('DashboardApp.Statistics.SiteAnalytics.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TrafficEmpty, TrafficSingle;
    Views.OverviewChartView = (function(_super) {
      __extends(OverviewChartView, _super);

      function OverviewChartView() {
        return OverviewChartView.__super__.constructor.apply(this, arguments);
      }

      OverviewChartView.prototype.className = 'row';

      OverviewChartView.prototype.template = '<canvas id="overview-chart" height="400" width="700"></canvas>';

      OverviewChartView.prototype.onShow = function() {
        var chart, ctx, data;
        chart = this.$el.find('#overview-chart').get(0);
        console.log($(chart).parent().width());
        $(chart).attr('width', $(chart).parent().width() - 50);
        data = this.getChartData();
        ctx = chart.getContext("2d");
        return new Chart(ctx).Line(data, {});
      };

      OverviewChartView.prototype.getChartData = function() {
        var data;
        data = {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
            {
              fillColor: "rgba(220,220,220,0.5)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: [65, 59, 90, 81, 56, 55, 40]
            }, {
              fillColor: "rgba(151,187,205,0.5)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              data: [28, 48, 40, 19, 96, 27, 100]
            }
          ]
        };
        return data;
      };

      return OverviewChartView;

    })(Marionette.ItemView);
    TrafficSingle = (function(_super) {
      __extends(TrafficSingle, _super);

      function TrafficSingle() {
        return TrafficSingle.__super__.constructor.apply(this, arguments);
      }

      TrafficSingle.prototype.className = 'sadsdas';

      TrafficSingle.prototype.tagName = 'tr';

      TrafficSingle.prototype.template = '<td>add single traffic row markup here</td>';

      return TrafficSingle;

    })(Marionette.ItemView);
    TrafficEmpty = (function(_super) {
      __extends(TrafficEmpty, _super);

      function TrafficEmpty() {
        return TrafficEmpty.__super__.constructor.apply(this, arguments);
      }

      TrafficEmpty.prototype.className = '';

      TrafficEmpty.prototype.template = '<td colspan="4">no traffic data to display</td>';

      return TrafficEmpty;

    })(Marionette.ItemView);
    return Views.TrafficViewChart = (function(_super) {
      __extends(TrafficViewChart, _super);

      function TrafficViewChart() {
        return TrafficViewChart.__super__.constructor.apply(this, arguments);
      }

      TrafficViewChart.prototype.className = 'row';

      TrafficViewChart.prototype.template = '<h4> All Traffic Data</h4> add traffic chart markup here. <table class="traffic-list"></table>';

      TrafficViewChart.prototype.itemView = TrafficSingle;

      TrafficViewChart.prototype.itemViewContainer = 'table.traffic-list';

      TrafficViewChart.prototype.emptyView = TrafficEmpty;

      TrafficViewChart.prototype.onShow = function() {
        var data;
        return data = this.getChartData();
      };

      TrafficViewChart.prototype.getChartData = function() {};

      return TrafficViewChart;

    })(Marionette.CompositeView);
  });
});
