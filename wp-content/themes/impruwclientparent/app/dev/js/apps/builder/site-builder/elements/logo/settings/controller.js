// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'controllers/base-controller', 'apps/builder/site-builder/elements/logo/settings/views'], function(App, AppController) {
    return App.module('SiteBuilderApp.Element.Logo.Settings', function(Settings, App, Backbone, Marionette, $, _) {
      var _ref;
      Settings.Controller = (function(_super) {
        __extends(Controller, _super);

        function Controller() {
          _ref = Controller.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        Controller.prototype.initialize = function(opt) {
          var model, view,
            _this = this;
          if (opt == null) {
            opt = {};
          }
          this.model = opt.model;
          this.region = App.settingsRegion;
          model = App.request("get:element:settings:options", 'Logo');
          view = this._getSettingView(model, this.model);
          this.listenTo(view, 'render', function() {
            _this.region.$el.css('top', 200);
            return _this.region.$el.css('left', 400);
          });
          this.listenTo(view, "element:style:changed", function(style) {
            return _this.model.set("style", style);
          });
          this.listenTo(view, "element:draggable:changed", function(draggable) {
            return _this.model.set("draggable", draggable);
          });
          this.listenTo(view, "element:column:count:changed", function(newCount) {
            return _this.model.set("columncount", newCount);
          });
          return this.show(view);
        };

        Controller.prototype._getSettingView = function(model, eleModel) {
          return new Settings.Views.SettingsView({
            eleModel: eleModel,
            model: model
          });
        };

        Controller.prototype.onClose = function() {
          if (!this.model.hasChanged()) {
            return;
          }
          return this.model.save(null, {
            wait: true
          });
        };

        return Controller;

      })(AppController);
      return App.vent.on("show:logo:settings:popup", function(model) {
        return new Settings.Controller({
          model: model
        });
      });
    });
  });

}).call(this);
