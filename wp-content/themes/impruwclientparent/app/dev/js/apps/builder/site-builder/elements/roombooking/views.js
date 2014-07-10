var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/site-builder/elements/roombooking/template/mainTpl.html'], function(App, mainTpl) {
  return App.module('SiteBuilderApp.Element.RoomBooking.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.RoomBookingView = (function(_super) {
      __extends(RoomBookingView, _super);

      function RoomBookingView() {
        return RoomBookingView.__super__.constructor.apply(this, arguments);
      }

      RoomBookingView.prototype.className = 'roombooking';

      RoomBookingView.prototype.template = mainTpl;

      RoomBookingView.prototype.onShow = function() {
        this.$el.find('#room-booking-calendar').datepicker({
          inline: true,
          numberOfMonths: 2,
          dateFormat: 'yy-mm-dd'
        });
        this.$el.attr("data-content", "Update booking information <a href='" + SITEURL + "/dashboard/#/rooms'>here</a> ");
        return this.$el.popover({
          html: true,
          placement: 'top'
        });
      };

      return RoomBookingView;

    })(Marionette.ItemView);
  });
});
