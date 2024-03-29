var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Users", function(Users, App, Backbone, Marionette, $, _) {
    var API, user;
    Users.UserModel = (function(_super) {
      __extends(UserModel, _super);

      function UserModel() {
        return UserModel.__super__.constructor.apply(this, arguments);
      }

      UserModel.prototype.name = 'user';

      UserModel.prototype.idAttribute = 'ID';

      UserModel.prototype.user_lang = '';

      return UserModel;

    })(Backbone.Model);
    user = new Users.UserModel;
    user.set(USER);
    API = {
      getUserProfile: function() {
        return user;
      }
    };
    return App.reqres.setHandler("get:user:model", function(options) {
      if (options == null) {
        options = {};
      }
      return API.getUserProfile();
    });
  });
});
