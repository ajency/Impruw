var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/rooms/add/templates/add-room.html'], function(App, addRoomTpl) {
  return App.module('RoomsApp.Add.View', function(View, App, Backbone, Marionette, $, _) {
    return View.AddRoomLayout = (function(_super) {
      __extends(AddRoomLayout, _super);

      function AddRoomLayout() {
        return AddRoomLayout.__super__.constructor.apply(this, arguments);
      }

      AddRoomLayout.prototype.added = false;

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
        },
        'click .fileinput-new': function() {
          return this.trigger("show:media:manager");
        }
      };

      AddRoomLayout.prototype.onShow = function() {
        var m, w;
        this.$el.find('*[data-spy="affix"]').affix();
        w = $('.aj-imp-right').width();
        this.$el.find('*[data-spy="affix"]').width(w);
        m = $('.aj-imp-left').width();
        this.$el.find('*[data-spy="affix"]').css('margin-left', m);
        return this.$el.find('.currency').text(Marionette.getOption(this, 'currency'));
      };

      AddRoomLayout.prototype.onShowSuccessMessage = function() {
        var message;
        this.$el.find('.alert').remove();
        message = _.polyglot.t("New room added successfully");
        if (this.added === true) {
          message = _.polyglot.t("Room updated successfully");
        }
        this.$el.prepend("<div class=\"alert alert-success\">" + message + "</div>");
        $('html, body').animate({
          scrollTop: 0
        }, 1000);
        return this.added = true;
      };

      AddRoomLayout.prototype.onSetSliderId = function(slider_id) {
        return this.$el.find('input[name="slider_id"]').val(slider_id);
      };

      AddRoomLayout.prototype.onSetFeatureImage = function(media) {
        var image_id, image_path, media_size;
        image_id = media.get('id');
        media_size = media.get('sizes');
        image_path = media_size.thumbnail.url;
        this.$el.find('.feature-image').attr('src', image_path);
        return this.$el.find('#feature-image-id').attr('value', image_id);
      };

      AddRoomLayout.prototype.regions = {
        facilitiesRegion: '#facilities-region',
        galleryRegion: '#gallery-region',
        roomTariffRegion: '#room-tariff-region',
        roomBookingRegion: '#room-booking-region'
      };

      return AddRoomLayout;

    })(Marionette.LayoutView);
  });
});
