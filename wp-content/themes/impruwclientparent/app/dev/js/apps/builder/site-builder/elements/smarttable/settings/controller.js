var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/builder/site-builder/elements/smarttable/settings/views'], function(App, AppController) {
  return App.module('SiteBuilderApp.Element.SmartTable.Settings', function(Settings, App, Backbone, Marionette, $, _) {
    Settings.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opt) {
        var model, view;
        if (opt == null) {
          opt = {};
        }
        this.model = opt.model;
        this.region = App.settingsRegion;
        model = App.request("get:element:settings:options", 'SmartTable');
        view = this._getSettingView(model, this.model);
        this.listenTo(view, "element:style:changed", (function(_this) {
          return function(style) {
            return _this.model.set("style", style);
          };
        })(this));
        this.listenTo(view, "element:inner:style:changed", (function(_this) {
          return function(innerStyle) {
            return _this.model.set("innerStyle", innerStyle);
          };
        })(this));
        this.listenTo(view, "element:draggable:changed", (function(_this) {
          return function(draggable) {
            return _this.model.set("draggable", draggable);
          };
        })(this));
        return this.show(view);
      };

      Controller.prototype._getSettingView = function(model, eleModel) {
        return new Settings.Views.SettingsView({
          eleModel: eleModel,
          model: model
        });
      };

      Controller.prototype.onClose = function() {
        return this.model.save(null, {
          wait: true
        });
      };

      return Controller;

    })(AppController);
    return App.vent.on("show:smarttable:settings:popup", function(model) {
      return new Settings.Controller({
        model: model
      });
    });
  });
});
