var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/add/views'], function(App, AppController) {
  return App.module('RoomsApp.Add', function(Add, App, Backbone, Marionette, $, _) {
    Add.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        var view;
        this.model = options.model;
        view = this.getAddView(this.model);
        return this.show(view, {
          loading: true
        });
      };

      Controller.prototype.getAddView = function(room) {
        return new Add.View.AddRoom({
          model: room
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:add:room", function(opts) {
      return new Add.Controller;
    });
  });
});
