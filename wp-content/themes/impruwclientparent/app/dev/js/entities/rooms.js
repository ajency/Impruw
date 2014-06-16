var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Rooms", function(Rooms, App, Backbone, Marionette, $, _) {
    var API, rooms;
    Rooms.RoomModel = (function(_super) {
      __extends(RoomModel, _super);

      function RoomModel() {
        return RoomModel.__super__.constructor.apply(this, arguments);
      }

      RoomModel.prototype.idAttribute = 'ID';

      RoomModel.prototype.defaults = function() {
        return {
          post_title: '',
          post_content: '',
          post_status: 'auto-draft',
          facilities: [],
          slider_id: 0,
          thumbnail_url: 'http://localhost/impruw/childsite/wp-content/uploads/sites/81/2014/03/5-yama-zbrush-model-by-jemark-150x150.jpg',
          no_of_rooms: 0,
          tariffs: []
        };
      };

      RoomModel.prototype.name = 'room';

      return RoomModel;

    })(Backbone.Model);
    Rooms.RoomCollection = (function(_super) {
      __extends(RoomCollection, _super);

      function RoomCollection() {
        return RoomCollection.__super__.constructor.apply(this, arguments);
      }

      RoomCollection.prototype.model = Rooms.RoomModel;

      RoomCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=get-rooms";
      };

      return RoomCollection;

    })(Backbone.Collection);
    rooms = new Rooms.RoomCollection;
    rooms.fetch();
    API = {
      getRooms: function(param) {
        if (param == null) {
          param = {};
        }
        return rooms;
      },
      createNewRoomModel: function(data) {
        var room;
        if (data == null) {
          data = {};
        }
        room = new Rooms.RoomModel(data);
        room.save();
        return room;
      },
      getRoomModel: function(room_id) {
        var room;
        room = rooms.get(parseInt(room_id));
        if (!room) {
          room = new Rooms.RoomModel({
            ID: parseInt(room_id)
          });
          room.fetch();
          rooms.add(room);
        }
        return room;
      },
      addRoomModelToCollection: function(model) {
        return rooms.add(model);
      }
    };
    App.reqres.setHandler("get:room:entities", function() {
      return API.getRooms();
    });
    App.reqres.setHandler("create:new:room:model", function(data) {
      return API.createNewRoomModel(data);
    });
    App.reqres.setHandler("get:room:model", function(room_id) {
      return API.getRoomModel(room_id);
    });
    return App.commands.setHandler("add:room:model", function(model) {
      if (!_.isObject(model)) {
        return false;
      }
      return API.addRoomModelToCollection(model);
    });
  });
});