var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/dashboard/statistics/templates/layout.html', 'apps/dashboard/statistics/charts-loader'], function(App, AppController, layoutTpl) {
  return App.module('DashboardApp.Statistics', function(Statistics, App, Backbone, Marionette, $, _) {
    var API, StatisticsLayout;
    Statistics.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'statistics': 'showStatistics'
      };

      return Router;

    })(Marionette.AppRouter);
    StatisticsLayout = (function(_super) {
      __extends(StatisticsLayout, _super);

      function StatisticsLayout() {
        return StatisticsLayout.__super__.constructor.apply(this, arguments);
      }

      StatisticsLayout.prototype.template = layoutTpl;

      StatisticsLayout.prototype.regions = {
        overviewRegion: '#overview-region'
      };

      StatisticsLayout.prototype.events = {
        'click input.range-radio-button': 'changeRange'
      };

      StatisticsLayout.prototype.initialize = function(options) {
        return this.rawData = options.rawData;
      };

      StatisticsLayout.prototype.changeRange = function() {
        var dateRange, rangeData;
        dateRange = $('input.range-radio-button:checked').val();
        rangeData = _.last(this.rawData, dateRange);
        return this.trigger("radio:clicked", rangeData);
      };

      StatisticsLayout.prototype.onShow = function() {
        return this.$el.find('input[type="radio"]').bootstrapSwitch();
      };

      return StatisticsLayout;

    })(Marionette.Layout);
    Statistics.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        var endDate, rawData, startDate;
        endDate = Date.parse(new Date().toDateString());
        startDate = endDate - 2592000000;
        rawData = App.request("fetch:analytics", startDate, endDate);
        console.log("fetched" + JSON.stringify(rawData));
        this.layout = this._getLayout(rawData);
        this.show(this.layout, this.listenTo(this.layout, 'radio:clicked', (function(_this) {
          return function(rangeData) {
            return _this.layout.overviewRegion.show(_this._loadChartOverview(rangeData));
          };
        })(this)));
        return this.layout.overviewRegion.show(this._loadChartOverview(rawData));
      };

      Controller.prototype._setRegions = function(layout) {
        return this.regions = layout.regions;
      };

      Controller.prototype._getLayout = function(data) {
        return new StatisticsLayout({
          rawData: data
        });
      };

      Controller.prototype._loadChartOverview = function(data) {
        Statistics.OverViewChart.stop();
        return Statistics.OverViewChart.start({
          region: this.layout.overviewRegion,
          collection: data
        });
      };

      return Controller;

    })(AppController);
    API = {
      showStatistics: function() {
        return new Statistics.Controller;
      }
    };
    return Statistics.on('start', function() {
      return new Statistics.Router({
        controller: API
      });
    });
  });
});
