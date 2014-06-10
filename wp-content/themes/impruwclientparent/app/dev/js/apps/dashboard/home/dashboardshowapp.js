var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/dashboard/home/templates/dashboard.html'], function(App, AppController, dashboardTpl) {
  return App.module('Dashboard.Home', function(Home, App, Backbone, Marionette, $, _) {
    var DashboardHomeController, DashboardLayout, DashboardRouter;
    DashboardRouter = (function(_super) {
      __extends(DashboardRouter, _super);

      function DashboardRouter() {
        return DashboardRouter.__super__.constructor.apply(this, arguments);
      }

      DashboardRouter.prototype.appRoutes = {
        'dashboard': 'show'
      };

      DashboardRouter.prototype.controller = {
        show: function() {
          return new DashboardHomeController;
        }
      };

      return DashboardRouter;

    })(Marionette.AppRouter);
    DashboardHomeController = (function(_super) {
      __extends(DashboardHomeController, _super);

      function DashboardHomeController() {
        return DashboardHomeController.__super__.constructor.apply(this, arguments);
      }

      DashboardHomeController.prototype.initialize = function(opt) {
        var layout;
        this.layout = layout = this._getDashboardLayout();
        this.listenTo(layout, 'show', this.showDashboardSections);
        App.vent.trigger("set:active:menu", 'dashboard');
        return this.show(layout);
      };

      DashboardHomeController.prototype._getDashboardLayout = function() {
        return new DashboardLayout;
      };

      DashboardHomeController.prototype.showDashboardSections = function() {};

      return DashboardHomeController;

    })(AppController);
    DashboardLayout = (function(_super) {
      __extends(DashboardLayout, _super);

      function DashboardLayout() {
        return DashboardLayout.__super__.constructor.apply(this, arguments);
      }

      DashboardLayout.prototype.template = dashboardTpl;

      DashboardLayout.prototype.serializeData = function() {
        var data;
        data = {
          SITEURL: window.SITEURL
        };
        return data;
      };

      return DashboardLayout;

    })(Marionette.Layout);
    return Home.on('start', function() {
      return new DashboardRouter;
    });
  });
});
