var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  App.module('StatisticsApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    var StatisticsView, TrackingDisabledView;
    Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.trackingUpdated = __bind(this.trackingUpdated, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        var trackingStatus, view;
        trackingStatus = STATISTICS;
        if (trackingStatus === false) {
          this.view = view = this.getDisabledTrackingView();
          this.listenTo(this.view, "enable:tracking:for:site", this.updateTracking);
        } else {
          this.view = view = this.getStatisticsView();
        }
        App.vent.trigger("set:active:menu", 'statistics');
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getDisabledTrackingView = function() {
        return new TrackingDisabledView;
      };

      Controller.prototype.getStatisticsView = function() {
        return new StatisticsView;
      };

      Controller.prototype.updateTracking = function() {
        var options;
        options = {
          url: AJAXURL,
          method: 'POST',
          data: {
            action: 'update-tracking'
          }
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            return _this.trackingUpdated();
          };
        })(this)).fail(function(resp) {
          return console.log('error');
        });
      };

      Controller.prototype.trackingUpdated = function() {
        return this.view.triggerMethod("tracking:updated");
      };

      return Controller;

    })(AppController);
    TrackingDisabledView = (function(_super) {
      __extends(TrackingDisabledView, _super);

      function TrackingDisabledView() {
        return TrackingDisabledView.__super__.constructor.apply(this, arguments);
      }

      TrackingDisabledView.prototype.template = '<div id="tracking-container"> <div id="disabled_tracking"> <p> Eeep! This doesnot look good. Enable javascript to spruce up this place How do I do that? -> </p> <button id="btn_enable_tracking">enable</button> </div> </div>';

      TrackingDisabledView.prototype.events = {
        'click #btn_enable_tracking': function() {
          return this.trigger("enable:tracking:for:site");
        }
      };

      TrackingDisabledView.prototype.onTrackingUpdated = function() {
        var newHtml;
        this.$el.find('#disabled_tracking').remove();
        newHtml = '<div>Great! Looks like you are right on track. Your tracking code has been successfully activated. We need a day to compile your data so come again tomorrow. </div>';
        return this.$el.find('#tracking-container').append(newHtml);
      };

      return TrackingDisabledView;

    })(Marionette.ItemView);
    return StatisticsView = (function(_super) {
      __extends(StatisticsView, _super);

      function StatisticsView() {
        return StatisticsView.__super__.constructor.apply(this, arguments);
      }

      StatisticsView.prototype.template = '<div> <p>DISPLAY STATISTICS</p> </div>';

      return StatisticsView;

    })(Marionette.ItemView);
  });
  return App.StatisticsApp.Show.Controller;
});
