var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/booking/views'], function(App, AppController) {
  return App.module('RoomsApp.Booking', function(Booking, App, Backbone, Marionette, $, _) {
    Booking.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        var layout;
        this.layout = layout = this.getRoomBookingLayout();
        this.listenTo(layout, "show", (function(_this) {
          return function() {
            _this.showBookingCalendarView();
            return _this.showBookingPlansView();
          };
        })(this));
        return this.show(layout);
      };

      Controller.prototype.showBookingCalendarView = function() {
        var cview;
        cview = new Booking.View.CalendarView;
        return this.layout.calendarRegion.show(cview);
      };

      Controller.prototype.showBookingPlansView = function() {
        var pview;
        pview = new Booking.View.PlansView;
        return this.layout.plansDetailsRegion.show(pview);
      };

      Controller.prototype.getRoomBookingLayout = function() {
        return new Booking.View.BookingRoomLayout;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:booking:app", function(opts) {
      return new Booking.Controller(opts);
    });
  });
});
