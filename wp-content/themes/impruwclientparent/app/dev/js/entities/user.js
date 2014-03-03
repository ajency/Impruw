var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Users", function(Users, App, Backbone, Marionette, $, _) {
    var API;
    Users.UserModel = (function(_super) {
      __extends(UserModel, _super);

      function UserModel() {
        return UserModel.__super__.constructor.apply(this, arguments);
      }

      UserModel.prototype.relations = [
        {
          type: Backbone.HasMany,
          key: 'rooms',
          relatedModel: 'App.Entities.Rooms.Room',
          collectionType: 'App.Entities.Rooms.RoomCollection'
        }
      ];

      UserModel.prototype.url = function() {
        return AJAXURL + '?action=get-user-profile';
      };

      UserModel.prototype.defaults = function() {
        return {
          user_name: 'surajair',
          display_name: 'Suraj Air',
          user_email: 'surajair@gmail.com'
        };
      };

      return UserModel;

    })(Backbone.Model);
    Users.UserCollection = (function(_super) {
      __extends(UserCollection, _super);

      function UserCollection() {
        return UserCollection.__super__.constructor.apply(this, arguments);
      }

      UserCollection.prototype.model = Users.UserModel;

      return UserCollection;

    })(Backbone.Collection);
    API = {
      getUserProfile: function(userId) {
        var user;
        user = new Users.UserModel({
          id: userId
        });
        user.url = AJAXURL + '?action=get-user-profile';
        user.fetch;
        return user;
      }
    };
    return App.reqres.setHandler("get:user:profile", function(options) {
      var userId;
      if (options == null) {
        options = {};
      }
      userId = options.userId;
      return API.getUserProfile(userId);
    });
  });
});
