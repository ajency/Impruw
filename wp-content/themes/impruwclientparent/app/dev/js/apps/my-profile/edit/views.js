var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'tpl!apps/my-profile/edit/templates/mainview', 'tpl!apps/my-profile/edit/templates/generalform', 'tpl!apps/my-profile/edit/templates/passwordform'], function(App, mainviewTpl, generalformTpl, passwordformTpl) {
  App.module('MyProfileApp.Edit.View', function(View, App, Backbone, Marionette, $, _) {
    View.Layout = (function(_super) {
      __extends(Layout, _super);

      function Layout() {
        return Layout.__super__.constructor.apply(this, arguments);
      }

      Layout.prototype.template = mainviewTpl;

      Layout.prototype.regions = {
        generalFormRegion: '#user-general-form',
        passwordFormRegion: '#form-userpass'
      };

      Layout.prototype.onRender = function() {
        this.$el.find('input[type="checkbox"]').checkbox();
        this.$el.find('input[type="radio"]').radio();
        return this.$el.find('select').selectpicker({
          style: 'btn-mini btn-default',
          menuStyle: 'dropdown'
        });
      };

      return Layout;

    })(Marionette.Layout);
    View.GeneralForm = (function(_super) {
      __extends(GeneralForm, _super);

      function GeneralForm() {
        return GeneralForm.__super__.constructor.apply(this, arguments);
      }

      GeneralForm.prototype.template = generalformTpl;

      return GeneralForm;

    })(Marionette.FormView);
    return View.PasswordForm = (function(_super) {
      __extends(PasswordForm, _super);

      function PasswordForm() {
        return PasswordForm.__super__.constructor.apply(this, arguments);
      }

      PasswordForm.prototype.template = passwordformTpl;

      return PasswordForm;

    })(Marionette.FormView);
  });
  return App.MyProfileApp.Edit.View;
});
