var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/site-builder/elements/smarttable/settings/templates/settings.html'], function(App, settingsTpl) {
  return App.module('SiteBuilderApp.Element.SmartTable.Settings.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.SettingsView = (function(_super) {
      __extends(SettingsView, _super);

      function SettingsView() {
        return SettingsView.__super__.constructor.apply(this, arguments);
      }

      SettingsView.prototype.template = settingsTpl;

      SettingsView.prototype.className = 'modal-content settings-box';

      SettingsView.prototype.mixinTemplateHelpers = function(data) {
        data = SettingsView.__super__.mixinTemplateHelpers.call(this, data);
        data.innerStyle = this.getInnerStyles(this.eleModel.get('style'));
        return data;
      };

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
        this.$el.find('select[name="type"]').selectpicker('val', this.eleModel.get('style'));
        this.$el.find('select[name="type"]').selectpicker('refresh');
        this.$el.find('select[name="style"]').selectpicker('val', this.eleModel.get('innerStyle'));
        return this.$el.find('select[name="style"]').selectpicker('refresh');
      };

      SettingsView.prototype.events = {
        'click .close-settings': function(evt) {
          evt.preventDefault();
          return App.settingsRegion.close();
        },
        'change input[name="draggable"]': function(evt) {
          return this.trigger("element:draggable:changed", $(evt.target).is(':checked'));
        },
        'change select[name="style"]': function(evt) {
          return this.trigger("element:inner:style:changed", $(evt.target).val());
        },
        'change select[name="type"]': function(evt) {
          this.trigger("element:style:changed", $(evt.target).val());
          return this.populateInnerStyleDropdown($(evt.target).val());
        }
      };

      SettingsView.prototype.getInnerStyles = function(style) {
        var type;
        type = _.findWhere(this.model.get('styles'), {
          name: style
        });
        return type.inner_style;
      };

      SettingsView.prototype.populateInnerStyleDropdown = function(style) {
        var innerStyle, options;
        innerStyle = this.getInnerStyles(style);
        options = '';
        _.each(innerStyle, function(stl) {
          return options += "<option value='" + stl + "'>" + stl + "</option>";
        });
        this.$el.find('select[name="style"]').html(options);
        this.$el.find('select[name="style"]').selectpicker('val', 'Default');
        return this.$el.find('select[name="style"]').selectpicker('refresh');
      };

      return SettingsView;

    })(Marionette.ItemView);
  });
});
