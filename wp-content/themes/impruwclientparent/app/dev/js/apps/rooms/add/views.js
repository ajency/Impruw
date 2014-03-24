var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/rooms/add/templates/add-room.html'], function(App, addRoomTpl) {
  return App.module('RoomsApp.Add.View', function(View, App, Backbone, Marionette, $, _) {
    return View.AddRoomLayout = (function(_super) {
      __extends(AddRoomLayout, _super);

      function AddRoomLayout() {
        return AddRoomLayout.__super__.constructor.apply(this, arguments);
      }

      AddRoomLayout.prototype.tagName = 'form';

      AddRoomLayout.prototype.className = 'form-horizontal clearfix';

      AddRoomLayout.prototype.template = addRoomTpl;

      AddRoomLayout.prototype.events = {
        'click #btn_saveroom': function() {
          if (this.$el.valid()) {
            return this.trigger("save:new:room", Backbone.Syphon.serialize(this));
          }
        }
      };

      AddRoomLayout.prototype.onShowSuccessMessage = function() {
        return this.$el.prepend('<div class="alert alert-success">SAve successfully</div>');
      };

      AddRoomLayout.prototype.regions = {
        facilitiesRegion: '#facilities-region',
        galleryRegion: '#gallery-region',
        roomTariffRegion: '#room-tariff-region'
      };

      return AddRoomLayout;

    })(Marionette.Layout);
  });
});
