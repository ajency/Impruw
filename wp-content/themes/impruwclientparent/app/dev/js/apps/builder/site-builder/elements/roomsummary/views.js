var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'holder'], function(App, Holder) {
  return App.module('SiteBuilderApp.Element.RoomSummary.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.RoomSummaryView = (function(_super) {
      __extends(RoomSummaryView, _super);

      function RoomSummaryView() {
        return RoomSummaryView.__super__.constructor.apply(this, arguments);
      }

      RoomSummaryView.prototype.className = 'roomsummary';

      RoomSummaryView.prototype.template = '<div class="room-img"> <img src="{{thumb_url}}" class="img-responsive"> </div> <div class="room-title">Title</div> <div class="room-excerpt">Lrem Ipsum Gipsum</div> <div class="room-actions"> <div class="price">$99<small>/night</small></div> <button class="btn btn-room">View Details</button> </div>';

      return RoomSummaryView;

    })(Marionette.ItemView);
  });
});
