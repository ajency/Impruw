var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/my-profile/edit/templates/mainview.html', 'text!apps/my-profile/edit/templates/generalform.html', 'text!apps/my-profile/edit/templates/passwordform.html'], function(App, mainviewTpl, generalformTpl, passwordformTpl) {
  return App.module('MyProfileApp.Edit.View', function(View, App, Backbone, Marionette, $, _) {
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

      Layout.prototype.events = {
        'click #btn_update_language': function(e) {
          var data;
          data = $(e.target).closest('form').find('select').val();
          return this.trigger("update:user:language", {
            'user_language': data
          });
        }
      };

      Layout.prototype.onShow = function() {
        this.$el.find('input[type="checkbox"]').checkbox();
        return this.$el.find('select').selectpicker();
      };

      return Layout;

    })(Marionette.Layout);
    View.GeneralForm = (function(_super) {
      __extends(GeneralForm, _super);

      function GeneralForm() {
        return GeneralForm.__super__.constructor.apply(this, arguments);
      }

      GeneralForm.prototype.tagName = 'form';

      GeneralForm.prototype.template = generalformTpl;

      GeneralForm.prototype.className = 'form-horizontal';

      GeneralForm.prototype.onRender = function() {
        return this.$el.find('input[type="checkbox"]').checkbox();
      };

      GeneralForm.prototype.events = {
        'click #btn-update-info': function(e) {
          var data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            return this.trigger("update:user:info", data);
          }
        }
      };

      return GeneralForm;

    })(Marionette.ItemView);
    return View.PasswordForm = (function(_super) {
      __extends(PasswordForm, _super);

      function PasswordForm() {
        return PasswordForm.__super__.constructor.apply(this, arguments);
      }

      PasswordForm.prototype.tagName = 'form';

      PasswordForm.prototype.template = passwordformTpl;

      PasswordForm.prototype.className = 'form-horizontal';

      PasswordForm.prototype.events = {
        'click #btn-update-password': function(e) {
          var data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            return this.trigger("update:user:password", data);
          }
        }
      };

      return PasswordForm;

    })(Marionette.ItemView);
  });
});
