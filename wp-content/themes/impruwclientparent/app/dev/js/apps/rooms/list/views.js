var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/rooms/list/templates/mainview2.html', 'text!apps/rooms/list/templates/singleroom2.html', 'text!apps/rooms/list/templates/emptyview.html'], function(App, mainviewTpl, roomsingleTpl, emptyTpl) {
  return App.module('RoomsApp.List.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyView, RoomSingle;
    RoomSingle = (function(_super) {
      __extends(RoomSingle, _super);

      function RoomSingle() {
        return RoomSingle.__super__.constructor.apply(this, arguments);
      }

      RoomSingle.prototype.tagName = "li";

      RoomSingle.prototype.template = roomsingleTpl;

      RoomSingle.prototype.events = {
        'click .deleteroom_link': function(e) {
          e.preventDefault();
          if (confirm(_.polyglot.t("Delete the room and all its data?"))) {
            return this.model.destroy();
          }
        }
      };

      return RoomSingle;

    })(Marionette.ItemView);
    EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.template = emptyTpl;

      return EmptyView;

    })(Marionette.ItemView);
    Views.RoomsListView = (function(_super) {
      __extends(RoomsListView, _super);

      function RoomsListView() {
        return RoomsListView.__super__.constructor.apply(this, arguments);
      }

      RoomsListView.prototype.template = mainviewTpl;

      RoomsListView.prototype.itemViewContainer = '.new-room-list';

      RoomsListView.prototype.itemView = RoomSingle;

      RoomsListView.prototype.emptyView = EmptyView;

      return RoomsListView;

    })(Marionette.CompositeView);
    return Views.RoomListLayout = (function(_super) {
      __extends(RoomListLayout, _super);

      function RoomListLayout() {
        return RoomListLayout.__super__.constructor.apply(this, arguments);
      }

      RoomListLayout.prototype.template = '<div id="room-list"></div>';

      RoomListLayout.prototype.className = 'rooms-layout';

      RoomListLayout.prototype.regions = {
        roomRegion: '#room-list'
      };

      RoomListLayout.prototype.events = {
        'click .add-room': function() {
          return this.trigger("add:new:room:clicked");
        }
      };

      return RoomListLayout;

    })(Marionette.Layout);
  });
});
