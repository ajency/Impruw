var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone', 'moment'], function(App, Backbone, moment) {
  return App.module("Entities.Booking", function(Booking, App, Backbone, Marionette, $, _) {
    var API, BookingCollection, bookings;
    Booking = (function(_super) {
      __extends(Booking, _super);

      function Booking() {
        return Booking.__super__.constructor.apply(this, arguments);
      }

      Booking.prototype.name = 'Booking';

      Booking.prototype.defaults = function() {
        return {
          'room_id': 0,
          'status': 'available',
          'from_date': '',
          'to_date': ''
        };
      };

      return Booking;

    })(Backbone.Model);
    BookingCollection = (function(_super) {
      __extends(BookingCollection, _super);

      function BookingCollection() {
        return BookingCollection.__super__.constructor.apply(this, arguments);
      }

      BookingCollection.prototype.model = Booking;

      BookingCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=fetch-bookings";
      };

      BookingCollection.prototype.getBookingOn = function(date) {
        var checkBooking, models, time;
        time = date.getTime();
        checkBooking = function(booking) {
          var from, to;
          from = booking.get('from_date');
          to = booking.get('to_date');
          from = moment(from).subtract('days', 1);
          to = moment(to).add('days', 1);
          return moment(time).isAfter(from) && moment(time).isBefore(to);
        };
        models = this.filter(checkBooking);
        if (models.length > 0) {
          return models[0];
        } else {
          return false;
        }
      };

      return BookingCollection;

    })(Backbone.Collection);
    bookings = new BookingCollection;
    API = {
      fetchRoomBookings: function(roomId) {
        bookings.fetch({
          reset: true,
          data: {
            room_id: roomId
          }
        });
        return bookings;
      },
      getAvailabiltyStatus: function(date) {
        var model;
        model = bookings.getBookingOn(date);
        if (_.isObject(model)) {
          return model.get('status');
        } else {
          return 'available';
        }
      }
    };
    App.reqres.setHandler("fetch:room:bookings", function(roomId) {
      return API.fetchRoomBookings(roomId);
    });
    return App.reqres.setHandler("get:avaliability:status", function(date) {
      return API.getAvailabiltyStatus(date);
    });
  });
});
