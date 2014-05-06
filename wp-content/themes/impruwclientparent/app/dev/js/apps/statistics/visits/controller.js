var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('StatisticsApp.Visits', function(Visits, App, Backbone, Marionette, $, _) {
    var VisitsView;
    Visits.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var sitemodel, view;
        sitemodel = opts.model;
        this.view = view = this.getVisitsView(sitemodel);
        App.vent.trigger("set:active:menu", 'statistics');
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getVisitsView = function(model) {
        return new VisitsView({
          model: model
        });
      };

      return Controller;

    })(AppController);
    VisitsView = (function(_super) {
      __extends(VisitsView, _super);

      function VisitsView() {
        return VisitsView.__super__.constructor.apply(this, arguments);
      }

      VisitsView.prototype.template = '<div> <h3> Visit Summary</h3> <p> Use this section to understand your audience visits by day, month and year.</p> <h5>Visits Overview (with graph)</h5> <div id="widgetIframe"> <iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=VisitsSummary&actionToWidgetize=index&idSite={{statistics_enabled}}&period=week&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"> </iframe> </div> <h5>Visits by Day of Week</h5> <div id="widgetIframe"> <iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=VisitTime&actionToWidgetize=getByDayOfWeek&idSite={{statistics_enabled}}&period=week&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"> </iframe> </div> <h5>Visitor map</h5> <div id="widgetIframe"> <iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=UserCountryMap&actionToWidgetize=visitorMap&idSite={{statistics_enabled}}&period=week&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0"> </iframe> </div> </div>';

      VisitsView.prototype.serializeData = function() {
        var data;
        data = VisitsView.__super__.serializeData.call(this);
        data.statistics_enabled = parseInt(this.model.get('statistics_enabled'));
        return data;
      };

      return VisitsView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:visits:view", function(opts) {
      return new Visits.Controller(opts);
    });
  });
});
