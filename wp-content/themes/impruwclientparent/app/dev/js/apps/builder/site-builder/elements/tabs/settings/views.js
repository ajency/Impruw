var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/site-builder/elements/tabs/settings/templates/settings.html'], function(App, settingsTpl) {
  return App.module('SiteBuilderApp.Element.Tabs.Settings.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.SettingsView = (function(_super) {
      __extends(SettingsView, _super);

      function SettingsView() {
        return SettingsView.__super__.constructor.apply(this, arguments);
      }

      SettingsView.prototype.template = settingsTpl;

      SettingsView.prototype.className = 'modal-content settings-box';

      SettingsView.prototype.initialize = function(opt) {
        if (opt == null) {
          opt = {};
        }
        this.eleModel = opt.eleModel;
        return SettingsView.__super__.initialize.call(this, opt);
      };

      SettingsView.prototype.onRender = function() {
        this.$el.find('input[type="checkbox"]').radiocheck();
        this.$el.find('select').selectpicker();
        return this.setFields();
      };

      SettingsView.prototype.setFields = function() {
        if (this.eleModel.get('draggable') === true) {
          this.$el.find('input[name="draggable"]').radiocheck('check');
        }
        if (this.eleModel.get('justified') === true) {
          this.$el.find('input[name="justified"]').radiocheck('check');
        }
        return this.$el.find('select[name="style"]').selectpicker('val', this.eleModel.get('style')).selectpicker('refresh');
      };

      SettingsView.prototype.events = {
        'click .close-settings': function(evt) {
          evt.preventDefault();
          return App.settingsRegion.close();
        },
        'change input[name="draggable"]': function(evt) {
          return this.trigger("element:draggable:changed", $(evt.target).is(':checked'));
        },
        'change input[name="justified"]': function(evt) {
          return this.trigger("element:justified:changed", $(evt.target).is(':checked'));
        },
        'change select[name="style"]': function(evt) {
          return this.trigger("element:style:changed", $(evt.target).val());
        }
      };

      return SettingsView;

    })(Marionette.ItemView);
  });
});
