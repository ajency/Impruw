var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('EmailsApp.UserEmails.AddUserEmail.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.AddUserEmailView = (function(_super) {
      __extends(AddUserEmailView, _super);

      function AddUserEmailView() {
        return AddUserEmailView.__super__.constructor.apply(this, arguments);
      }

      AddUserEmailView.prototype.tagName = 'form';

      AddUserEmailView.prototype.template = '<div class="control-group"> <label for="email-firstName" class="control-label">First name:</label> <input id="email-firstName" name="firstName" type="text" value="{{firstName}}"/> </div> <div class="control-group"> <label for="email-lastName" class="control-label">Last name:</label> <input id="email-lastName" name="lastName" type="text" value="{{lastName}}"/> </div> <div class="control-group"> <label for="email-emailid" class="control-label">Email Id:</label> <input id="email-emailid" name="emailId" type="text" value="{{emailId}}"/> </div> <div class="control-group"> <label for="email-password" class="control-label">Password:</label> <input id="email-password" name="password" type="password" value="{{password}}"/> </div> <button class="btn js-add-user-submit">Save</button>';

      AddUserEmailView.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Add User'),
        modal_size: 'medium-modal'
      };

      AddUserEmailView.prototype.events = {
        'click .js-add-user-submit': function(e) {
          var data;
          e.preventDefault();
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            return this.trigger("add:user:email", data);
          }
        }
      };

      return AddUserEmailView;

    })(Marionette.ItemView);
  });
});
