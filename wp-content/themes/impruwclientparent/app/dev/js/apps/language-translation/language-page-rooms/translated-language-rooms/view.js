var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-page-rooms/translated-language-rooms/templates/translatedroomsview.html'], function(App, translatedroomsviewTpl) {
  return App.module('LanguageApp.LanguagePageRooms.TranslatedRooms.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.TranslatedItemView = (function(_super) {
      __extends(TranslatedItemView, _super);

      function TranslatedItemView() {
        return TranslatedItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedItemView.prototype.template = translatedroomsviewTpl;

      TranslatedItemView.prototype.events = {
        "click #btn_update-translated-rooms": "updateRoomPost"
      };

      TranslatedItemView.prototype.updateRoomPost = function(e) {
        var newRoomDesc, newRoomTitle, roomId;
        e.preventDefault();
        newRoomTitle = this.$el.find('#translated-room-title').val();
        newRoomDesc = this.$el.find('#translated-room-desc').val();
        roomId = this.$el.find('#translated-room-id').val();
        return this.trigger("translated:room:updated", newRoomTitle, newRoomDesc, roomId);
      };

      TranslatedItemView.prototype.onRoomDataUpdated = function() {
        this.$el.find('.alert').remove();
        this.$el.append('<div class="alert alert-success">' + _.polyglot.t("Room Details updated") + '</div>');
        return this.$el.find('.alert').fadeOut(5000);
      };

      return TranslatedItemView;

    })(Marionette.ItemView);
  });
});
