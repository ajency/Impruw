var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/my-profile/language/templates/languageView.html'], function(App, langformTpl) {
  return App.module('MyProfileApp.Language.View', function(View, App, Backbone, Marionette, $, _) {
    return View.LanguageForm = (function(_super) {
      __extends(LanguageForm, _super);

      function LanguageForm() {
        return LanguageForm.__super__.constructor.apply(this, arguments);
      }

      LanguageForm.prototype.tagName = 'form';

      LanguageForm.prototype.template = langformTpl;

      LanguageForm.prototype.className = 'form-horizontal clearfix ';

      LanguageForm.prototype.onShow = function() {
        return this.$el.find('select').selectpicker();
      };

      LanguageForm.prototype.events = {
        'click #btn_update_language': function() {
          var langName;
          langName = this.$el.find('.dropdown-toggle').attr('title');
          return this.trigger("update:user:lang:click", langName);
        }
      };

      return LanguageForm;

    })(Marionette.ItemView);
  });
});
