var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'nvd3'], function(App, AppController, nv) {
  return App.module("DashboardApp.Statistics.OverViewChart", function(OverViewChart, App) {
    var Chart, Controller;
    this.startWithParent = false;
    Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        var chart;
        chart = this._getChartView();
        return this.show(chart, {
          loading: true
        });
      };

      Controller.prototype._getChartView = function() {
        return new Chart;
      };

      return Controller;

    })(AppController);
    Chart = (function(_super) {
      __extends(Chart, _super);

      function Chart() {
        return Chart.__super__.constructor.apply(this, arguments);
      }

      Chart.prototype.className = 'overview-chart';

      Chart.prototype.template = '<svg style="height:300px"></svg>';

      Chart.prototype.id = 'overview-chart';

      Chart.prototype.onShow = function() {
        var sinAndCos;
        sinAndCos = function() {
          var cos, i, sin, sin2;
          sin = [];
          sin2 = [];
          cos = [];
          i = 0;
          while (i < 100) {
            sin.push({
              x: i,
              y: Math.sin(i / 10)
            });
            sin2.push({
              x: i,
              y: Math.sin(i / 10) * 0.25 + 0.5
            });
            cos.push({
              x: i,
              y: .5 * Math.cos(i / 10)
            });
          }
          i++;
          return [
            {
              values: sin,
              key: "Sine Wave",
              color: "#ff7f0e"
            }, {
              values: cos,
              key: "Cosine Wave",
              color: "#2ca02c"
            }, {
              values: sin2,
              key: "Another sine wave",
              color: "#7777ff",
              area: true
            }
          ];
        };
        return nv.addGraph(function() {
          var chart, myData;
          chart = nv.models.lineChart().margin({
            left: 100
          }).useInteractiveGuideline(true).transitionDuration(350).showLegend(true).showYAxis(true).showXAxis(true);
          chart.xAxis.axisLabel("Time (ms)").tickFormat(d3.format(",r"));
          chart.yAxis.axisLabel("Voltage (v)").tickFormat(d3.format(".02f"));
          myData = sinAndCos();
          d3.select("#overview-chart svg").datum(myData).call(chart);
          nv.utils.windowResize(function() {});
          chart.update();
          return chart;
        });
      };

      return Chart;

    })(Marionette.ItemView);
    return OverViewChart.on('start', function(options) {
      return new Controller({
        region: options.region
      });
    });
  });
});
