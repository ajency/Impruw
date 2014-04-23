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
          var data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            return this.trigger("update:password:clicked", data);
          }
        },
        'blur #currentpass': function() {
          var enteredPassword;
          enteredPassword = this.$el.find('#currentpass').val();
          return this.trigger("check:password:current", enteredPassword);
        }
      };

      PasswordForm.prototype.onPasswordCheckResponse = function(response) {
        var data;
        data = response.data;
        if (data === 0) {
          this.$el.find('.alert').remove();
          this.$el.prepend('<div class="alert alert-success">Password mismatch</div>');
          return this.$el.find('#btn-update-password').attr({
            'disabled': 'disabled'
          });
        } else {
          return this.$el.find('.alert').remove();
        }
      };

      return PasswordForm;

    })(Marionette.ItemView);
  });
});
