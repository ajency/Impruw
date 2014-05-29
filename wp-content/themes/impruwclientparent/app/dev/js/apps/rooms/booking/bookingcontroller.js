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
        var layout, roomId;
        roomId = options.roomId;
        this.options = options;
        this.bookings = App.request("fetch:room:bookings", roomId);
        this.layout = layout = this.getRoomBookingLayout(this.bookings);
        this.listenTo(layout, "show", this.showBookingCalendarView);
        this.bindAddDateRangeEventListener();
        return this.show(layout, {
          loading: true
        });
      };

      Controller.prototype.bindAddDateRangeEventListener = function() {
        return App.vent.on("daterange:added daterange:removed daterange:updated", (function(_this) {
          return function() {
            return App.execute("show:booking:app", _this.options);
          };
        })(this));
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
    return App.commands.setHandler("show:booking:app", function(opts) {
      return new Booking.Controller(opts);
    });
  });
});
