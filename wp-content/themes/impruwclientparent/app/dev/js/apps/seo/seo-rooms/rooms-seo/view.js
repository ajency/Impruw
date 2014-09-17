var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/seo/templates/seo-room-content.html'], function(App, seoroomcontentTpl) {
  return App.module('SeoApp.SeoRooms.Rooms.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.RoomContentItemView = (function(_super) {
      __extends(RoomContentItemView, _super);

      function RoomContentItemView() {
        return RoomContentItemView.__super__.constructor.apply(this, arguments);
      }

      RoomContentItemView.prototype.template = seoroomcontentTpl;

      RoomContentItemView.prototype.events = {
        "click #btn-save-room-seo-details": function(e) {
          var newSeoDesc, newSeoKeywords, newSeoTitle;
          e.preventDefault();
          newSeoTitle = $("#room_seo_title").val();
          newSeoDesc = $("#room_meta_description").val();
          newSeoKeywords = $("#room_meta_keywords").val();
          return this.trigger("room:seo:save", newSeoTitle, newSeoDesc, newSeoKeywords);
        }
      };

      RoomContentItemView.prototype.onRoomSeoUpdated = function() {
        this.$el.find('.alert').remove();
        this.$el.append('<div class="alert alert-success">' + _.polyglot.t("Room Seo Details updated") + '</div>');
        return this.$el.find('.alert').fadeOut(5000);
      };

      return RoomContentItemView;

    })(Marionette.ItemView);
  });
});
