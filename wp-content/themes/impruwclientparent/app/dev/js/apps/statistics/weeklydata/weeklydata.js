var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController, layoutTpl) {
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

      SingleDayData.prototype.template = '<li>on{{formattedDate}} page per visits: {{ga:pageviewsPerVisit}}</li>';

      SingleDayData.prototype.serializeData = function() {
        var data;
        data = SingleDayData.__super__.serializeData.call(this);
        data.formattedDate = function() {
          return new Date(this.date);
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

      WeeklyDataView.prototype.template = '<div class="">on{{formattedDate}} single view {{ga:visits}}</div> <ul class="week-data"></ul> <div class="row statistics-visitor"> <div class="col-md-8 statistics-tod-visitor"> <h3>Today Visits</h3> <div class="today-visits"> Sunday <h1>5 </h1> <span>Visits</span> </div> <div class="row today-visitor-details"> <div class="col-md-3"><span class="sm-txt per-data"><span class="glyphicon glyphicon-arrow-up"></span>10%</span></div> <div class="col-md-4">150 <span class="glyphicon glyphicon-file"></span> <span class="sm-txt">pageviews</span></div> <div class="col-md-5">00:45:00<span class="glyphicon glyphicon-time"></span><i class="fa fa-clock-o"></i> <span class="sm-txt">Avg visit duration</span></div> </div> <hr> <div class="row total-visits"> <div class="col-md-3">Unique Visits <b>45</b></div> <div class="col-md-3">New visits <b>6%</b></div> <div class="col-md-3">Pages per visit <b>6.1</b></div> <div class="col-md-3">Bounce rate <b>4%</b></div> </div> </div> <div class="col-md-4"> <ul class="list-unstyled weekly-list"> <li><em>Sun </em> <span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-arrow-up"></span> <b>12,13,40...</b></li> <li><em>Mon</em> <span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-arrow-down"></span><b>12,13,40...</b></li> <li><em>Tue </em><span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-arrow-down"></span><b>12,13,40...</b></li> <li><em>Wed </em><span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-arrow-up"></span><b>12,13,40...</b></li> <li><em>Thu </em><span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-arrow-up"></span><b>12,13,40...</b></li> <li><em>Fri</em> <span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-arrow-down"></span><b>12,13,40...</b></li> <li><em>Sat</em> <span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-arrow-up"></span><b>12,13,40...</b></li> </ul> </div> </div>';

      WeeklyDataView.prototype.itemViewContainer = '.week-data';

      WeeklyDataView.prototype.itemView = SingleDayData;

      WeeklyDataView.prototype.serializeData = function() {
        var data;
        data = WeeklyDataView.__super__.serializeData.call(this);
        data.formattedDate = function() {
          return new Date(this.date);
        };
        return data;
      };

      WeeklyDataView.prototype.onBeforeRender = function() {
        if (!this.collection) {
          return;
        }
        return this.model = this.collection.pop();
      };

      return WeeklyDataView;

    })(Marionette.CompositeView);
    return App.commands.setHandler("show:weekly:data", function(opt) {
      return new WeeklyDataController(opt);
    });
  });
});
