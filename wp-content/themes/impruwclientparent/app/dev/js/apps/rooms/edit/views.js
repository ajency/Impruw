var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/rooms/edit/templates/edit-room.html', 'jqueryvalidate'], function(App, addRoomTpl, jqueryvalidate) {
  return App.module('RoomsApp.Edit.View', function(View, App, Backbone, Marionette, $, _) {
    return View.EditRoomLayout = (function(_super) {
      __extends(EditRoomLayout, _super);

      function EditRoomLayout() {
        return EditRoomLayout.__super__.constructor.apply(this, arguments);
      }

      EditRoomLayout.prototype.tagName = 'div';

      EditRoomLayout.prototype.className = 'edit-room-container';

      EditRoomLayout.prototype.template = addRoomTpl;

      EditRoomLayout.prototype.events = {
        'click #btn_saveroom': function() {
          var data, ele;
          if (this.$el.find('form').valid()) {
            data = Backbone.Syphon.serialize(this);
            return this.trigger("save:edit:room", data);
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

      EditRoomLayout.prototype.serializeData = function() {
        var data;
        data = EditRoomLayout.__super__.serializeData.call(this);
        data.THEMEURL = THEMEURL;
        if (data.image_url === false) {
          data.image_url = "http://placehold.it/100&text=" + _.polyglot.t('Image');
        }
        return data;
      };

      EditRoomLayout.prototype.onShow = function() {
        var m, w;
        this.$el.find('*[data-spy="affix"]').affix();
        w = $('.aj-imp-right').width();
        this.$el.find('*[data-spy="affix"]').width(w);
        m = $('.aj-imp-left').width();
        this.$el.find('*[data-spy="affix"]').css('margin-left', m);
        return this.$el.find('.currency').text(Marionette.getOption(this, 'currency'));
      };

      EditRoomLayout.prototype.onShowSuccessMessage = function() {
        this.$el.find('.alert').remove();
        this.$el.prepend("<div class=\"alert alert-success\">" + _.polyglot.t("Room updated successfully") + "</div>");
        return $('html, body').animate({
          scrollTop: 0
        }, 1000);
      };

      EditRoomLayout.prototype.onSetSliderId = function(slider_id) {
        return this.$el.find('input[name="slider_id"]').val(slider_id);
      };

      EditRoomLayout.prototype.onSetFeatureImage = function(media) {
        var image_id, image_path, media_size;
        image_id = media.get('id');
        media_size = media.get('sizes');
        image_path = media_size.thumbnail.url;
        this.$el.find('.feature-image').attr('src', image_path);
        return this.$el.find('#feature-image-id').attr('value', image_id);
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
