var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/emails/user-emails/edit-user-email/view'], function(App, AppController) {
  return App.module('EmailsApp.UserEmails.EditUserEmail', function(EditUserEmail, App, Backbone, Marionette, $, _) {
    EditUserEmail.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.userEmailModel = opts.model;
        this.editUserEmailView = this._geteditUserEmailView();
        this.listenTo(this.editUserEmailView, "edit:user:email", this.editUserEmail);
        return this.show(this.editUserEmailView, {
          loading: true
        });
      };

      Controller.prototype._geteditUserEmailView = function() {
        return new EditUserEmail.Views.EditUserEmailView({
          model: this.userEmailModel
        });
      };

      Controller.prototype.editUserEmail = function(data) {
        var email_id, new_password, options, postURL;
        console.log("Editing new user email");
        email_id = data.email_id;
        new_password = data.password;
        console.log(data.email_id);
        postURL = SITEURL + '/api/email/' + email_id;
        console.log(postURL);
        options = {
          method: 'POST',
          url: postURL,
          data: {
            'password': new_password,
            'firstName': data.firstName,
            'lastName': data.lastName
          }
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            console.log("Edit email success");
            console.log(response.data.name);
            _this.userEmailModel.set({
              'name': response.data.name
            });
            return _this.editUserEmailView.triggerMethod("saved:user:email");
          };
        })(this));
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:edit:user:email", function(opts) {
      opts = {
        region: App.dialogRegion,
        model: opts.model
      };
      return new EditUserEmail.Controller(opts);
    });
  });
});
