var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('StatisticsApp.RealTime', function(RealTime, App, Backbone, Marionette, $, _) {
    var RealTimeView;
    RealTime.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var sitemodel, view;
        sitemodel = opts.model;
        this.view = view = this.getRealTimeView(sitemodel);
        App.vent.trigger("set:active:menu", 'statistics');
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getRealTimeView = function(model) {
        return new RealTimeView({
          model: model
        });
      };

      return Controller;

    })(AppController);
    RealTimeView = (function(_super) {
      __extends(RealTimeView, _super);

      function RealTimeView() {
        return RealTimeView.__super__.constructor.apply(this, arguments);
      }

      RealTimeView.prototype.template = '<div class="aj-imp-dash-content"> <header class="aj-imp-dash-header row"> <div class="aj-imp-dash-title col-xs-12"> <h2 class="aj-imp-page-head">Real time visitors</h2> </div> </header> <h4 class="aj-imp-sub-head"><small>This is where you monitor user activity as it happens on your site.</small></h4> <h5 class="aj-imp-sub-head-thin">Real Time Visitor Count</h5> <div id="widgetIframe"> <iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=Live&actionToWidgetize=getSimpleLastVisitCount&idSite={{statistics_enabled}}&period=day&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"> </iframe> </div> <h5 class="aj-imp-sub-head-thin">Real time map</h5> <div id="widgetIframe"> <iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=UserCountryMap&actionToWidgetize=realtimeMap&idSite={{statistics_enabled}}&period=day&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"> </iframe> </div> </div>';

      RealTimeView.prototype.serializeData = function() {
        var data;
        data = RealTimeView.__super__.serializeData.call(this);
        data.statistics_enabled = parseInt(this.model.get('statistics_enabled'));
        return data;
      };

      return RealTimeView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:realtime:view", function(opts) {
      return new RealTime.Controller(opts);
    });
  });
});
