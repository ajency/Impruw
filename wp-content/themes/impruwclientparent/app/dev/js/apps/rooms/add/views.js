var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/rooms/add/templates/add-room.html'], function(App, addRoomTpl) {
  return App.module('RoomsApp.Add.View', function(View, App, Backbone, Marionette, $, _) {
    View.AddRoom = (function(_super) {
      __extends(AddRoom, _super);

      function AddRoom() {
        return AddRoom.__super__.constructor.apply(this, arguments);
      }

      AddRoom.prototype.template = addRoomTpl;

      AddRoom.prototype.tagName = 'form';

      AddRoom.prototype.className = 'form-horizontal clearfix';

      AddRoom.prototype.events = {
        'click #btn_saveroom': function() {
          if (this.$el.valid()) {
            return this.trigger("save:new:room", Backbone.Syphon.serialize(this));
          }
        }
      };

      AddRoom.prototype.onShowSuccessMessage = function() {
        return this.$el.prepend('<div class="alert alert-success">SAve successfully</div>');
      };

      return AddRoom;

    })(Marionette.ItemView);
    return View.AddRoomLayout = (function(_super) {
      __extends(AddRoomLayout, _super);

      function AddRoomLayout() {
        return AddRoomLayout.__super__.constructor.apply(this, arguments);
      }

      AddRoomLayout.prototype.template = '<header class="aj-imp-dash-header row"> <div class="aj-imp-dash-title col-xs-12"> <h2 class="aj-imp-page-head">Add Room</h2> </div> </header> <div class="row" id="add-room-form"></div> <div class="row" id="facilities"></div>';

      AddRoomLayout.prototype.regions = {
        formRegion: '#add-room-form',
        facilitiesRegion: '#facilities'
      };

      return AddRoomLayout;

    })(Marionette.Layout);
  });
});
