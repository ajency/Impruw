var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/site-builder/elements/spacer/settings/templates/settings.html'], function(App, settingsTpl) {
  return App.module('SiteBuilderApp.Element.Spacer.Settings.Views', function(Views, App, Backbone, Marionette, $, _) {
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
        var style;
        if (this.eleModel.get('draggable') === true) {
          this.$el.find('input[name="draggable"]').radiocheck('check');
        }
        this.$el.find('select[name="top_margin"]').selectpicker('val', this.eleModel.get('top_margin'));
        this.$el.find('select[name="left_margin"]').selectpicker('val', this.eleModel.get('left_margin'));
        this.$el.find('select[name="bottom_margin"]').selectpicker('val', this.eleModel.get('bottom_margin'));
        this.$el.find('select[name="right_margin"]').selectpicker('val', this.eleModel.get('right_margin'));
        style = this.eleModel.get('style');
        this.$el.find('select[name="type"]').selectpicker('val', this.eleModel.get('type')).selectpicker('refresh');
        return this.$el.find('select[name="style"]').selectpicker('val', style).selectpicker('refresh');
      };

      SettingsView.prototype.events = {
        'click .close-settings': function(evt) {
          evt.preventDefault();
          return App.settingsRegion.empty();
        },
        'change select[name="type"]': function(evt) {
          return this.trigger("element:type:changed", $(evt.target).val());
        },
        'change select[name="style"]': function(evt) {
          return this.trigger("element:style:changed", $(evt.target).val());
        },
        'change input[name="draggable"]': function(evt) {
          return this.trigger("element:draggable:changed", $(evt.target).is(':checked'));
        },
        'change select.spacing': function(evt) {
          return this.trigger("element:spacing:changed", $(evt.target).attr('name'), $(evt.target).val());
        }
      };

      SettingsView.prototype.onTypeBlank = function() {
        return this.$el.find('.style, .prim-colors , .sec-colors').hide();
      };

      SettingsView.prototype.onTypeLine = function() {
        var html;
        this.$el.find(' .sec-colors').hide();
        this.$el.find('.style, .prim-colors ').show();
        html = '';
        _.each(this.model.get('styles')[0], (function(_this) {
          return function(style, index) {
            return html += "<option value='" + style.value + "'>" + style.name + "</option>";
          };
        })(this));
        return this.$el.find('.style').find('select').html(html).selectpicker('refresh');
      };

      SettingsView.prototype.onTypePattern = function() {
        var html;
        this.$el.find('.style, .prim-colors , .sec-colors').show();
        html = '';
        _.each(this.model.get('styles')[1], (function(_this) {
          return function(style, index) {
            return html += "<option value='" + style.value + "'>" + style.name + "</option>";
          };
        })(this));
        return this.$el.find('.style').find('select').html(html).selectpicker('refresh');
      };

      return SettingsView;

    })(Marionette.ItemView);
  });
});
