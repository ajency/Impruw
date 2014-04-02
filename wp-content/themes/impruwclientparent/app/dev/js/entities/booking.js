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

      Booking.prototype.name = 'Booking';

      Booking.prototype.defaults = function() {
        return {
          'room_id': 0,
          'status': 'unavailable',
          'date': new Date()
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

      return BookingCollection;

    })(Backbone.Collection);
    API = {
      getAvailabiltyStatus: function(date) {
        return 'avaliable';
      }
    };
    return App.reqres.setHandler("get:avaliability:status", function(date) {
      return API.getAvailabiltyStatus(date);
    });
  });
});
