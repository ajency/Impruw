var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/rooms/tariffs/daterange/templates/addDaterange.html'], function(App, AppController, addDateRangeTpl) {
  return App.module("RoomsApp.RoomsTariff.DateRange.Add", function(Add, App) {
    var AddDateRangeController, AddDateRangeView;
    AddDateRangeController = (function(_super) {
      __extends(AddDateRangeController, _super);

      function AddDateRangeController() {
        this.dateRangeSaved = __bind(this.dateRangeSaved, this);
        return AddDateRangeController.__super__.constructor.apply(this, arguments);
      }

      AddDateRangeController.prototype.initialize = function() {
        var dateRangeView;
        this.dateRangeView = dateRangeView = this._getAddDateRangeView();
        this.listenTo(dateRangeView, "add:daterange:details", (function(_this) {
          return function(data) {
            var dateRange;
            dateRange = App.request("create:new:daterange:model", data);
            return dateRange.save(null, {
              wait: true,
              success: _this.dateRangeSaved
            });
          };
        })(this));
        return this.show(dateRangeView, {
          loading: true
        });
      };

      AddDateRangeController.prototype.dateRangeSaved = function(dateRange) {
        App.execute("add:daterange", dateRange);
        this.dateRangeView.triggerMethod("saved:daterange");
        return App.vent.trigger("daterange:added");
      };

      AddDateRangeController.prototype._getAddDateRangeView = function() {
        return new AddDateRangeView;
      };

      return AddDateRangeController;

    })(AppController);
    AddDateRangeView = (function(_super) {
      __extends(AddDateRangeView, _super);

      function AddDateRangeView() {
        this.displayColorMonthChange = __bind(this.displayColorMonthChange, this);
        this.setDateRangeColor = __bind(this.setDateRangeColor, this);
        this.setDateRangeColorDelayed = __bind(this.setDateRangeColorDelayed, this);
        this.disableDateRange = __bind(this.disableDateRange, this);
        return AddDateRangeView.__super__.constructor.apply(this, arguments);
      }

      AddDateRangeView.prototype.tagName = 'form';

      AddDateRangeView.prototype.className = 'form-horizontal';

      AddDateRangeView.prototype.template = addDateRangeTpl;

      AddDateRangeView.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Add DateRange'),
        modal_size: 'medium-modal'
      };

      AddDateRangeView.prototype.events = {
        'click #btn_savedaterange': function() {
          var check, data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            if (moment(data.to_date).isAfter(data.from_date) === true) {
              check = this.checkDaterangeValid(data);
              if (check === 0) {
                this.$el.parent().find('.alert').remove();
                return this.$el.parent().prepend("<div class=\"alert alert-success\">" + _.polyglot.t("Date range overlaps existing date range") + "</div>");
              } else {
                return this.trigger("add:daterange:details", data);
              }
            } else {
              this.$el.parent().find('.alert').remove();
              return this.$el.parent().prepend("<div class=\"alert alert-success\">" + _.polyglot.t("Select valid daterange") + "</div>");
            }
          }
        }
      };

      AddDateRangeView.prototype.checkDaterangeValid = function(selectedDate) {
        var daterangeCollection, daterangeModel, fromDate, temp, toDate, _i, _len, _ref;
        temp = 1;
        daterangeCollection = App.request("get:daterange:collection");
        if (daterangeCollection.models.length === 0) {
          temp = 1;
        } else {
          _ref = daterangeCollection.models;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            daterangeModel = _ref[_i];
            fromDate = daterangeModel.get('from_date');
            toDate = daterangeModel.get('to_date');
            fromDate = moment(fromDate).subtract('days', 1);
            toDate = moment(toDate).add('days', 1);
            console.info(fromDate, toDate);
            if ((moment(selectedDate.from_date).isBefore(fromDate) && moment(selectedDate.to_date).isAfter(toDate)) || (moment(selectedDate.from_date).isAfter(fromDate) && moment(selectedDate.from_date).isBefore(toDate)) || (moment(selectedDate.from_date).isBefore(fromDate) && moment(selectedDate.to_date).isAfter(fromDate))) {
              temp = 0;
              break;
            }
          }
        }
        return temp;
      };

      AddDateRangeView.prototype.onSavedDaterange = function() {
        this.$el.parent().find('.alert').remove();
        this.$el.parent().prepend("<div class=\"alert alert-success\">" + _.polyglot.t("New Date range added") + "</div>");
        this.$el.find('input').val('');
        this.$el.find('.dated').datepicker('destroy');
        return this.displayDatePicker();
      };

      AddDateRangeView.prototype.displayDatePicker = function() {
        return this.$el.find('.dated').datepicker({
          showOtherMonths: true,
          selectOtherMonths: true,
          dateFormat: "yy-mm-dd",
          beforeShowDay: this.disableDateRange,
          beforeShow: this.setDateRangeColorDelayed,
          onChangeMonthYear: this.displayColorMonthChange
        }).prev('.btn').on('click', (function(_this) {
          return function(e) {
            e && e.preventDefault();
            return $(datepickerSelector).focus();
          };
        })(this));
      };

      AddDateRangeView.prototype.onShow = function() {
        this.$el.find('input[type="checkbox"]').checkbox();
        this.$el.find('#daterange_colour').minicolors();
        return this.displayDatePicker();
      };

      AddDateRangeView.prototype.disableDateRange = function(date) {
        var className, dateRangeName;
        dateRangeName = App.request("get:daterange:name:for:date", date);
        className = _.slugify(dateRangeName);
        if (dateRangeName === '') {
          return [true, className];
        } else {
          return [false, className];
        }
      };

      AddDateRangeView.prototype.setDateRangeColorDelayed = function(input, instance) {
        return _.delay((function(_this) {
          return function() {
            return _this.setDateRangeColor();
          };
        })(this), 10);
      };

      AddDateRangeView.prototype.setDateRangeColor = function() {
        var daterangeCollection;
        daterangeCollection = App.request("get:daterange:collection");
        return _.each(daterangeCollection.models, (function(_this) {
          return function(daterangeModel, index) {
            var className, dateRangeColour, dateRangeName;
            dateRangeName = daterangeModel.get('daterange_name');
            dateRangeColour = daterangeModel.get('daterange_colour');
            className = _.slugify(dateRangeName);
            return $("." + className).css({
              "background-color": dateRangeColour
            });
          };
        })(this));
      };

      AddDateRangeView.prototype.displayColorMonthChange = function(year, month, inst) {
        return _.delay((function(_this) {
          return function() {
            return _this.setDateRangeColor();
          };
        })(this), 10);
      };

      return AddDateRangeView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:add:daterange", function() {
      return new AddDateRangeController({
        region: App.dialogRegion
      });
    });
  });
});
