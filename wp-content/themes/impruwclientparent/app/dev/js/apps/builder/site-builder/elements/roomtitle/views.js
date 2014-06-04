var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.RoomTitle.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.RoomTitleView = (function(_super) {
      __extends(RoomTitleView, _super);

      function RoomTitleView() {
        return RoomTitleView.__super__.constructor.apply(this, arguments);
      }

      RoomTitleView.prototype.className = 'roomtitle';

      RoomTitleView.prototype.template = '<div class="room-title-container clearfix"> <div class="room-title"> <h1>Your Room Title</h1> <div class="room-title-desc">This will work only on a single room page. Change your page to the single room page and add this element. The room title of the room will display on your website. <br> Also to make the "Booking and Availability" button work, use the Room Booking element. When the button is pressed on your site, it will take you to the booking area. </div> </div> <div class="room-title-actions"> <button class="btn btn-sm btn-book">Booking &amp; Availability</button> </div> </div>';

      RoomTitleView.prototype.onShow = function() {
        this.$el.attr("data-content", "Update room title <a href='" + SITEURL + "/dashboard/#rooms'>here</a> ");
        return this.$el.popover({
          html: true,
          placement: 'top'
        });
      };

      return RoomTitleView;

    })(Marionette.ItemView);
  });
});
