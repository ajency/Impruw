var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/rooms/edit/templates/edit-room.html'], function(App, addRoomTpl) {
  return App.module('RoomsApp.Edit.View', function(View, App, Backbone, Marionette, $, _) {
    return View.EditRoomLayout = (function(_super) {
      __extends(EditRoomLayout, _super);

      function EditRoomLayout() {
        return EditRoomLayout.__super__.constructor.apply(this, arguments);
      }

      EditRoomLayout.prototype.tagName = 'form';

      EditRoomLayout.prototype.className = 'form-horizontal clearfix';

      EditRoomLayout.prototype.template = addRoomTpl;

      EditRoomLayout.prototype.events = {
        'click #btn_saveroom': function() {
          var data, ele;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            return this.trigger("save:edit:room", data);
          } else {
            ele = this.$el.find('.field-error').get(0);
            return $.scrollTo(ele);
          }
        },
        'click .add-gallery-images': function() {
          return this.trigger("show:edit:slider");
        }
      };

      EditRoomLayout.prototype.onShowSuccessMessage = function() {
        this.$el.find('.alert').remove();
        this.$el.prepend('<div class="alert alert-success">Room updated successfully</div>');
        return $('html, body').animate({
          scrollTop: 0
        }, 1000);
      };

      EditRoomLayout.prototype.onSetSliderId = function(slider_id) {
        return this.$el.find('input[name="slider_id"]').val(slider_id);
      };

      EditRoomLayout.prototype.regions = {
        facilitiesRegion: '#facilities-region',
        galleryRegion: '#gallery-region',
        roomTariffRegion: '#room-tariff-region',
        roomBookingRegion: '#room-booking-region'
      };

      return EditRoomLayout;

    })(Marionette.Layout);
  });
});
