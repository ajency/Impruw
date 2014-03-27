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
    return App.commands.setHandler("add:room:model", function(model) {
      if (!_.isObject(model)) {
        return false;
      }
      return API.addRoomModelToCollection(model);
    });
  });
});
