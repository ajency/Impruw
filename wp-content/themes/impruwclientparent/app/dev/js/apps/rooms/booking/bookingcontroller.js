var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/booking/views'], function(App, AppController) {
  return App.module('RoomsApp.Booking', function(Booking, App, Backbone, Marionette, $, _) {
    var bookingRegion, roomId;
    bookingRegion = null;
    roomId = 0;
    Booking.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.showBookingPlansView = __bind(this.showBookingPlansView, this);
        this.showBookingCalendarView = __bind(this.showBookingCalendarView, this);
        this.showApp = __bind(this.showApp, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        this.roomId = options.roomId;
        this.options = options;
        return this.showApp();
      };

      Controller.prototype.showApp = function() {
        var layout;
        this.bookings = App.request("fetch:room:bookings", this.roomId);
        this.layout = layout = this.getRoomBookingLayout(this.bookings);
        this.listenTo(layout, "show", this.showBookingCalendarView);
        return this.show(layout, {
          loading: true
        });
      };

      Controller.prototype.showBookingCalendarView = function() {
        var cview, dateRangeCollection, templateHelpers;
        dateRangeCollection = App.request("get:daterange:collection");
        templateHelpers = {
          dateRanges: dateRangeCollection.getDateRanges()
        };
        this.cview = cview = new Booking.View.CalendarView({
          templateHelpers: templateHelpers
        });
        this.listenTo(cview, "change:availability", function(status, date) {
          return App.execute("set:booking:status:for:date", date, status);
        });
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

      Controller.prototype.getRoomBookingLayout = function(collection) {
        return new Booking.View.BookingRoomLayout({
          collection: collection
        });
      };

      return Controller;

    })(AppController);
    App.commands.setHandler("show:booking:app", function(opts) {
      bookingRegion = opts.region;
      roomId = opts.roomID;
      return new Booking.Controller(opts);
    });
    return App.vent.on("daterange:added daterange:removed daterange:updated", (function(_this) {
      return function() {
        var opts;
        opts = {
          region: bookingRegion,
          roomID: roomId
        };
        return new Booking.Controller(opts);
      };
    })(this));
  });
});
