var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('EmailsApp.UserEmails.EditUserEmail.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.EditUserEmailView = (function(_super) {
      __extends(EditUserEmailView, _super);

      function EditUserEmailView() {
        return EditUserEmailView.__super__.constructor.apply(this, arguments);
      }

      EditUserEmailView.prototype.tagName = 'form';

      EditUserEmailView.prototype.className = 'form-horizontal';

      EditUserEmailView.prototype.template = '<div class="form-group"> <label for="email-emailid" class="col-sm-3 control-label">{{#polyglot}}Email Address:{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <label>{{email}}</label> <input id="email_id" name="email_id" type="hidden" value="{{email}}" class="form-control"> </div> </div> <div class="form-group"> <label for="email-firstName" class="col-sm-3 control-label">{{#polyglot}}First name:{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <input id="email-firstName" name="firstName" type="text" value="{{firstName}}" class="form-control" required> </div> </div> <div class="form-group"> <label for="email-lastName" class="col-sm-3 control-label">{{#polyglot}}Last name:{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <input id="email-lastName" name="lastName" type="text" value="{{lastName}}" class="form-control" required> </div> </div> <div class="form-group"> <label for="email-password" class="col-sm-3 control-label">{{#polyglot}}Reset Password:{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <input id="email-password" name="password" type="password" value="" class="form-control" required> </div> </div> <div class="form-group"> <div class="col-sm-9 col-sm-offset-3"> <button class="btn btn-sm aj-imp-orange-btn js-edit-user-submit">{{#polyglot}}Update{{/polyglot}}</button> </div> </div>';

      EditUserEmailView.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Edit a User'),
        modal_size: 'small-modal'
      };

      EditUserEmailView.prototype.events = {
        'click .js-edit-user-submit': function(e) {
          var data;
          e.preventDefault();
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            console.log(data);
            return this.trigger("edit:user:email", data);
          }
        }
      };

      EditUserEmailView.prototype.mixinTemplateHelpers = function(data) {
        var str;
        data = EditUserEmailView.__super__.mixinTemplateHelpers.call(this, data);
        console.log(data);
        str = data.name;
        console.log(str);
        data.firstName = function() {
          var firstname;
          if (str === null) {
            firstname = "";
          } else {
            firstname = str.substr(0, str.indexOf(" "));
          }
          return firstname;
        };
        data.lastName = function() {
          var lastname;
          if (str === null) {
            lastname = "";
          } else {
            lastname = str.substr(str.indexOf(" ") + 1);
          }
          return lastname;
        };
        return data;
      };

      EditUserEmailView.prototype.onSavedUserEmail = function() {
        this.$el.parent().find('.alert').remove();
        return this.$el.parent().prepend("<div class=\"alert alert-success\">" + _.polyglot.t("Email account details updated") + "</div>");
      };

      return EditUserEmailView;

    })(Marionette.ItemView);
  });
});
