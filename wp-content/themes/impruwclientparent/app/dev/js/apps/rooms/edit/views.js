var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'tpl!apps/rooms/edit/templates/editroom'], function(App, editRoomTpl) {
  App.module('RoomsApp.Edit.View', function(View, App, Backbone, Marionette, $, _) {
    return View.EditRoom = (function(_super) {
      __extends(EditRoom, _super);

      function EditRoom() {
        return EditRoom.__super__.constructor.apply(this, arguments);
      }

      EditRoom.prototype.template = editRoomTpl;

      return EditRoom;

    })(Marionette.ItemView);
  });
  return App.RoomsApp.Edit.View;
});
