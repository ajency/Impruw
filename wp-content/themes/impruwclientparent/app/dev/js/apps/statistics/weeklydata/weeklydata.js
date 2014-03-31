var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'moment'], function(App, AppController, moment) {
  return App.module('DashboardApp.Statistics.WeeklyData', function(WeeklyData, App, Backbone, Marionette, $, _) {
    var SingleDayData, WeeklyDataController, WeeklyDataView;
    WeeklyDataController = (function(_super) {
      __extends(WeeklyDataController, _super);

      function WeeklyDataController() {
        return WeeklyDataController.__super__.constructor.apply(this, arguments);
      }

      WeeklyDataController.prototype.initialize = function() {
        var collection, view;
        collection = App.request("get:weekly:data");
        view = this._getWeeklyDataView(collection);
        return this.show(view, {
          loading: true
        });
      };

      WeeklyDataController.prototype._getWeeklyDataView = function(collection) {
        return new WeeklyDataView({
          collection: collection
        });
      };

      return WeeklyDataController;

    })(AppController);
    SingleDayData = (function(_super) {
      __extends(SingleDayData, _super);

      function SingleDayData() {
        return SingleDayData.__super__.constructor.apply(this, arguments);
      }

      SingleDayData.prototype.template = '<li> <em>{{weekday}}</em> <span class="glyphicon glyphicon-user"></span> <span class="glyphicon glyphicon-arrow-up"></span> <b>{{ga:newVisits}},{{ga:pageviewsPerVisit}},{{ga:pageviews}}...</b> </li>';

      SingleDayData.prototype.serializeData = function() {
        var data;
        data = SingleDayData.__super__.serializeData.call(this);
        data.formattedDate = function() {
          return new Date(this.date);
        };
        data.weekday = function() {
          var d;
          d = new Date(this.date);
          return moment(d).format('ddd');
        };
        return data;
      };

      return SingleDayData;

    })(Marionette.ItemView);
    WeeklyDataView = (function(_super) {
      __extends(WeeklyDataView, _super);

      function WeeklyDataView() {
        return WeeklyDataView.__super__.constructor.apply(this, arguments);
      }

      WeeklyDataView.prototype.template = '<div class="row statistics-visitor"> <div class="col-md-7 statistics-tod-visitor"> <h3>Today Visits</h3> <div class="today-visits"> {{weekday}} <h1>{{ga:visits}}</h1> <span>Visits</span> </div> <div class="row today-visitor-details"> <div class="col-md-3"><span class="sm-txt per-data"><span class="glyphicon glyphicon-arrow-up"></span>{{ga:visitBounceRate}}</span></div> <div class="col-md-4">{{ga:pageviews}} <span class="glyphicon glyphicon-file"></span> <span class="sm-txt">pageviews</span></div> <div class="col-md-5">{{ga:avgTimeOnSite}}<span class="glyphicon glyphicon-time"></span><i class="fa fa-clock-o"></i> <span class="sm-txt">Avg visit duration</span></div> </div> <hr> <div class="row total-visits"> <div class="col-md-3">Unique pageviews <b>{{ga:uniquePageviews}}</b></div> <div class="col-md-3">New visits <b>{{ga:newVisits}}</b></div> <div class="col-md-3">Page views per visit <b>{{ga:pageviewsPerVisit}}</b></div> <div class="col-md-3">Visit Bounce rate <b>{{ga:visitBounceRate}}</b></div> </div> </div> <div class="col-md-5"> <ul class="list-unstyled weekly-list"> </ul> </div> </div>';

      WeeklyDataView.prototype.itemViewContainer = '.weekly-list';

      WeeklyDataView.prototype.itemView = SingleDayData;

      WeeklyDataView.prototype.serializeData = function() {
        var data;
        data = WeeklyDataView.__super__.serializeData.call(this);
        data.formattedDate = function() {
          return new Date(this.date);
        };
        data.weekday = function() {
          var d;
          d = new Date(this.date);
          return moment(d).format('dddd');
        };
        return data;
      };

      WeeklyDataView.prototype.onBeforeRender = function() {
        if (!this.collection) {
          return;
        }
        this.model = this.collection.shift();
        return this.collection.sort();
      };

      return WeeklyDataView;

    })(Marionette.CompositeView);
    return App.commands.setHandler("show:weekly:data", function(opt) {
      return new WeeklyDataController(opt);
    });
  });
});
