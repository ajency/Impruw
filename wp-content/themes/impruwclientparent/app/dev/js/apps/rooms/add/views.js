var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  App.module('RoomsApp.Add.View', function(View, App, Backbone, Marionette, $, _) {
    return View.AddRoom = (function(_super) {
      __extends(AddRoom, _super);

      function AddRoom() {
        return AddRoom.__super__.constructor.apply(this, arguments);
      }

      AddRoom.prototype.template = '<h3>New Region for add new room</h3>';

      return AddRoom;

    })(Marionette.ItemView);
  });
  return App.RoomsApp.Add.View;
});
