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

      BookingRoomLayout.prototype.template = '<div class="col-md-8 room-booking-calender" id="calendar-region"></div> <div class="col-md-0 room-booking-data" id="plans-details-region"></div>';

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
        this.onBookingUpdated = __bind(this.onBookingUpdated, this);
        this.changeAvaliability = __bind(this.changeAvaliability, this);
        this.showPopover = __bind(this.showPopover, this);
        this.triggerOnSelect = __bind(this.triggerOnSelect, this);
        this.setDateRangeColor = __bind(this.setDateRangeColor, this);
        this.removeHightlight = __bind(this.removeHightlight, this);
        this.displayColorMonthChange = __bind(this.displayColorMonthChange, this);
        return CalendarView.__super__.constructor.apply(this, arguments);
      }

      CalendarView.prototype.template = '<h4> <span class="glyphicon glyphicon-calendar"></span> {{#polyglot}}Monthly Calendar{{/polyglot}} <span class="excerpt">{{#polyglot}}Choose availability dates{{/polyglot}}</span> </h4> <div id="room-booking-calendar"></div> <br><br><br> <ul class="list-inline daterange-legends"> {{#dateRanges}} <li><span class="{{class}}">&nbsp;</span>{{name}}</li> {{/dateRanges}} </ul>';

      CalendarView.prototype.onShow = function() {
        this.$el.find('#room-booking-calendar').datepicker({
          inline: true,
          numberOfMonths: 3,
          dateFormat: 'yy-mm-dd',
          onSelect: this.triggerOnSelect,
          beforeShowDay: this.highlightDaysByDateRange,
          onChangeMonthYear: this.displayColorMonthChange
        });
        this.setDateRangeColor();
        this.removeHightlight();
        return App.vent.on("booking:updated", this.onBookingUpdated);
      };

      CalendarView.prototype.onClose = function() {
        return this.clearPrevPopover();
      };

      CalendarView.prototype.displayColorMonthChange = function(year, month, inst) {
        return _.delay((function(_this) {
          return function() {
            _this.setDateRangeColor();
            return _this.removeHightlight();
          };
        })(this), 10);
      };

      CalendarView.prototype.removeHightlight = function() {
        this.$el.find('#room-booking-calendar td.ui-datepicker-today a.ui-state-highlight').removeClass('ui-state-highlight');
        return this.$el.find('#room-booking-calendar td.ui-datepicker-today a.ui-state-active').removeClass('ui-state-active');
      };

      CalendarView.prototype.setDateRangeColor = function() {
        var daterangeCollection;
        daterangeCollection = App.request("get:daterange:collection");
        return _.each(daterangeCollection.models, function(daterangeModel, index) {
          var className, dateRangeColour, dateRangeName;
          dateRangeName = daterangeModel.get('daterange_name');
          dateRangeColour = daterangeModel.get('daterange_colour');
          className = _.slugify(dateRangeName);
          return $("." + className).css({
            "background-color": dateRangeColour
          });
        });
      };

      CalendarView.prototype.triggerOnSelect = function(date, selected) {
        this.trigger("date:selected", date);
        return _.delay((function(_this) {
          return function() {
            _this.setDateRangeColor();
            return _this.showPopover(date);
          };
        })(this), 10);
      };

      CalendarView.prototype.showPopover = function(date) {
        var self, td;
        self = this;
        td = this.$el.find('td.ui-datepicker-current-day');
        this.clearPrevPopover();
        td.popover({
          content: this.getAvailabilityMarkup(date),
          html: true,
          placement: 'bottom',
          container: 'body'
        });
        td.on('shown.bs.popover', function(t, r, p) {
          var value;
          value = parseInt($('#booking-slider').attr('data-value'));
          return $('#booking-slider').slider({
            value: value,
            min: 0,
            max: 60,
            step: 30,
            stop: self.changeAvaliability
          });
        });
        td.popover('show');
        $('.booking-popover-close').on('click', (function(_this) {
          return function() {
            return _this.clearPrevPopover();
          };
        })(this));
        return this.popovertd = td;
      };

      CalendarView.prototype.changeAvaliability = function(event, ui) {
        var date, dateTime, value;
        if (ui.value === 0) {
          value = 'available';
        }
        if (ui.value === 30) {
          value = 'semi-available';
        }
        if (ui.value === 60) {
          value = 'unavailable';
        }
        dateTime = this.$el.find('#room-booking-calendar').datepicker('getDate');
        date = $.datepicker.formatDate("yy-mm-dd", dateTime);
        $('#booking-slider').slider('disable');
        return this.trigger("change:availability", value, date);
      };

      CalendarView.prototype.onBookingUpdated = function() {
        var dateTime, status;
        $('#booking-slider').slider('enable');
        dateTime = this.$el.find('#room-booking-calendar').datepicker('getDate');
        status = App.request("get:avaliability:status", dateTime);
        this.$el.find('td.ui-datepicker-current-day').removeClass('semi-available');
        this.$el.find('td.ui-datepicker-current-day').removeClass('unavailable');
        this.$el.find('td.ui-datepicker-current-day').removeClass('available');
        return this.$el.find('td.ui-datepicker-current-day').addClass(status);
      };

      CalendarView.prototype.getAvailabilityMarkup = function(date) {
        var currentStatus, html, value;
        currentStatus = App.request("get:avaliability:status", date);
        if (currentStatus === 'available') {
          value = 0;
        }
        if (currentStatus === 'semi-available') {
          value = 30;
        }
        if (currentStatus === 'unavailable') {
          value = 60;
        }
        html = "<button type='button' class='close booking-popover-close' aria-hidden='true'>&times;</button> <div class='booking-slider-pop'> <div id='booking-slider' data-value='" + value + "'></div> <div class='row'> <div class='col-md-4 available'><span>" + (_.polyglot.t('Available')) + "</span></div> <div class='col-md-4 semi-available'><span>" + (_.polyglot.t('Filling Fast')) + "</span></div> <div class='col-md-4 unavailable'><span>" + (_.polyglot.t('Sold Out')) + "</span></div> </div> </div>";
        return html;
      };

      CalendarView.prototype.clearPrevPopover = function() {
        if (!this.popovertd) {
          return;
        }
        $('.popover').remove();
        return delete this.popovertd;
      };

      CalendarView.prototype.highlightDaysByDateRange = function(date) {
        var className, dateRangeName, range;
        dateRangeName = App.request("get:daterange:name:for:date", date);
        range = '';
        range = dateRangeName ? true : false;
        className = _.slugify(dateRangeName);
        className += " " + App.request("get:avaliability:status", date);
        return [range, className];
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
