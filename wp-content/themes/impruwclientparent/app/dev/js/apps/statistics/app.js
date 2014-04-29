var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/statistics/show/controller'], function(App) {
  return App.module('StatisticsApp', function(StatisticsApp, App, Backbone, Marionette, $, _) {
    var API;
    StatisticsApp.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'statistics': 'show'
      };

      return Router;

    })(Marionette.AppRouter);
    API = {
      show: function() {
        return new StatisticsApp.Show.Controller({
          region: App.rightRegion
        });
      }
    };
    return StatisticsApp.on({
      'start': function() {
        return new StatisticsApp.Router({
          controller: API
        });
      }
    });
  });
});
