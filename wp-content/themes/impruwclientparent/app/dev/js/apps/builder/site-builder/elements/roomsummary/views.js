var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.RoomSummary.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.RoomSummaryView = (function(_super) {
      __extends(RoomSummaryView, _super);

      function RoomSummaryView() {
        return RoomSummaryView.__super__.constructor.apply(this, arguments);
      }

      RoomSummaryView.prototype.className = 'roomsummary';

      RoomSummaryView.prototype.roomNotSetTemplate = '<div class="room-img"> <div class="image-placeholder"><span class="bicon icon-uniF10E"></span>Room Image</div> </div> <div class="room-title">Room Title</div> <div class="room-excerpt">Lorem Ipsum is simply dummy text of the printing and typesetting industry</div> <div class="room-actions"> <div class="price">$99<small>/night</small></div> <button class="btn btn-room">View Details</button> </div>';

      RoomSummaryView.prototype.singleRoomTemplate = '<h3>Add dummy template here to show room summary element on single room</h3>';

      RoomSummaryView.prototype.onBeforeRender = function() {
        var isSingle, roomNotSet;
        isSingle = Marionette.getOption(this, 'isSingleRoom');
        if (!_.isUndefined(isSingle)) {
          this.template = this.singleRoomTemplate;
        }
        roomNotSet = Marionette.getOption(this, 'roomNotSet');
        if (!_.isUndefined(roomNotSet)) {
          return this.template = this.roomNotSetTemplate;
        }
      };

      return RoomSummaryView;

    })(Marionette.ItemView);
  });
});
