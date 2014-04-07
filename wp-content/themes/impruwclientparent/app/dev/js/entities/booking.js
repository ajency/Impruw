var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone', 'moment'], function(App, Backbone, moment) {
  return App.module("Entities.Booking", function(Booking, App, Backbone, Marionette, $, _) {
    var API, BookingCollection;
    Booking = (function(_super) {
      __extends(Booking, _super);

      function Booking() {
        return Booking.__super__.constructor.apply(this, arguments);
      }

      Booking.prototype.name = 'booking';

      Booking.prototype.defaults = function() {
        return {
          'room_id': 0,
          'status': 'available',
          'bdate': ''
        };
      };

      Booking.prototype.parse = function(resp) {
        if (resp.code === 'OK') {
          resp.data.id = parseInt(resp.data.id);
          resp.data.room_id = parseInt(resp.data.room_id);
          return resp.data;
        }
        return resp;
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
        var checkBooking, models;
        checkBooking = function(booking) {
          var bdate;
          bdate = booking.get('bdate');
          return moment(date).isSame(bdate);
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
    window.bookings = new BookingCollection;
    API = {
      fetchRoomBookings: function(roomId) {
        bookings.roomId = roomId;
        bookings.fetch({
          reset: true,
          data: {
            room_id: roomId
          }
        });
        return bookings;
      },
      setBookingStatusForDate: function(date, status) {
        var booking;
        booking = bookings.getBookingOn(date);
        if (!booking) {
          booking = new Booking({
            bdate: date
          });
          bookings.add(booking);
        }
        booking.set({
          status: status,
          room_id: bookings.roomId
        });
        return booking.save(null, {
          wait: true,
          success: function() {
            return App.vent.trigger("booking:updated");
          }
        });
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
    App.reqres.setHandler("get:avaliability:status", function(date) {
      return API.getAvailabiltyStatus(date);
    });
    return App.commands.setHandler("set:booking:status:for:date", function(date, status) {
      return API.setBookingStatusForDate(date, status);
    });
  });
});
