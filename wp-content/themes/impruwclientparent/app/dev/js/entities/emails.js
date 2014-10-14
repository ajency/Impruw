var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.UserEmails", function(UserEmails, App, Backbone, Marionette, $, _) {
    var API, EmailCollection, UserEmail;
    UserEmail = (function(_super) {
      __extends(UserEmail, _super);

      function UserEmail() {
        return UserEmail.__super__.constructor.apply(this, arguments);
      }

      UserEmail.prototype.name = 'user-email';

      UserEmail.prototype.idAttribute = 'user-email-id';

      UserEmail.prototype.defaults = function() {
        return {
          firstName: 'N/A',
          lastName: 'N/A'
        };
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
        return "" + AJAXURL + "?action=fetch-user-emails";
      };

      return EmailCollection;

    })(Backbone.Collection);
    API = {
      getUserEmailCollection: function() {
        var userEmailCollection;
        userEmailCollection = new EmailCollection;
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
        var userEmail, userEmailCollection;
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
