var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Rooms", function(Rooms, App, Backbone, Marionette, $, _) {
    var API;
    Rooms.RoomModel = (function(_super) {
      __extends(RoomModel, _super);

      function RoomModel() {
        return RoomModel.__super__.constructor.apply(this, arguments);
      }

      RoomModel.prototype.defaults = function() {
        return {
          post_title: '',
          post_content: '',
          facilities: [],
          slider_id: 0,
          thumbnail_id: 0,
          no_of_rooms: 0,
          tariffs: []
        };
      };

      RoomModel.prototype.name = 'room';

      return RoomModel;

    })(Backbone.AssociatedModel);
    Rooms.RoomCollection = (function(_super) {
      __extends(RoomCollection, _super);

      function RoomCollection() {
        return RoomCollection.__super__.constructor.apply(this, arguments);
      }

      RoomCollection.prototype.model = Rooms.RoomModel;

      RoomCollection.prototype.url = function() {
        return AJAXURL + '?action=get-rooms';
      };

      return RoomCollection;

    })(Backbone.Collection);
    API = {
      getRooms: function(param) {
        var rooms;
        if (param == null) {
          param = {};
        }
        rooms = new Rooms.RoomCollection;
        rooms.fetch({
          reset: true,
          data: param
        });
        return rooms;
      },
      createNewRoomModel: function(data) {
        var room;
        if (data == null) {
          data = {};
        }
        room = new Rooms.RoomModel(data);
        return room;
      }
    };
    App.reqres.setHandler("get:room:entities", function() {
      return API.getRooms();
    });
    return App.reqres.setHandler("create:new:room:model", function(data) {
      return API.createNewRoomModel(data);
    });
  });
});
