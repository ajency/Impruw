var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/builder/site-builder/elements/link/settings/views'], function(App, AppController) {
  return App.module('SiteBuilderApp.Element.Link.Settings', function(Settings, App, Backbone, Marionette, $, _) {
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
        model = App.request("get:element:settings:options", 'Link');
        view = this._getSettingView(model, this.model);
        this.listenTo(view, "element:style:changed", (function(_this) {
          return function(style) {
            return _this.model.set("style", style);
          };
        })(this));
        this.listenTo(view, "element:alignment:changed", (function(_this) {
          return function(alignment) {
            return _this.model.set("align", alignment);
          };
        })(this));
        this.listenTo(view, "element:draggable:changed", (function(_this) {
          return function(draggable) {
            return _this.model.set("draggable", draggable);
          };
        })(this));
        this.listenTo(view, "element:link:changed", (function(_this) {
          return function(link) {
            return _this.model.set("link", link);
          };
        })(this));
        this.listenTo(view, "element:text:changed", (function(_this) {
          return function(text) {
            var original_data, textdata;
            original_data = _this.model.get('text');
            if (_.isObject(original_data)) {
              textdata = original_data;
            } else {
              textdata = {};
              textdata['en'] = original_data;
            }
            textdata[WPML_DEFAULT_LANG] = text;
            _this.model.set("text", textdata);
            return _this.model.trigger("change:text", _this.model);
          };
        })(this));
        this.listenTo(view, "element:target:changed", (function(_this) {
          return function(target) {
            return _this.model.set("target", target);
          };
        })(this));
        this.listenTo(view, "element:linkpage:changed", (function(_this) {
          return function(linkpage) {
            return _this.model.set("link_page_id", linkpage);
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
    return App.vent.on("show:link:settings:popup", function(model) {
      return new Settings.Controller({
        model: model
      });
    });
  });
});
