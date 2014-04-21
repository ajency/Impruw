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
        var view;
        if (opt == null) {
          opt = {};
        }
        this.view = view = new Show.Views.MainView;
        this.listenTo(view, "add:new:page:clicked", function() {
          return App.execute("show:add:new:page", {
            region: App.dialogRegion
          });
        });
        return this.show(view);
      };

      return Controller;

    })(AppController);
  });
});
