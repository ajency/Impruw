var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/emails/user-emails/show/view'], function(App, AppController) {
  return App.module('EmailsApp.UserEmails', function(UserEmails, App, Backbone, Marionette, $, _) {
    UserEmails.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.userEmailCollection = App.request("get:user:email:collection");
        this.userEmailView = this._getuserEmailView();
        this.listenTo(this.userEmailView, "add:new:user:email", this.addNewUserEmail);
        this.listenTo(this.userEmailView, "childview:disable:user:email", this.disableUserEmail);
        this.listenTo(this.userEmailView, "childview:delete:user:email", this.deleteUserEmail);
        return this.show(this.userEmailView, {
          loading: true
        });
      };

      Controller.prototype._getuserEmailView = function() {
        return new UserEmails.Views.UserEmailView({
          collection: this.userEmailCollection
        });
      };

      Controller.prototype.addNewUserEmail = function() {
        return Marionette.triggerMethod.call(this.region, "show:add:user:email");
      };

      Controller.prototype.disableUserEmail = function(view, email_id) {
        var options, postURL, userModel;
        postURL = SITEURL + '/api/email/' + email_id;
        userModel = view.model;
        options = {
          method: 'PUT',
          url: postURL
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            if (response.code === 'OK') {
              return userModel.set({
                'has_password': response.data.has_password
              });
            } else {
              return _this.userEmailView.triggerMethod("suspend:email", response.msg);
            }
          };
        })(this));
      };

      Controller.prototype.deleteUserEmail = function(view, email_id) {
        var options, postURL;
        postURL = SITEURL + '/api/email/' + email_id;
        options = {
          method: 'DELETE',
          url: postURL
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            var siteid, update_feature_count;
            if (response.code === 'OK') {
              _this.userEmailCollection.remove(view.model);
              siteid = SITEID['id'];
              return update_feature_count = App.request("update:site:feature:count", siteid, 'email_account', 'minus');
            } else {
              return _this.userEmailView.triggerMethod("delete:email", response.msg);
            }
          };
        })(this));
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:user:emails:app", function(opts) {
      return new UserEmails.Controller(opts);
    });
  });
});
