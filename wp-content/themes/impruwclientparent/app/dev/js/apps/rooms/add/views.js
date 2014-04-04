var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/rooms/add/templates/add-room.html'], function(App, addRoomTpl) {
  return App.module('RoomsApp.Add.View', function(View, App, Backbone, Marionette, $, _) {
    return View.AddRoomLayout = (function(_super) {
      __extends(AddRoomLayout, _super);

      function AddRoomLayout() {
        return AddRoomLayout.__super__.constructor.apply(this, arguments);
      }

      AddRoomLayout.prototype.tagName = 'div';

      AddRoomLayout.prototype.className = 'add-room-container';

      AddRoomLayout.prototype.template = addRoomTpl;

      AddRoomLayout.prototype.events = {
        'click #btn_saveroom': function() {
          var data, ele;
          if (this.$el.find('form').valid()) {
            data = Backbone.Syphon.serialize(this);
            return this.trigger("save:new:room", data);
          } else {
            ele = this.$el.find('.field-error').get(0);
            return $.scrollTo(ele);
          }
        },
        'click .add-gallery-images': function() {
          return this.trigger("show:edit:slider");
        }
      };

      AddRoomLayout.prototype.onShowSuccessMessage = function() {
        this.$el.find('.alert').remove();
        this.$el.prepend('<div class="alert alert-success">New room added successfully</div>');
        this.$el.find('#btn_resetroom').click();
        return $('html, body').animate({
          scrollTop: 0
        }, 1000);
      };

      AddRoomLayout.prototype.onSetSliderId = function(slider_id) {
        return this.$el.find('input[name="slider_id"]').val(slider_id);
      };

      AddRoomLayout.prototype.regions = {
        facilitiesRegion: '#facilities-region',
        galleryRegion: '#gallery-region',
        roomTariffRegion: '#room-tariff-region',
        roomBookingRegion: '#room-booking-region'
      };

      return AddRoomLayout;

    })(Marionette.Layout);
  });
});
