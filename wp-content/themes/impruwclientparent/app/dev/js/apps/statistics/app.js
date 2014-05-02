var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/statistics/show/controller', 'apps/statistics/realtime/controller', 'apps/statistics/visits/controller', 'apps/statistics/traffic/controller'], function(App) {
  return App.module('StatisticsApp', function(StatisticsApp, App, Backbone, Marionette, $, _) {
    var API;
    StatisticsApp.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'statistics': 'show',
        'statistics/realtime': 'realtime',
        'statistics/visits': 'visits',
        'statistics/traffic': 'traffic'
      };

      return Router;

    })(Marionette.AppRouter);
    API = {
      getSiteModel: function() {
        var siteProfile;
        siteProfile = App.request("get:site:model");
        return siteProfile;
      },
      show: function() {
        this.sitemodel = this.getSiteModel();
        return new StatisticsApp.Show.Controller({
          region: App.rightRegion,
          model: this.sitemodel
        });
      },
      realtime: function() {
        this.sitemodel = this.getSiteModel();
        return App.execute("show:realtime:view", {
          region: App.rightRegion,
          model: this.sitemodel
        });
      },
      visits: function() {
        this.sitemodel = this.getSiteModel();
        return App.execute("show:visits:view", {
          region: App.rightRegion,
          model: this.sitemodel
        });
      },
      traffic: function() {
        this.sitemodel = this.getSiteModel();
        return App.execute("show:traffic:view", {
          region: App.rightRegion,
          model: this.sitemodel
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
