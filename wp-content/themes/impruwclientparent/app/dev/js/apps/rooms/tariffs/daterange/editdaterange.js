var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/rooms/tariffs/daterange/templates/editDaterange.html'], function(App, AppController, editDateRangeTpl) {
  return App.module("RoomsApp.RoomsTariff.DateRange.Edit", function(Edit, App) {
    var EditDateRangeController, EditDateRangeView;
    EditDateRangeController = (function(_super) {
      __extends(EditDateRangeController, _super);

      function EditDateRangeController() {
        this.dateRangeUpdated = __bind(this.dateRangeUpdated, this);
        this.daterangeDeleted = __bind(this.daterangeDeleted, this);
        return EditDateRangeController.__super__.constructor.apply(this, arguments);
      }

      EditDateRangeController.prototype.initialize = function(opt) {
        var dateRangeView, model;
        model = opt.model;
        this.dateRangeView = dateRangeView = this._getEditDateRangeView(model);
        this.listenTo(dateRangeView, "update:daterange:details", (function(_this) {
          return function(data) {
            model.save(data);
            return model.save(null, {
              wait: true,
              success: _this.dateRangeUpdated
            });
          };
        })(this));
        this.listenTo(dateRangeView, "delete:daterange", (function(_this) {
          return function(data) {
            return model.destroy({
              allData: false,
              wait: true,
              success: _this.daterangeDeleted
            });
          };
        })(this));
        return this.show(dateRangeView, {
          loading: true
        });
      };

      EditDateRangeController.prototype.daterangeDeleted = function() {
        this.dateRangeView.triggerMethod("deleted:daterange");
        return App.vent.trigger("daterange:removed");
      };

      EditDateRangeController.prototype.dateRangeUpdated = function(dateRange) {
        this.dateRangeView.triggerMethod("updated:daterange");
        return App.vent.trigger("daterange:updated");
      };

      EditDateRangeController.prototype._getEditDateRangeView = function(dateRange) {
        return new EditDateRangeView({
          model: dateRange
        });
      };

      return EditDateRangeController;

    })(AppController);
    EditDateRangeView = (function(_super) {
      __extends(EditDateRangeView, _super);

      function EditDateRangeView() {
        this.setDateRangeColor = __bind(this.setDateRangeColor, this);
        this.setDateRangeColorDelayed = __bind(this.setDateRangeColorDelayed, this);
        this.disableDateRange = __bind(this.disableDateRange, this);
        return EditDateRangeView.__super__.constructor.apply(this, arguments);
      }

      EditDateRangeView.prototype.tagName = 'form';

      EditDateRangeView.prototype.className = 'form-horizontal';

      EditDateRangeView.prototype.template = editDateRangeTpl;

      EditDateRangeView.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Edit DateRange'),
        modal_size: 'medium-modal'
      };

      EditDateRangeView.prototype.events = {
        'click #btn_updatedaterange': function() {
          var check, data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            if (moment(data.to_date).isAfter(data.from_date) === true) {
              check = this.checkDaterangeValid(data);
              if (check === 0) {
                this.$el.parent().find('.alert').remove();
                return this.$el.parent().prepend("<div class=\"alert alert-success\">" + _.polyglot.t("Date range overlaps existing date range") + "</div>");
              } else {
                return this.trigger("update:daterange:details", data);
              }
            } else {
              this.$el.parent().find('.alert').remove();
              return this.$el.parent().prepend("<div class=\"alert alert-success\">" + _.polyglot.t("Select valid daterange") + "</div>");
            }
          }
        },
        'click #btn_deletedaterange': function(e) {
          e.preventDefault();
          if (confirm(_.polyglot.t('All plans with date range deleted confirm'))) {
            return this.trigger("delete:daterange", this.model);
          }
        }
      };

      EditDateRangeView.prototype.checkDaterangeValid = function(selectedDate) {
        var daterangeCollection, temp;
        temp = 0;
        daterangeCollection = App.request("get:daterange:collection");
        _.each(daterangeCollection.models, (function(_this) {
          return function(daterangeModel, index) {
            var dateRangeId, dateRangeModelId, fromDate, fromDateCheck, toDate, toDateCheck;
            dateRangeModelId = _this.model.get('id');
            dateRangeId = daterangeModel.get('id');
            if (dateRangeModelId !== dateRangeId) {
              fromDate = daterangeModel.get('from_date');
              toDate = daterangeModel.get('to_date');
              fromDate = moment(fromDate).subtract('days', 1);
              toDate = moment(toDate).add('days', 1);
              fromDateCheck = moment(selectedDate.from_date).isAfter(fromDate);
              toDateCheck = moment(selectedDate.to_date).isBefore(toDate);
              if (fromDateCheck === true && toDateCheck === false) {
                return temp = temp + 1;
              } else {
                return temp = 0;
              }
            }
          };
        })(this));
        return temp;
      };

      EditDateRangeView.prototype.serializeData = function() {
        var data;
        data = EditDateRangeView.__super__.serializeData.call(this);
        data.from_date = moment(data.from_date).format("YYYY-MM-DD");
        data.to_date = moment(data.to_date).format("YYYY-MM-DD");
        return data;
      };

      EditDateRangeView.prototype.onUpdatedDaterange = function() {
        this.$el.parent().find('.alert').remove();
        this.$el.parent().prepend("<div class=\"alert alert-success\">" + _.polyglot.t("Updated successfully") + "</div>");
        return this.displayDatePicker();
      };

      EditDateRangeView.prototype.onDeletedDaterange = function() {
        return this.trigger("dialog:close");
      };

      EditDateRangeView.prototype.onShow = function() {
        this.$el.find('input[type="checkbox"]').checkbox();
        this.$el.find('#daterange_colour').minicolors();
        return this.displayDatePicker();
      };

      EditDateRangeView.prototype.displayDatePicker = function() {
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

      EditDateRangeView.prototype.disableDateRange = function(date) {
        var className, currentDateRange, currentDateRangeName, dateRangeName;
        currentDateRange = this.model.get('daterange_name');
        dateRangeName = App.request("get:daterange:name:for:date", date);
        className = _.slugify(dateRangeName);
        currentDateRangeName = _.slugify(currentDateRange);
        if (dateRangeName === '') {
          return [true, className];
        } else if (currentDateRangeName === className) {
          return [true, className];
        } else {
          return [false, className];
        }
      };

      EditDateRangeView.prototype.setDateRangeColorDelayed = function(input, instance) {
        return _.delay((function(_this) {
          return function() {
            return _this.setDateRangeColor();
          };
        })(this), 10);
      };

      EditDateRangeView.prototype.setDateRangeColor = function() {
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

      return EditDateRangeView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:edit:daterange", function(opts) {
      opts = {
        region: App.dialogRegion,
        model: opts.model
      };
      return new EditDateRangeController(opts);
    });
  });
});
