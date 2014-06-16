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
          var data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            return this.trigger("add:daterange:details", data);
          }
        }
      };

      AddDateRangeView.prototype.onSavedDaterange = function() {
        this.$el.parent().find('.alert').remove();
        this.$el.parent().prepend("<div class=\"alert alert-success\">" + _.polyglot.t("New Date range added") + "</div>");
        return this.$el.find('input').val('');
      };

      AddDateRangeView.prototype.onShow = function() {
        this.$el.find('input[type="checkbox"]').checkbox();
        this.$el.find('#daterange_colour').minicolors();
        return this.$el.find('.dated').datepicker({
          showOtherMonths: true,
          selectOtherMonths: true,
          dateFormat: "yy-mm-dd",
          beforeShowDay: this.disableDateRange
        }).prev('.btn').on('click', (function(_this) {
          return function(e) {
            e && e.preventDefault();
            return $(datepickerSelector).focus();
          };
        })(this));
      };

      AddDateRangeView.prototype.disableDateRange = function(date) {
        var checkDateRange, daterangeCollection, models, time;
        daterangeCollection = App.request("get:daterange:collection");
        time = date.getTime();
        checkDateRange = function(daterange) {
          var from, to;
          from = daterange.get('from_date');
          to = daterange.get('to_date');
          from = moment(from).subtract('days', 1);
          to = moment(to).add('days', 1);
          return moment(time).isAfter(from) && moment(time).isBefore(to);
        };
        models = daterangeCollection.filter(checkDateRange);
        if (models.length > 0) {
          return [false, ''];
        } else {
          return [true, ''];
        }
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