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

      RoomSummaryView.prototype.template = '<div class="room-img"> <img src="{{thumbnail_url}}" class="img-responsive"> </div> <div class="room-title">Title</div> <div class="room-excerpt">Lrem Ipsum Gipsum</div> <div class="room-actions"> <div class="price">$99<small>/night</small></div> <button class="btn btn-room">View Details</button> </div>';

      RoomSummaryView.prototype.singleRoomTemplate = '<h3>Add dummy template here to show room summary element on single room</h3>';

      RoomSummaryView.prototype.onBeforeRender = function() {
        var isSingle;
        isSingle = Marionette.getOption(this, 'isSingleRoom');
        if (!_.isUndefined(isSingle)) {
          return this.template = this.singleRoomTemplate;
        }
      };

      return RoomSummaryView;

    })(Marionette.ItemView);
  });
});
