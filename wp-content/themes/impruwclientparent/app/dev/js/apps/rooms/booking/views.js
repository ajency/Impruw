var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/rooms/add/templates/add-room.html'], function(App, addRoomTpl) {
  return App.module('RoomsApp.Booking.View', function(View, App, Backbone, Marionette, $, _) {
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
        return CalendarView.__super__.constructor.apply(this, arguments);
      }

      CalendarView.prototype.template = '<h4> <span class="glyphicon glyphicon-calendar"></span> Monthly Calendar <span class="excerpt">Donec vulputate nibh et odio vehicula, id porttitor quam malesuada</span> </h4> <div id="room-booking-calendar"></div> <br><br><br> <ul class="list-inline"> <li><span class="date-range1">&nbsp;</span>Date Range 1</li> <li><span class="date-range2">&nbsp;</span>Date Range 2</li> <li><span class="date-range3">&nbsp;</span>Date Range 3</li> </ul>';

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

      PlansView.prototype.template = '<div class="date-range"> You have selected <b>18 Jan to 16 Jan </b> </div> <div class="room-plans"> <div class="room-booking-plan"> <h5>Plan 1 </h5> <p>Room. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> <div class="booking-detail"> Max Adults: <span>02</span> </div> <div class="booking-detail"> Max Children: <span>	02</span> </div> <div class="clearfix"></div> <h6>Additional Charge</h6> <div class="booking-detail"> per extra Adult : $200 </div> <div class="booking-detail"> per extra Child : $152 </div> <div class="clearfix"></div> <div class="booking-price">WEEKDAYS <b>$300</b></div> </div> <div class="room-booking-plan"> <h5>Plan 2 </h5> <p>Room. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> <div class="booking-detail"> Max Adults: <span>02</span> </div> <div class="booking-detail"> Max Children: <span>	02</span> </div> <div class="clearfix"></div> <h6>Additional Charge</h6> <div class="booking-detail"> per extra Adult : $200 </div> <div class="booking-detail"> per extra Child : $152 </div> <div class="clearfix"></div> <div class="booking-price">WEEKENDDAYS <b>$300</b></div> </div></div>';

      return PlansView;

    })(Marionette.CompositeView);
  });
});
