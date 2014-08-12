var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/my-profile/password/templates/passwordform.html'], function(App, passwordformTpl) {
  return App.module('MyProfileApp.Password.View', function(View, App, Backbone, Marionette, $, _) {
    return View.PasswordForm = (function(_super) {
      __extends(PasswordForm, _super);

      function PasswordForm() {
        this.onPasswordAjaxResponse = __bind(this.onPasswordAjaxResponse, this);
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
        }
      };

      PasswordForm.prototype.onShow = function() {
        return this.$el.validate({
          rules: {
            newPassword: {
              required: true,
              minlength: 6
            },
            confirmNewPassword: {
              equalTo: "#newPassword"
            }
          }
        });
      };

      PasswordForm.prototype.onPasswordAjaxResponse = function(response) {
        if (response === '0') {
          return this.passwordErrorResponse();
        } else {
          return this.passwordSuccessResponse();
        }
      };

      PasswordForm.prototype.onPasswordErrorResponse = function(errorMsg) {
        this.$el.find('.alert').remove();
        errorMsg = _.polyglot.t(errorMsg);
        return this.$el.prepend("<div class='alert alert-success'>" + errorMsg + "</div>");
      };

      PasswordForm.prototype.onPasswordSuccessResponse = function(redirectUrl) {
        var successMsg;
        successMsg = _.polyglot.t("Password change success");
        this.$el.find('.alert').remove();
        this.$el.prepend("<div class='alert alert-success'>" + successMsg + "</div>");
        return _.delay((function(_this) {
          return function() {
            return _this.redirectPage(redirectUrl);
          };
        })(this), 40);
      };

      PasswordForm.prototype.redirectPage = function(redirectUrl) {
        return window.location.href = redirectUrl;
      };

      return PasswordForm;

    })(Marionette.ItemView);
  });
});
