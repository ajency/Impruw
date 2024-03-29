// Generated by CoffeeScript 1.6.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'text!apps/builder/site-builder/settings/templates/settings.html'], function(App, settingsTpl) {
    App.module('SiteBuilderApp.Settings.Views', function(Views, App, Backbone, Marionette, $, _) {
      var _ref;
      return Views.SettingView = (function(_super) {
        __extends(SettingView, _super);

        function SettingView() {
          this.updateStyle = __bind(this.updateStyle, this);
          _ref = SettingView.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        SettingView.prototype.template = settingsTpl;

        SettingView.prototype.className = 'modal-content settings-box';

        SettingView.prototype.events = {
          'click .close-settings': function(evt) {
            evt.preventDefault();
            return App.settingsRegion.close();
          },
          'change select[name="style"]': 'updateStyle',
          'change select[name="align"]': 'alignElement'
        };

        SettingView.prototype.updateStyle = function(evt) {
          var newStyle;
          newStyle = $(evt.target).val();
          return this.trigger("element:style:changed", newStyle);
        };

        SettingView.prototype.alignElement = function(evt) {
          var align;
          align = $(evt.target).val();
          return this.trigger("element:alignment:changed", align);
        };

        return SettingView;

      })(Marionette.ItemView);
    });
    return App.SiteBuilderApp.Settings.Views;
  });

}).call(this);
