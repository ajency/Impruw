var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone', 'moment'], function(App, Backbone, moment) {
  return App.module("Entities.DateRange", function(DateRange, App, Backbone, Marionette, $, _) {
    var API, DateRangeCollection, dateRangeCollection;
    DateRange = (function(_super) {
      __extends(DateRange, _super);

      function DateRange() {
        return DateRange.__super__.constructor.apply(this, arguments);
      }

      DateRange.prototype.name = 'daterange';

      DateRange.prototype.defaults = function() {
        return {
          'start_date': 0,
          'end_date': 0
        };
      };

      return DateRange;

    })(Backbone.Model);
    DateRangeCollection = (function(_super) {
      __extends(DateRangeCollection, _super);

      function DateRangeCollection() {
        return DateRangeCollection.__super__.constructor.apply(this, arguments);
      }

      DateRangeCollection.prototype.model = DateRange;

      DateRangeCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=fetch-daterange";
      };

      return DateRangeCollection;

    })(Backbone.Collection);
    dateRangeCollection = new DateRangeCollection;
    _.each(DATERANGE, function(range, index) {
      return range['id'] = parseInt(range['id']);
    });
    dateRangeCollection.set(DATERANGE);
    API = {
      getDateRangeCollection: function() {
        return dateRangeCollection;
      },
      getDateRangeNameForDate: function(date) {
        var checkDateRange, models, time;
        time = date.getTime();
        checkDateRange = function(daterange) {
          var from, to;
          from = daterange.get('from_date');
          to = daterange.get('to_date');
          from = moment(from).subtract('days', 1);
          to = moment(to).add('days', 1);
          return moment(time).isAfter(from) && moment(time).isBefore(to);
        };
        models = dateRangeCollection.filter(checkDateRange);
        if (models.length > 0) {
          return _.slugify(models[0].get('daterange_name'));
        } else {
          return '';
        }
      },
      createDateRangeModel: function(data) {
        var daterange;
        if (data == null) {
          data = {};
        }
        daterange = new DateRange(data);
        return daterange;
      }
    };
    App.reqres.setHandler("get:daterange:collection", function() {
      return API.getDateRangeCollection();
    });
    App.reqres.setHandler("create:new:daterange:model", function(data) {
      return API.createDateRangeModel(data);
    });
    return App.reqres.setHandler("get:daterange:name:for:date", function(date) {
      return API.getDateRangeNameForDate(date);
    });
  });
});
