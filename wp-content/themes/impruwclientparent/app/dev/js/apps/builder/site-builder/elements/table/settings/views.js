var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/site-builder/elements/table/settings/templates/settings.html'], function(App, settingsTpl) {
  return App.module('SiteBuilderApp.Element.Table.Settings.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.SettingsView = (function(_super) {
      __extends(SettingsView, _super);

      function SettingsView() {
        return SettingsView.__super__.constructor.apply(this, arguments);
      }

      SettingsView.prototype.template = settingsTpl;

      SettingsView.prototype.className = 'modal-content settings-box';

      SettingsView.prototype.mixinTemplateHelpers = function(data) {
        data = SettingsView.__super__.mixinTemplateHelpers.call(this, data);
        data.column = this.eleModel.get('column');
        data.row = this.eleModel.get('row');
        return data;
      };

      SettingsView.prototype.events = {
        'click .close-settings': function(evt) {
          evt.preventDefault();
          return App.settingsRegion.close();
        },
        'change input[name="draggable"]': function(evt) {
          return this.trigger("element:draggable:changed", $(evt.target).is(':checked'));
        },
        'click .spinner .btn:first-of-type': 'increaseCount',
        'click .spinner .btn:last-of-type': 'decreaseCount',
        'blur .spinner input': 'changeCount',
        'change #checkbox-bordered': 'changeBordered',
        'change #checkbox-striped': 'changeStriped',
        'change #table-style': 'changeStyle'
      };

      SettingsView.prototype.initialize = function(opt) {
        if (opt == null) {
          opt = {};
        }
        this.eleModel = opt.eleModel;
        this.listenTo(this.eleModel, 'change:row', this.changeRowCount);
        this.listenTo(this.eleModel, 'change:column', this.changeColCount);
        return SettingsView.__super__.initialize.call(this, opt);
      };

      SettingsView.prototype.onRender = function() {
        this.setFields();
        this.$el.find('input[type="checkbox"]').checkbox();
        return this.$el.find('select').selectpicker();
      };

      SettingsView.prototype.setFields = function() {
        if (this.eleModel.get('draggable')) {
          this.$el.find('input[name="draggable"]').checkbox('check');
        }
        this.$el.find('#checkbox-bordered').prop('checked', this.eleModel.get('bordered'));
        this.$el.find('#checkbox-striped').prop('checked', this.eleModel.get('striped'));
        return this.$el.find('#table-style').val(this.eleModel.get('style'));
      };

      SettingsView.prototype.changeCount = function(evt) {
        var count;
        count = parseInt($(evt.target).closest('.spinner').find('input').val());
        if (_.isNumber(count) && count > 0) {
          if ($(evt.target).closest('.spinner').hasClass('column-spinner')) {
            this.eleModel.set('column', count);
          }
          if ($(evt.target).closest('.spinner').hasClass('row-spinner')) {
            return this.eleModel.set('row', count);
          }
        }
      };

      SettingsView.prototype.increaseCount = function(evt) {
        var count;
        evt.stopPropagation();
        count = parseInt($(evt.target).closest('.spinner').find('input').val(), 10);
        count++;
        $(evt.target).closest('.spinner').find('input').val(count);
        if ($(evt.target).closest('.spinner').hasClass('column-spinner')) {
          this.eleModel.set('column', count);
        }
        if ($(evt.target).closest('.spinner').hasClass('row-spinner')) {
          return this.eleModel.set('row', count);
        }
      };

      SettingsView.prototype.decreaseCount = function(evt) {
        var count;
        evt.stopPropagation();
        count = parseInt($(evt.target).closest('.spinner').find('input').val(), 10);
        count--;
        if (count > 0) {
          $(evt.target).closest('.spinner').find('input').val(count);
          if ($(evt.target).closest('.spinner').hasClass('column-spinner')) {
            this.eleModel.set('column', count);
          }
          if ($(evt.target).closest('.spinner').hasClass('row-spinner')) {
            return this.eleModel.set('row', count);
          }
        }
      };

      SettingsView.prototype.changeRowCount = function(model, row) {
        return this.$el.find('.row-spinner input').val(row);
      };

      SettingsView.prototype.changeColCount = function(model, column) {
        return this.$el.find('.column-spinner input').val(column);
      };

      SettingsView.prototype.changeBordered = function(e) {
        if ($(e.target).prop('checked')) {
          return this.eleModel.set('bordered', true);
        } else {
          return this.eleModel.set('bordered', false);
        }
      };

      SettingsView.prototype.changeStriped = function(e) {
        if ($(e.target).prop('checked')) {
          return this.eleModel.set('striped', true);
        } else {
          return this.eleModel.set('striped', false);
        }
      };

      SettingsView.prototype.changeStyle = function(e) {
        return this.eleModel.set('style', _.slugify($(e.target).val()));
      };

      return SettingsView;

    })(Marionette.ItemView);
  });
});
