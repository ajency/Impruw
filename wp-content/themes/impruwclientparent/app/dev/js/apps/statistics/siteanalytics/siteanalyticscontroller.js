var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/statistics/siteanalytics/views', 'moment'], function(App, AppController, moment) {
  return App.module('DashboardApp.Statistics.SiteAnalytics', function(SiteAnalytics, App, Backbone, Marionette, $, _) {
    var SiteAnalyticsController, SiteAnalyticsLayout;
    SiteAnalyticsController = (function(_super) {
      __extends(SiteAnalyticsController, _super);

      function SiteAnalyticsController() {
        this.renderCharts = __bind(this.renderCharts, this);
        return SiteAnalyticsController.__super__.constructor.apply(this, arguments);
      }

      SiteAnalyticsController.prototype.initialize = function() {
        var date, endDate, layout, startDate;
        date = new Date();
        endDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        startDate = endDate - (7 * 86400000);
        this.collection = App.request("get:site:analytics:data", startDate, endDate);
        this.layout = layout = this._getLayout();
        this.listenTo(layout, "show", this.renderCharts);
        this.listenTo(layout, "date:range:changed", this.renderCharts);
        return this.show(layout);
      };

      SiteAnalyticsController.prototype.renderCharts = function() {
        var overviewChart, trafficViewChart;
        overviewChart = new SiteAnalytics.Views.OverviewChartView({
          collection: this.collection
        });
        this.layout.overviewChartRegion.show(overviewChart);
        trafficViewChart = new SiteAnalytics.Views.TrafficViewChart({
          collection: this.collection
        });
        return this.layout.trafficChartRegion.show(trafficViewChart);
      };

      SiteAnalyticsController.prototype._getLayout = function() {
        return new SiteAnalyticsLayout;
      };

      return SiteAnalyticsController;

    })(AppController);
    SiteAnalyticsLayout = (function(_super) {
      __extends(SiteAnalyticsLayout, _super);

      function SiteAnalyticsLayout() {
        return SiteAnalyticsLayout.__super__.constructor.apply(this, arguments);
      }

      SiteAnalyticsLayout.prototype.className = 'row';

      SiteAnalyticsLayout.prototype.template = '<div class="left-inner-addon "> <span class="glyphicon glyphicon-calendar"></span> <input type="text" class="datepicker "/> </div> <div id="overview-chart-region"></div> <div id="traffic-chart-region"></div>';

      SiteAnalyticsLayout.prototype.events = {
        'change .datepicker': function() {
          var end, start;
          start = new Date();
          end = start - (30 * 8460000);
          return this.trigger("date:range:changed", start, end);
        }
      };

      SiteAnalyticsLayout.prototype.regions = {
        overviewChartRegion: '#overview-chart-region',
        trafficChartRegion: '#traffic-chart-region'
      };

      SiteAnalyticsLayout.prototype.onShow = function() {
        return this.$el.find('.datepicker').datepicker();
      };

      return SiteAnalyticsLayout;

    })(Marionette.Layout);
    return App.commands.setHandler("show:site:analytics:data", function(opt) {
      return new SiteAnalyticsController(opt);
    });
  });
});
