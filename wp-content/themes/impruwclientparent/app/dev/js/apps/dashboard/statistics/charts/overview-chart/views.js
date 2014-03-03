var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/dashboard/statistics/charts/templates/layout.html', 'nvd3', 'd3'], function(App, layoutTmpl) {
  return App.module('DashboardApp.Statistics.OverViewChart.Views', function(Views, App, Backbone, Marionette, $, _) {
    var chartData;
    chartData = null;
    Views.Layout = (function(_super) {
      __extends(Layout, _super);

      function Layout() {
        return Layout.__super__.constructor.apply(this, arguments);
      }

      Layout.prototype.template = layoutTmpl;

      Layout.prototype.regions = {
        chartRegion: '#overview-chart-region'
      };

      Layout.prototype.events = {
        'click input.chart-button': 'changeChart'
      };

      Layout.prototype.changeChart = function() {
        var criterion;
        criterion = new Array();
        $('input.chart-button:checked').each(function() {
          return criterion.push($(this).val());
        });
        return this.trigger("button:clicked", criterion);
      };

      return Layout;

    })(Marionette.Layout);
    return Views.Chart = (function(_super) {
      __extends(Chart, _super);

      function Chart() {
        return Chart.__super__.constructor.apply(this, arguments);
      }

      Chart.prototype.className = 'overview-chart';

      Chart.prototype.template = '<svg style="height:500px; font: 12px sans-serif;"></svg>';

      Chart.prototype.id = 'overview-chart';

      Chart.prototype.initialize = function(options) {
        return chartData = options.data;
      };

      Chart.prototype.onShow = function() {
        console.log(JSON.stringify(chartData));
        return nv.addGraph(function() {
          var chart, myData;
          chart = nv.models.lineWithFocusChart();
          chart.options({
            margin: {
              left: 100
            }
          });
          chart.xAxis.axisLabel("Date (ms)").tickFormat(function(d) {
            return d3.time.format('%x')(new Date(d));
          });
          chart.yAxis.axisLabel("Number (v)").tickFormat(d3.format(".02f"));
          myData = chartData;
          d3.select("#overview-chart svg").datum(myData).call(chart);
          nv.utils.windowResize(chart.update);
          d3.select('.nv-context').remove();
          d3.select('.nv-legendWrap').remove();
          return chart;
        });
      };

      return Chart;

    })(Marionette.ItemView);
  });
});
