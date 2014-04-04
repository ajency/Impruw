var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/statistics/weeklydata/weeklydata', 'apps/statistics/siteanalytics/siteanalyticscontroller'], function(App, AppController, layoutTpl) {
  return App.module('DashboardApp.Statistics', function(Statistics, App, Backbone, Marionette, $, _) {
    var API, StatisticsController, StatisticsLayout, StatisticsRouter;
    StatisticsRouter = (function(_super) {
      __extends(StatisticsRouter, _super);

      function StatisticsRouter() {
        return StatisticsRouter.__super__.constructor.apply(this, arguments);
      }

      StatisticsRouter.prototype.appRoutes = {
        'statistics': 'showStatistics'
      };

      return StatisticsRouter;

    })(Marionette.AppRouter);
    API = {
      showStatistics: function() {
        return new StatisticsController;
      }
    };
    StatisticsController = (function(_super) {
      __extends(StatisticsController, _super);

      function StatisticsController() {
        return StatisticsController.__super__.constructor.apply(this, arguments);
      }

      StatisticsController.prototype.initialize = function(opt) {
        var layout;
        layout = new StatisticsLayout;
        this.listenTo(layout, "show", (function(_this) {
          return function() {
            App.execute("show:weekly:data", {
              region: layout.weeklyDataRegion
            });
            return App.execute("show:site:analytics:data", {
              region: layout.analyticsDataRegion
            });
          };
        })(this));
        this.show(layout);
        return App.vent.trigger("set:active:menu", 'statistics');
      };

      return StatisticsController;

    })(AppController);
    StatisticsLayout = (function(_super) {
      __extends(StatisticsLayout, _super);

      function StatisticsLayout() {
        return StatisticsLayout.__super__.constructor.apply(this, arguments);
      }

      StatisticsLayout.prototype.template = '<div id="weekly-data-region"></div> <div id="analytics-data-region"></div>';

      StatisticsLayout.prototype.regions = {
        weeklyDataRegion: '#weekly-data-region',
        analyticsDataRegion: '#analytics-data-region'
      };

      return StatisticsLayout;

    })(Marionette.Layout);
    return Statistics.on("start", function() {
      return new StatisticsRouter({
        controller: API
      });
    });
  });
});
