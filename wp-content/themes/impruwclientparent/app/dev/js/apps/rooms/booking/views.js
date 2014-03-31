var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/rooms/add/templates/add-room.html'], function(App, addRoomTpl) {
  return App.module('RoomsApp.Booking.View', function(View, App, Backbone, Marionette, $, _) {
    View.BookingRoomLayout = (function(_super) {
      __extends(BookingRoomLayout, _super);

      function BookingRoomLayout() {
        return BookingRoomLayout.__super__.constructor.apply(this, arguments);
      }

      BookingRoomLayout.prototype.className = 'row';

      BookingRoomLayout.prototype.template = '<div class="col-md-9" id="calendar-region"></div> <div class="col-md-3" id="plans-details-region"></div>';

      BookingRoomLayout.prototype.regions = {
        calendarRegion: '#calendar-region',
        plansDetailsRegion: '#plans-details-region'
      };

      return BookingRoomLayout;

    })(Marionette.Layout);
    View.CalendarView = (function(_super) {
      __extends(CalendarView, _super);

      function CalendarView() {
        return CalendarView.__super__.constructor.apply(this, arguments);
      }

      CalendarView.prototype.template = 'add left side markup here <div id="room-booking-calendar"></div>';

      CalendarView.prototype.onShow = function() {
        return this.$el.find('#room-booking-calendar').datepicker({
          inline: true,
          numberOfMonths: 2
        });
      };

      return CalendarView;

    })(Marionette.CompositeView);
    return View.PlansView = (function(_super) {
      __extends(PlansView, _super);

      function PlansView() {
        return PlansView.__super__.constructor.apply(this, arguments);
      }

      PlansView.prototype.className = 'plans-view';

      PlansView.prototype.template = 'Add plans view markup here';

      return PlansView;

    })(Marionette.CompositeView);
  });
});
