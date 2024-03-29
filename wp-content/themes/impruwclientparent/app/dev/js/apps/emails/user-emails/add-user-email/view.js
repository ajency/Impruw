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

      AddUserEmailView.prototype.className = 'form-horizontal';

      AddUserEmailView.prototype.template = '<div class="form-group"> <label for="email-emailid" class="col-sm-3 control-label">{{#polyglot}}Email Address:{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <div class="input-group"> <input id="email_username" name="email_username" type="text" value="" class="form-control" required placeholder="username" maxlength="20" minlength="3"> <span class="input-group-addon">@{{domain_name}}</span> </div> </div> <input id="email_domain" name="email_domain" type="hidden" value="{{domain_name}}" class="form-control"> </div> <div class="form-group"> <label for="email-firstName" class="col-sm-3 control-label">{{#polyglot}}First name:{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <input id="email-firstName" name="firstName" type="text" value="{{firstName}}" class="form-control" required> </div> </div> <div class="form-group"> <label for="email-lastName" class="col-sm-3 control-label">{{#polyglot}}Last name:{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <input id="email-lastName" name="lastName" type="text" value="{{lastName}}" class="form-control" required> </div> </div> <div class="form-group"> <label for="email-password" class="col-sm-3 control-label">{{#polyglot}}Password:{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <input id="email-password" name="password" type="password" value="{{password}}" class="form-control" required minlength="6"> </div> </div> <div class="form-group"> <div class="col-sm-9 col-sm-offset-3"> <button class="btn btn-sm aj-imp-orange-btn js-add-user-submit">{{#polyglot}}Add User{{/polyglot}}</button> </div> </div>';

      AddUserEmailView.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Add a User'),
        modal_size: 'small-modal'
      };

      AddUserEmailView.prototype.events = {
        'click .js-add-user-submit': function(e) {
          var data, doesMatch, username;
          e.preventDefault();
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            data.email_id = data.email_username + '@' + this.model.get('domain_name');
            username = data.email_username;
            doesMatch = /^\d+$/.test(username);
            if (doesMatch) {
              this.$el.parent().find('.alert').remove();
              this.$el.parent().prepend("<div class=\"alert alert-error\">" + _.polyglot.t("Email address should contain atleast one letter") + "</div>");
              return this.$el.find('#email_username').val('');
            } else {
              if (this.validateEmail(data.email_id)) {
                this.$el.parent().find('.alert').remove();
                if (PLAN_FEATURE_COUNT['email_account'][0]['current_count'] < PLAN_FEATURE_COUNT['email_account'][0]['allowed_count']) {
                  return this.trigger("add:user:email", data);
                } else {
                  this.$el.parent().find('.alert').remove();
                  return this.$el.parent().prepend("<div class=\"alert alert-error\">" + _.polyglot.t("You cannot add another email account since the maximum limit for email accounts has reached ") + "</div>");
                }
              } else {
                this.$el.parent().find('.alert').remove();
                this.$el.parent().prepend("<div class=\"alert alert-error\">" + _.polyglot.t("Email address is not in correct format") + "</div>");
                return this.$el.find('#email_username').val('');
              }
            }
          }
        },
        'blur #email_username': function(evt) {
          var username;
          username = $(evt.target).val();
          username = username.toLowerCase();
          return $(evt.target).val(username);
        }
      };

      AddUserEmailView.prototype.onSavedUserEmail = function(response) {
        var msg;
        if (response.code === 'OK') {
          msg = _.polyglot.t("New user email created");
          this.$el.parent().find('.alert').remove();
          this.$el.parent().prepend("<div class=\"alert alert-success\">" + msg + "</div>");
          return this.$el.find('input').val('');
        } else if (response.code === 'ERROR') {
          msg = _.polyglot.t(response.msg);
          this.$el.parent().find('.alert').remove();
          this.$el.parent().prepend("<div class=\"alert alert-success\">" + msg + "</div>");
          return this.$el.find('#email_username').val('');
        }
      };

      AddUserEmailView.prototype.validateEmail = function(email) {
        var emailReg, valid;
        emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        valid = emailReg.test(email);
        if (!valid) {
          return false;
        } else {
          return true;
        }
      };

      return AddUserEmailView;

    })(Marionette.ItemView);
  });
});
