var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/tariffs/show/views'], function(App, AppController) {
  return App.module("RoomsApp.RoomsTariff.Show", function(Show, App) {
    var ShowController;
    return ShowController = (function(_super) {
      __extends(ShowController, _super);

      function ShowController() {
        return ShowController.__super__.constructor.apply(this, arguments);
      }

      ShowController.prototype.initialize = function() {};

      return ShowController;

    })(AppController);
  });
});
