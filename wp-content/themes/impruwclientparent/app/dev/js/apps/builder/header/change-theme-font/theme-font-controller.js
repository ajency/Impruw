var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/builder/header/change-theme-font/theme-font-views'], function(App, AppController) {
  return App.module('ChangeThemeFontApp', function(ChangeThemeFontApp, App, Backbone, Marionette, $, _) {
    ChangeThemeFontApp.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opt) {
        if (opt == null) {
          opt = {};
        }
        this.layout = this.getLayout();
        this.themeFontCollection = App.request('get:google:font');
        this.themeFontModel = App.request('get:current:theme:font');
        return App.execute('when:fetched', [this.themeFontCollection], (function(_this) {
          return function() {
            _this.listenTo(_this.layout, "show", _this.showFontSet);
            return _this.show(_this.layout, {
              loading: true
            });
          };
        })(this));
      };

      Controller.prototype.getLayout = function() {
        return new ChangeThemeFontApp.Views.ChangeThemeFontLayout;
      };

      Controller.prototype.showFontSet = function() {
        this.themeFontSetView = this.getView(this.themeFontCollection);
        this.listenTo(this.themeFontSetView, 'dialog:close', function() {
          return this.layout.trigger('dialog:close');
        });
        return this.layout.themefontsetRegion.show(this.themeFontSetView);
      };

      Controller.prototype.getView = function() {
        return new ChangeThemeFontApp.Views.ThemeFontSetView({
          collection: this.themeFontCollection,
          model: this.themeFontModel
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:theme:font:set", function(opts) {
      return new ChangeThemeFontApp.Controller(opts);
    });
  });
});
