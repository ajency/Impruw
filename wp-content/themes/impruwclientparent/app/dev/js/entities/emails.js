var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.UserEmails", function(UserEmails, App, Backbone, Marionette, $, _) {
    var API, EmailCollection, userEmailCollection;
    window.UserEmail = (function(_super) {
      __extends(UserEmail, _super);

      function UserEmail() {
        return UserEmail.__super__.constructor.apply(this, arguments);
      }

      UserEmail.prototype.name = 'user-email';

      UserEmail.prototype.idAttribute = 'email';

      UserEmail.prototype.defaults = function() {
        return {
          firstName: '',
          lastName: ''
        };
      };

      UserEmail.prototype.sync = function(method, entity, options) {
        if (options == null) {
          options = {};
        }
        return window._bsync(method, entity, options);
      };

      UserEmail.prototype.url = function() {
        return SITEURL + '/api/email';
      };

      return UserEmail;

    })(Backbone.Model);
    EmailCollection = (function(_super) {
      __extends(EmailCollection, _super);

      function EmailCollection() {
        return EmailCollection.__super__.constructor.apply(this, arguments);
      }

      EmailCollection.prototype.model = UserEmail;

      EmailCollection.prototype.url = function() {
        return SITEURL + "/api/email/domain/" + DOMAIN_NAME;
      };

      return EmailCollection;

    })(Backbone.Collection);
    userEmailCollection = new EmailCollection;
    API = {
      getUserEmailCollection: function() {
        userEmailCollection.fetch();
        return userEmailCollection;
      },
      createUserEmailModel: function(data) {
        var userEmail;
        if (data == null) {
          data = {};
        }
        userEmail = new UserEmail(data);
        return userEmail;
      },
      getUserEmailById: function(emailId) {
        var userEmail;
        userEmailCollection = new EmailCollection;
        userEmail = userEmailCollection.get(emailId);
        return userEmail;
      }
    };
    App.reqres.setHandler("get:user:email:collection", function() {
      return API.getUserEmailCollection();
    });
    App.reqres.setHandler("create:user:email:model", function(data) {
      return API.createUserEmailModel(data);
    });
    return App.reqres.setHandler("get:user:email:by:id", function(emailId) {
      return API.getUserEmailById(emailId);
    });
  });
});
