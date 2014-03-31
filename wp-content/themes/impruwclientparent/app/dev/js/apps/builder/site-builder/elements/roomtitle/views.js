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

      RoomTitleView.prototype.template = '<div class="room-title-container clearfix"> <div class="room-title"> <h1>Room Title</h1> <div class="room-title-desc">Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room. </div> </div> <div class="room-title-actions"> <button class="btn btn-sm btn-book">Booking &amp; Availability</button> </div> </div>';

      return RoomTitleView;

    })(Marionette.ItemView);
  });
});
