var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App, mainviewTpl, roomsingleTpl, emptyTpl) {
  return App.module('RoomsApp.List.View', function(View, App, Backbone, Marionette, $, _) {
    View.RoomSingle = (function(_super) {
      __extends(RoomSingle, _super);

      function RoomSingle() {
        return RoomSingle.__super__.constructor.apply(this, arguments);
      }

      RoomSingle.prototype.template = '<h3>ROOM FEATURES</h3>';

      return RoomSingle;

    })(Marionette.ItemView);
    View.EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.template = emptyTpl;

      return EmptyView;

    })(Marionette.ItemView);
    View.MainView = (function(_super) {
      __extends(MainView, _super);

      function MainView() {
        return MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.template = mainviewTpl;

      MainView.prototype.itemViewContainer = '.room-list tbody';

      MainView.prototype.itemView = View.RoomSingle;

      MainView.prototype.emptyView = View.EmptyView;

      return MainView;

    })(Marionette.CompositeView);
    return View.RoomListLayout = (function(_super) {
      __extends(RoomListLayout, _super);

      function RoomListLayout() {
        return RoomListLayout.__super__.constructor.apply(this, arguments);
      }

      RoomListLayout.prototype.template = '<header class="aj-imp-dash-header row"> <div class="aj-imp-dash-title col-xs-12"> <h2 class="aj-imp-page-head">Rooms</h2> </div> </header> <button type="button" class="btn btn-default btn-lg add-room"><span class="icon icon-plus"></span> Add Room</button> <div id="room-list"></div>';

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
