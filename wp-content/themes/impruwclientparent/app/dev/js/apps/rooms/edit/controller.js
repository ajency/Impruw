var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/edit/views', 'entities/tariffs', 'entities/facilities', 'entities/media'], function(App, AppController) {
  App.module('RoomsApp.Edit', function(Edit, App, Backbone, Marionette, $, _) {
    return Edit.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        var view;
        this.model = options.model;
        view = this.getEditView(this.model);
        return this.show(view, {
          loading: true
        });
      };

      Controller.prototype.getEditView = function(room) {
        return new Edit.View.EditRoom({
          model: room
        });
      };

      return Controller;

    })(AppController);
  });
  return App.RoomsApp.Edit.Controller;
});
