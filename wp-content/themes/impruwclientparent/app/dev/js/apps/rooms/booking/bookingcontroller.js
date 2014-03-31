var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/booking/views'], function(App, AppController) {
  return App.module('RoomsApp.Booking', function(Booking, App, Backbone, Marionette, $, _) {
    Booking.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.showBookingPlansView = __bind(this.showBookingPlansView, this);
        this.showBookingCalendarView = __bind(this.showBookingCalendarView, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        var layout;
        this.layout = layout = this.getRoomBookingLayout();
        this.listenTo(layout, "show", this.showBookingCalendarView);
        return this.show(layout);
      };

      Controller.prototype.showBookingCalendarView = function() {
        var cview;
        this.cview = cview = new Booking.View.CalendarView;
        this.listenTo(cview, "date:selected", this.showBookingPlansView);
        return this.layout.calendarRegion.show(cview);
      };

      Controller.prototype.showBookingPlansView = function(date) {
        var plansCollection, pview;
        plansCollection = App.request("get:plans:collection", date);
        pview = new Booking.View.PlansView({
          collection: plansCollection
        });
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
