var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/builder/header/show/views'], function(App, AppController) {
  return App.module('HeaderApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    return Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opt) {
        if (opt == null) {
          opt = {};
        }
        this.layout = this.getLayout();
        this.listenTo(this.layout, "show:theme:color:clicked", function() {
          return App.execute("show:theme:color:set", {
            region: App.dialogRegion
          });
        });
        return this.show(this.layout, {
          loading: true
        });
      };

      Controller.prototype.getLayout = function() {
        return new Show.Views.MainView;
      };

      return Controller;

    })(AppController);
  });
});
