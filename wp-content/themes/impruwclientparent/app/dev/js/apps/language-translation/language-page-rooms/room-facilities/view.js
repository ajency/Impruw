var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-page-rooms/room-facilities/templates/roomfacilitiesview.html'], function(App, roomfacilitiesviewTpl) {
  return App.module('LanguageApp.LanguagePageRooms.RoomFacilities.Views', function(Views, App, Backbone, Marionette, $, _) {
    var RoomFacilitiesItemView;
    RoomFacilitiesItemView = (function(_super) {
      __extends(RoomFacilitiesItemView, _super);

      function RoomFacilitiesItemView() {
        return RoomFacilitiesItemView.__super__.constructor.apply(this, arguments);
      }

      RoomFacilitiesItemView.prototype.template = roomfacilitiesviewTpl;

      return RoomFacilitiesItemView;

    })(Marionette.ItemView);
    return Views.RoomFacilitiesView = (function(_super) {
      __extends(RoomFacilitiesView, _super);

      function RoomFacilitiesView() {
        return RoomFacilitiesView.__super__.constructor.apply(this, arguments);
      }

      RoomFacilitiesView.prototype.tagName = 'div';

      RoomFacilitiesView.prototype.className = 'form-group dual';

      RoomFacilitiesView.prototype.itemView = RoomFacilitiesItemView;

      return RoomFacilitiesView;

    })(Marionette.CollectionView);
  });
});
