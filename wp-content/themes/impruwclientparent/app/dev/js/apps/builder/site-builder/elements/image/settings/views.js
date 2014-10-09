var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/site-builder/elements/image/settings/templates/settings.html'], function(App, settingsTpl) {
  return App.module('SiteBuilderApp.Element.Image.Settings.Views', function(Views, App, Backbone, Marionette, $, _) {
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
        this.$el.find('input[type="checkbox"]').checkbox();
        this.$el.find('select').selectpicker();
        return this.setFields();
      };

      SettingsView.prototype.setFields = function() {
        if (this.eleModel.get('draggable') === true) {
          this.$el.find('input[name="draggable"]').checkbox('check');
        }
        if (this.eleModel.get('link_check') === true) {
          this.$el.find('input[name="link_check"]').checkbox('check');
        }
        if (this.eleModel.get('target') === '_BLANK') {
          this.$el.find('input[name="target"]').checkbox('check');
        }
        this.$el.find("input[name='link']").val(this.eleModel.get('link'));
        this.$el.find('select[name="align"]').selectpicker('val', this.eleModel.get('align'));
        this.$el.find('select[name="top_margin"]').selectpicker('val', this.eleModel.get('top_margin'));
        this.$el.find('select[name="left_margin"]').selectpicker('val', this.eleModel.get('left_margin'));
        this.$el.find('select[name="bottom_margin"]').selectpicker('val', this.eleModel.get('bottom_margin'));
        return this.$el.find('select[name="right_margin"]').selectpicker('val', this.eleModel.get('right_margin'));
      };

      SettingsView.prototype.events = {
        'click .close-settings': function(evt) {
          evt.preventDefault();
          return App.settingsRegion.close();
        },
        'change input[name="draggable"]': function(evt) {
          return this.trigger("element:draggable:changed", $(evt.target).is(':checked'));
        },
        'change input[name="link_check"]': function(evt) {
          return this.trigger("element:linkcheck:changed", $(evt.target).is(':checked'));
        },
        'change select[name="align"]': function(evt) {
          return this.trigger("element:alignment:changed", $(evt.target).val());
        },
        'change select.spacing': function(evt) {
          return this.trigger("element:spacing:changed", $(evt.target).attr('name'), $(evt.target).val());
        },
        'change input[name="target"]': function(evt) {
          return this.trigger("element:target:changed", $(evt.target).is(':checked') ? '_BLANK' : '_self');
        },
        'blur input.linktext': function(evt) {
          if ($(evt.target).val().substring(0, 7) !== "http://" && $(evt.target).val().substring(0, 2) !== "//") {
            $(evt.target).val("http://" + $(evt.target).val());
          }
          return this.trigger("element:link:changed", $(evt.target).val());
        }
      };

      SettingsView.prototype.onBeforeClose = function() {
        this.$el.find('input.linktext').trigger('blur');
        return true;
      };

      return SettingsView;

    })(Marionette.ItemView);
  });
});
