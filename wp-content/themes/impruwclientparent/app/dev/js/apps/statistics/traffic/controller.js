var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('StatisticsApp.Traffic', function(Traffic, App, Backbone, Marionette, $, _) {
    var TrafficView;
    Traffic.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var sitemodel, view;
        sitemodel = opts.model;
        this.view = view = this.getTrafficView(sitemodel);
        App.vent.trigger("set:active:menu", 'statistics');
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getTrafficView = function(model) {
        return new TrafficView({
          model: model
        });
      };

      return Controller;

    })(AppController);
    TrafficView = (function(_super) {
      __extends(TrafficView, _super);

      function TrafficView() {
        return TrafficView.__super__.constructor.apply(this, arguments);
      }

      TrafficView.prototype.template = '<div class="aj-imp-dash-content"> <header class="aj-imp-dash-header row"> <div class="aj-imp-dash-title col-xs-12"> <h2 class="aj-imp-page-head">Traffic Summary</h2> </div> </header> <h4 class="aj-imp-sub-head"><small>View the keywords, networks and devices being used to access your site.</small></h5> <h5 class="aj-imp-sub-head-thin">All Referrers</h5> <div id="widgetIframe"> <iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=Referrers&actionToWidgetize=getAll&idSite={{statistics_enabled}}&period=week&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"> </iframe> </div> <h5 class="aj-imp-sub-head-thin">Device type</h5> <div id="widgetIframe"> <iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=UserSettings&actionToWidgetize=getMobileVsDesktop&idSite={{statistics_enabled}}&period=week&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"> </iframe> </div> <h5 class="aj-imp-sub-head-thin">Insights Overview</h5> <div id="widgetIframe"> <iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=Insights&actionToWidgetize=getInsightsOverview&idSite={{statistics_enabled}}&period=week&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"> </iframe> </div> </div>';

      TrafficView.prototype.serializeData = function() {
        var data;
        data = TrafficView.__super__.serializeData.call(this);
        data.statistics_enabled = parseInt(this.model.get('statistics_enabled'));
        return data;
      };

      return TrafficView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:traffic:view", function(opts) {
      return new Traffic.Controller(opts);
    });
  });
});
