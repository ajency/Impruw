var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['app', 'text!apps/rooms/add/templates/add-room.html'], function(App, addRoomTpl) {
  return App.module('RoomsApp.Booking.View', function(View, App, Backbone, Marionette, $, _) {
    var BookingPlanEmpty, BookingPlanSingle;
    View.BookingRoomLayout = (function(_super) {
      __extends(BookingRoomLayout, _super);

      function BookingRoomLayout() {
        return BookingRoomLayout.__super__.constructor.apply(this, arguments);
      }

      BookingRoomLayout.prototype.className = 'row room-booking';

      BookingRoomLayout.prototype.template = '<div class="col-md-8 room-booking-calender" id="calendar-region"></div> <div class="col-md-4 room-booking-data" id="plans-details-region"></div>';

      BookingRoomLayout.prototype.regions = {
        calendarRegion: '#calendar-region',
        plansDetailsRegion: '#plans-details-region'
      };

      return BookingRoomLayout;

    })(Marionette.Layout);
    View.CalendarView = (function(_super) {
      __extends(CalendarView, _super);

      function CalendarView() {
        this.highlightDaysByDateRange = __bind(this.highlightDaysByDateRange, this);
        this.triggerOnSelect = __bind(this.triggerOnSelect, this);
        this.setDateRangeColor = __bind(this.setDateRangeColor, this);
        return CalendarView.__super__.constructor.apply(this, arguments);
      }

      CalendarView.prototype.template = '<h4> <span class="glyphicon glyphicon-calendar"></span> Monthly Calendar <span class="excerpt">Donec vulputate nibh et odio vehicula, id porttitor quam malesuada</span> </h4> <div id="room-booking-calendar"></div> <br><br><br> <ul class="list-inline daterange-legends"> {{#dateRanges}} <li><span class="{{class}}">&nbsp;</span>{{name}}</li> {{/dateRanges}} </ul>';

      CalendarView.prototype.onShow = function() {
        this.$el.find('#room-booking-calendar').datepicker({
          inline: true,
          numberOfMonths: 2,
          onSelect: this.triggerOnSelect,
          beforeShowDay: this.highlightDaysByDateRange
        });
        return this.setDateRangeColor();
      };

      CalendarView.prototype.setDateRangeColor = function() {
        var classNames, dateRanges, templateHelpers;
        classNames = ['green', 'red', 'orange', 'blue', 'pink'];
        templateHelpers = Marionette.getOption(this, 'templateHelpers');
        dateRanges = templateHelpers['dateRanges'];
        return _.each(dateRanges, function(range, index) {
          return $("td." + range["class"] + ",span." + range["class"]).addClass("booking-" + classNames[index]);
        });
      };

      CalendarView.prototype.triggerOnSelect = function(date, selected) {
        this.trigger("date:selected", date);
        return _.delay(this.setDateRangeColor, 0);
      };

      CalendarView.prototype.highlightDaysByDateRange = function(date) {
        var className, dateRangeName;
        dateRangeName = App.request("get:daterange:name:for:date", date);
        className = _.slugify(dateRangeName);
        className += " " + App.request("get:avaliability:status", date);
        return [true, className];
      };

      return CalendarView;

    })(Marionette.CompositeView);
    View.PlansView = (function(_super) {
      __extends(PlansView, _super);

      function PlansView() {
        return PlansView.__super__.constructor.apply(this, arguments);
      }

      PlansView.prototype.className = 'plans-view';

      PlansView.prototype.itemView = BookingPlanSingle;

      PlansView.prototype.emptyView = BookingPlanEmpty;

      PlansView.prototype.template = '<div class="date-range"> You have selected <b>18 Jan to 16 Jan </b> </div> <div class="room-plans"> </div>';

      return PlansView;

    })(Marionette.CompositeView);
    BookingPlanSingle = (function(_super) {
      __extends(BookingPlanSingle, _super);

      function BookingPlanSingle() {
        return BookingPlanSingle.__super__.constructor.apply(this, arguments);
      }

      BookingPlanSingle.prototype.template = '<div class="room-booking-plan"> <h5>Plan 1 </h5> <p>Room. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> <div class="booking-detail"> Max Adults: <span>02</span> </div> <div class="booking-detail"> Max Children: <span>	02</span> </div> <div class="clearfix"></div> <h6>Additional Charge</h6> <div class="booking-detail"> per extra Adult : $200 </div> <div class="booking-detail"> per extra Child : $152 </div> <div class="clearfix"></div> <div class="booking-price">WEEKDAYS <b>$300</b></div> </div>';

      return BookingPlanSingle;

    })(Marionette.ItemView);
    return BookingPlanEmpty = (function(_super) {
      __extends(BookingPlanEmpty, _super);

      function BookingPlanEmpty() {
        return BookingPlanEmpty.__super__.constructor.apply(this, arguments);
      }

      BookingPlanEmpty.prototype.template = '<p>No Plans found for the selected date</p>';

      return BookingPlanEmpty;

    })(Marionette.ItemView);
  });
});
