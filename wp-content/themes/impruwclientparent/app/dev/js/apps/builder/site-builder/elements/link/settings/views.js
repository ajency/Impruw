var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/site-builder/elements/link/settings/templates/settings.html'], function(App, settingsTpl) {
  return App.module('SiteBuilderApp.Element.Link.Settings.Views', function(Views, App, Backbone, Marionette, $, _) {
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
        if (this.eleModel.get('target') === '_BLANK') {
          this.$el.find('input[name="target"]').radiocheck('check');
        }
        _.each(['link', 'text'], (function(_this) {
          return function(field, i) {
            var textval;
            _this.$el.find("input[name='" + field + "']").val(_this.eleModel.get(field));
            if (field === 'text') {
              textval = _this.eleModel.get(field);
              return _this.$el.find("input[name='" + field + "']").val(textval[WPML_DEFAULT_LANG]);
            }
          };
        })(this));
        this.$el.find('select[name="style"]').selectpicker('val', this.eleModel.get('style'));
        this.$el.find('select[name="align"]').selectpicker('val', this.eleModel.get('align'));
        return this.$el.find('select[name="link_page"]').selectpicker('val', this.eleModel.get('link_page_id'));
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
          return this.trigger("element:style:changed", $(evt.target).val());
        },
        'change select[name="link_page"]': function(evt) {
          if ($(evt.target).val() !== "-1") {
            this.$el.find('input[name="link"]').val('');
          }
          return this.trigger("element:linkpage:changed", $(evt.target).val());
        },
        'change select[name="align"]': function(evt) {
          return this.trigger("element:alignment:changed", $(evt.target).val());
        },
        'blur input.linktext': function(evt) {
          var name;
          name = $(evt.target).attr('name');
          if (name === 'link' && $(evt.target).val().substring(0, 8) !== "https://" && $(evt.target).val().substring(0, 7) !== "http://" && $(evt.target).val().substring(0, 2) !== "//") {
            if ($(evt.target).val() !== "") {
              this.$el.find('select[name="link_page"]').selectpicker('val', '-1');
            }
            $(evt.target).val("http://" + $(evt.target).val());
          }
          return this.trigger("element:" + name + ":changed", $(evt.target).val());
        },
        'change input[name="target"]': function(evt) {
          return this.trigger("element:target:changed", $(evt.target).is(':checked') ? '_BLANK' : '_self');
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
