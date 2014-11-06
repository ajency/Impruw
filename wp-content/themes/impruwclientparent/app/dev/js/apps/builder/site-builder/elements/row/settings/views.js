var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/site-builder/elements/row/settings/templates/settings.html'], function(App, settingsTpl) {
  return App.module('SiteBuilderApp.Element.Row.Settings.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.SettingsView = (function(_super) {
      __extends(SettingsView, _super);

      function SettingsView() {
        this.onColumnCountChanged = __bind(this.onColumnCountChanged, this);
        return SettingsView.__super__.constructor.apply(this, arguments);
      }

      SettingsView.prototype.template = settingsTpl;

      SettingsView.prototype.className = '';

      SettingsView.prototype.mixinTemplateHelpers = function(data) {
        data = SettingsView.__super__.mixinTemplateHelpers.call(this, data);
        data.THEMEURL = THEMEURL;
        data.CURRENTTHEMEURL = CURRENTTHEMEURL;
        _.each(data.styles, function(style) {
          return style.slug = _.slugify(style.name);
        });
        return data;
      };

      SettingsView.prototype.initialize = function(opt) {
        if (opt == null) {
          opt = {};
        }
        this.eleModel = opt.eleModel;
        return SettingsView.__super__.initialize.call(this, opt);
      };

      SettingsView.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Pick a Row Style'),
        modal_size: 'wide-modal'
      };

      SettingsView.prototype.onShow = function() {
        this.$el.find(".col-item[data-col='" + (this.eleModel.get('columncount')) + "'] ").addClass('ui-selected');
        return this.$el.find(".single-item[data-style='" + (this.eleModel.get('style')) + "'] ").addClass('ui-selected');
      };

      SettingsView.prototype.onRender = function() {
        this.$el.find('.set-column-count').selectable({
          cancel: '.ui-selected',
          filter: ".col-item",
          selected: (function(_this) {
            return function(event, ui) {
              return _this.trigger("element:column:count:changed", $(ui.selected).attr('data-col'));
            };
          })(this)
        });
        return this.$el.find('.style-select').selectable({
          cancel: '.ui-selected',
          filter: ".single-item",
          selected: (function(_this) {
            return function(event, ui) {
              return _this.trigger("element:style:changed", $(ui.selected).attr('data-style'));
            };
          })(this)
        });
      };

      SettingsView.prototype.onColumnCountChanged = function(count) {
        if (count !== parseInt(this.$el.find('.col-item.ui-selected').attr('data-col'))) {
          this.$el.find('.col-item.ui-selected').removeClass('ui-selected');
          return this.$el.find(".col-item[data-col='" + count + "'] ").addClass('ui-selected');
        }
      };

      return SettingsView;

    })(Marionette.ItemView);
  });
});
