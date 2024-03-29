var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

define(["marionette", "app"], function(Marionette, App) {
  var BuilderSettingController;
  return BuilderSettingController = (function(_super) {
    __extends(BuilderSettingController, _super);

    function BuilderSettingController(options) {
      if (options == null) {
        options = {};
      }
      this.model = options.model;
      if (!this.model) {
        throw new Error("@model missing");
      }
      this.region = App.getRegion('settingsRegion');
      this._instance_id = _.uniqueId("settingcontroller");
      App.commands.execute("register:builder:instance", this, this._instance_id);
      BuilderSettingController.__super__.constructor.call(this, options);
    }

    BuilderSettingController.prototype.close = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      delete this.region;
      delete this.options;
      App.commands.execute("unregister:builder:instance", this, this._instance_id);
      return BuilderSettingController.__super__.close.call(this, args);
    };

    BuilderSettingController.prototype.onClose = function() {
      if (!this.model.hasChanged()) {
        return;
      }
      return this.model.save(null, {
        wait: true
      });
    };

    BuilderSettingController.prototype._bindModelEvents = function(view) {
      return this.listenTo(view, "element:draggable:changed", this.updateModel);
    };

    BuilderSettingController.prototype.updateModel = function(property, value) {
      return this.model.set(property, value);
    };

    return BuilderSettingController;

  })(Marionette.Controller);
});
