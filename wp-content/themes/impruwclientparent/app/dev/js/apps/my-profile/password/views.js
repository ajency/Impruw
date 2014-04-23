var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/my-profile/password/templates/passwordform.html'], function(App, passwordformTpl) {
  return App.module('MyProfileApp.Password.View', function(View, App, Backbone, Marionette, $, _) {
    return View.PasswordForm = (function(_super) {
      __extends(PasswordForm, _super);

      function PasswordForm() {
        return PasswordForm.__super__.constructor.apply(this, arguments);
      }

      PasswordForm.prototype.tagName = 'form';

      PasswordForm.prototype.template = passwordformTpl;

      PasswordForm.prototype.className = 'form-horizontal password-form';

      PasswordForm.prototype.events = {
        'click #btn-update-password': function(e) {
          var a;
          a = this.$el.find('.password-form').validate({
            rules: {
              newpass1: "required",
              newpass2: {
                equalTo: "#newpass1"
              }
            }
          });
          return console.log(a);
        }
      };

      PasswordForm.prototype.onPasswordAjaxResponse = function(response) {
        if (response === 0) {
          this.$el.find('.alert').remove();
          this.$el.prepend('<div class="alert alert-success">Password mismatch</div>');
          return this.$el.find('#btn-update-password').attr({
            'disabled': 'disabled'
          });
        } else {
          this.$el.find('.alert').remove();
          return this.$el.prepend('<div class="alert alert-success">Password Updated.Login again</div>');
        }
      };

      return PasswordForm;

    })(Marionette.ItemView);
  });
});
