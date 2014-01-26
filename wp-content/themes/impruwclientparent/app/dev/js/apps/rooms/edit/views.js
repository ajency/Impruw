// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'tpl!apps/rooms/edit/templates/editroom'], function(App, editRoomTpl) {
    App.module('RoomsApp.Edit.View', function(View, App, Backbone, Marionette, $, _) {
      var _ref;
      return View.EditRoom = (function(_super) {
        __extends(EditRoom, _super);

        function EditRoom() {
          _ref = EditRoom.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        EditRoom.prototype.template = editRoomTpl;

        EditRoom.prototype.className = 'modal-dialog';

        EditRoom.prototype.dialog = {
          title: 'Edit Room'
        };

        return EditRoom;

      })(Marionette.ItemView);
    });
    return App.RoomsApp.Edit.View;
  });

}).call(this);
