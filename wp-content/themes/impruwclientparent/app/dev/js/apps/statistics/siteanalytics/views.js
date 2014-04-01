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

      OverviewChartView.prototype.className = 'row room-chart';

      OverviewChartView.prototype.template = '<div class="row chart-legends"> <div class="col-md-1">&nbsp;</div> <div class="col-md-5"><ul class="list-inline "> <li class="active">Weak</li> <li>Day</li> <li>Month</li> </ul></div> <div class="col-md-5"><ul class="list-inline pull-right"> <li ><span class="new-visit">&nbsp;</span>NEW VISITS</li> <li><span class="unique-visit">&nbsp;</span>UNIQUE VISITORS</li> </ul> </div> <div class="col-md-1">&nbsp;</div> </div> <canvas id="overview-chart" height="400" width="700"></canvas><br><br><br> <div class="row chart-data"> <div class="col-md-3"><h3>00:45:36</h3> Avg Visitor Duration</div> <div class="col-md-3"><h3>57</h3> Unique Visitor</div> <div class="col-md-3"><h3>70 </h3>Total Visits</div> <div class="col-md-3"><h3>24%</h3> Bounce Rate</div> </div>';

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
              fillColor: "#c77d28",
              strokeColor: "#c77d28",
              pointColor: "#c77d28",
              pointStrokeColor: "#fff",
              data: [65, 59, 90, 81, 56, 55, 40]
            }, {
              fillColor: "rgba(244, 135, 8, 0.74)",
              strokeColor: "rgba(244, 135, 8, 0.74)",
              pointColor: "rgba(244, 135, 8, 0.74)",
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

      TrafficViewChart.prototype.template = '<h4> All Traffic Data</h4> <div class="row traffic-list-table"><div class="col-md-12"> <table class="traffic-list table table-striped"> <thead><tr><th class="text-left">Source</th><th >Visits</th><th>Page views</th><th>Avg time on the page</th><th>Bounce rate</th></tr></thead> <tr> <td class="text-left" data-title="Source"><a href="#">http://dribbble.com/shots/popular? </a><span class="label label-info">R</span></td><td data-title="Visits">163</td><td data-title="Page views">  2.08 </td><td data-title="Avg time on the page"> 00:12:36     </td><td data-title="Bounce rate"> 70.38%<span class="glyphicon glyphicon-arrow-up"></span></td></tr> <td class="text-left" data-title="Source"><a href="#">http://dribbble.com/shots/popular? </a><span class="label label-danger">O</span></td><td data-title="Visits">163</td><td data-title="Page views">  2.08 </td><td data-title="Avg time on the page"> 00:12:36     </td><td data-title="Bounce rate"> 70.38%<span class="glyphicon glyphicon-arrow-down"></span></td></tr> </table></div></div>';

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
