var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/site-builder/elements/slider/settings/templates/settings.html'], function(App, settingsTpl) {
  return App.module('SiteBuilderApp.Element.Slider.Settings.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.SettingsView = (function(_super) {
      __extends(SettingsView, _super);

      function SettingsView() {
        return SettingsView.__super__.constructor.apply(this, arguments);
      }

      SettingsView.prototype.template = settingsTpl;

      SettingsView.prototype.className = 'modal-content settings-box';

      SettingsView.prototype.mixinTemplateHelpers = function(data) {
        data = SettingsView.__super__.mixinTemplateHelpers.call(this, data);
        data.transitions = [
          {
            name: 'Fade',
            value: 'fade'
          }, {
            name: 'Slide To Left',
            value: 'slideleft'
          }, {
            name: 'No Transition',
            value: 'notransition'
          }, {
            name: 'Fly In',
            value: 'flyin'
          }, {
            name: 'Paper Cut',
            value: 'papercut'
          }, {
            name: 'Slide Boxes',
            value: 'boxslide'
          }
        ];
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
        this.$el.find('input[type="checkbox"]').checkbox();
        this.setFields();
        return this.$el.find('select').selectpicker();
      };

      SettingsView.prototype.setFields = function() {
        if (this.eleModel.get('draggable') === true) {
          this.$el.find('input[name="draggable"]').checkbox('check');
        }
        this.$el.find('select[name="slide_transition"]').val(this.eleModel.get('reset_transitions'));
        this.$el.find('select[name="align"]').val(this.eleModel.get('align'));
        this.$el.find('select[name="top_margin"]').val(this.eleModel.get('top_margin'));
        this.$el.find('select[name="left_margin"]').val(this.eleModel.get('left_margin'));
        this.$el.find('select[name="bottom_margin"]').val(this.eleModel.get('bottom_margin'));
        return this.$el.find('select[name="right_margin"]').val(this.eleModel.get('right_margin'));
      };

      SettingsView.prototype.events = {
        'click .close-settings': function(evt) {
          evt.preventDefault();
          return App.settingsRegion.close();
        },
        'change select[name="slider_id"]': function(evt) {
          return this.trigger("element:slider_id:changed", $(evt.target).val());
        },
        'change select[name="slide_transition"]': function(evt) {
          return this.trigger("element:slide:transition:changed", $(evt.target).val());
        },
        'change input[name="draggable"]': function(evt) {
          return this.trigger("element:draggable:changed", $(evt.target).is(':checked'));
        },
        'change select.spacing': function(evt) {
          return this.trigger("element:spacing:changed", $(evt.target).attr('name'), $(evt.target).val());
        }
      };

      return SettingsView;

    })(Marionette.ItemView);
  });
});
