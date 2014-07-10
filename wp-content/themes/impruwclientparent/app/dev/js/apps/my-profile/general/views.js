var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/my-profile/general/templates/generalform.html'], function(App, generalformTpl) {
  return App.module('MyProfileApp.General.View', function(View, App, Backbone, Marionette, $, _) {
    return View.GeneralForm = (function(_super) {
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

      GeneralForm.prototype.onShow = function() {
        var val;
        val = this.model.get('new_feature_alert');
        if (val === 'true') {
          return this.$el.find('.checkbox').addClass('checked');
        } else {
          return this.$el.find('.checkbox').removeClass('checked');
        }
      };

      GeneralForm.prototype.serializeData = function() {
        var data;
        data = GeneralForm.__super__.serializeData.call(this);
        data.display_name = (this.model.get('data')).display_name;
        data.user_email = (this.model.get('data')).user_email;
        return data;
      };

      GeneralForm.prototype.events = {
        'click #btn-update-info': function(e) {
          var data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            return this.trigger("update:user:info:click", data);
          }
        }
      };

      GeneralForm.prototype.onUserInfoUpdated = function() {
        this.$el.find('.alert').remove();
        return this.$el.prepend('<div class="alert alert-success">' + _.polyglot.t("User info updated") + '</div>');
      };

      return GeneralForm;

    })(Marionette.ItemView);
  });
});
