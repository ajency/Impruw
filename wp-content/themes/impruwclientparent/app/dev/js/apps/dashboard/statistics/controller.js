var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/dashboard/statistics/templates/layout.html', 'apps/dashboard/statistics/charts-loader'], function(App, AppController, layoutTpl) {
  return App.module('DashboardApp.Statistics', function(Statistics, App, Backbone, Marionette, $, _) {
    var API, StatisticsLayout;
    Statistics.graphNames = ['ga:visits', 'ga:visitors', 'ga:newVisits', 'ga:pageviews'];
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
        'click .btn-group > label': 'changeRange'
      };

      StatisticsLayout.prototype.initialize = function(options) {};

      StatisticsLayout.prototype.changeRange = function(e) {
        var date, dateRange, endDate, startDate;
        console.log("radio changed");
        dateRange = $(e.target).find('input[type="hidden"]').val();
        date = new Date();
        endDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        startDate = endDate - dateRange * 86400000;
        console.log("change range " + startDate + "       " + endDate);
        return this.trigger("radio:clicked", startDate, endDate);
      };

      StatisticsLayout.prototype.onShow = function() {};

      return StatisticsLayout;

    })(Marionette.Layout);
    Statistics.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        var date, endDate, self, startDate;
        self = this;
        date = new Date();
        endDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        startDate = endDate - 30 * 86400000;
        this.analyticsCollection = App.request("fetch:analytics", startDate, endDate);
        this.layout = this._getLayout(this.analyticsCollection);
        this.listenTo(this.layout, 'radio:clicked', (function(_this) {
          return function(start, end) {
            console.log("radio range" + startDate + "       " + endDate);
            return _this.layout.overviewRegion.show(_this._loadChartOverview(start, end));
          };
        })(this));
        this.listenTo(this.layout, 'show', function() {
          $("#from").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 3,
            onClose: function(selectedDate) {
              return $("#to").datepicker("option", "minDate", selectedDate);
            }
          });
          $("#to").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 3,
            onClose: function(selectedDate) {
              return $("#from").datepicker("option", "maxDate", selectedDate);
            }
          });
          $('#daterange-apply').on('click', function() {
            var end, fromDate, start, toDate;
            fromDate = $("#from").datepicker("getDate");
            toDate = $("#to").datepicker("getDate");
            start = Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
            end = Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
            return self.layout.overviewRegion.show(self._loadChartOverview(start, end));
          });
          return this.layout.overviewRegion.show(this._loadChartOverview(startDate, endDate));
        });
        return this.show(this.layout, {
          loading: true
        });
      };

      Controller.prototype._setRegions = function(layout) {
        return this.regions = layout.regions;
      };

      Controller.prototype._getLayout = function(data) {
        return new StatisticsLayout({
          collection: data
        });
      };

      Controller.prototype._loadChartOverview = function(start, end) {
        return App.execute("show:overview:chart", {
          region: this.layout.overviewRegion,
          startDate: start,
          endDate: end
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
