// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'text!apps/builder/site-builder/elements/row/settings/templates/settings.html'], function(App, settingsTpl) {
    return App.module('SiteBuilderApp.Element.Row.Settings.Views', function(Views, App, Backbone, Marionette, $, _) {
      var _ref;
      return Views.SettingsView = (function(_super) {
        __extends(SettingsView, _super);

        function SettingsView() {
          _ref = SettingsView.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        SettingsView.prototype.template = settingsTpl;

        SettingsView.prototype.className = 'modal-content settings-box';

        SettingsView.prototype.serializeData = function() {
          var data, dataCloned,
            _this = this;
          data = this.model.toJSON();
          dataCloned = _.clone(data);
          dataCloned.templates = [];
          _.each(data.templates, function(val, key) {
            return dataCloned.templates.push({
              name: key,
              slug: _.slugify(key)
            });
          });
          return dataCloned;
        };

        SettingsView.prototype.onRender = function() {
          this.$el.find('input[type="checkbox"]').checkbox();
          this.$el.find('select').selectpicker();
          return this.setFields();
        };

        SettingsView.prototype.setFields = function() {
          if (this.model.get('draggable') === true) {
            this.$el.find('input[name="draggable"]').checkbox('check');
          }
          return this.$el.find('select[name="style"]').selectpicker('val', this.model.get('style'));
        };

        SettingsView.prototype.events = {
          'click .close-settings': function(evt) {
            evt.preventDefault();
            return App.settingsRegion.close();
          },
          'click .set-column-count a.btn': function(evt) {
            return this.trigger("element:column:count:changed", parseInt($(evt.target).text()));
          },
          'change select[name="style"]': function(evt) {
            return this.trigger("element:style:changed", $(evt.target).val());
          },
          'change input[name="draggable"]': function(evt) {
            return this.trigger("element:draggable:changed", $(evt.target).is(':checked'));
          }
        };

        return SettingsView;

      })(Marionette.ItemView);
    });
  });

}).call(this);
