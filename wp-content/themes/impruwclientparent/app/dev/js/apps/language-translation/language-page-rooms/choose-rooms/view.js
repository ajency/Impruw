var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageRooms.ChooseRooms.Views', function(Views, App, Backbone, Marionette, $, _) {
    Views.EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.template = '<div class="empty-info">You have no rooms. Add rooms by going to Rooms tab on the Dashboard. Once you have filled out your room details, you can come back here to add translations.</div>';

      return EmptyView;

    })(Marionette.ItemView);
    return Views.ChooseRoomsView = (function(_super) {
      __extends(ChooseRoomsView, _super);

      function ChooseRoomsView() {
        return ChooseRoomsView.__super__.constructor.apply(this, arguments);
      }

      ChooseRoomsView.prototype.template = "<form class='form-horizontal'> Pick a Room: <select class='js-room-select' id='js-room-select'> <option value='-1'>Choose a room</option> </select> </form>";

      ChooseRoomsView.prototype.events = {
        "click div.js-room-select ul.selectpicker li": "loadRoomApps"
      };

      ChooseRoomsView.prototype.onShow = function() {
        _.each(this.collection.models, (function(_this) {
          return function(model, index) {
            var html, room_id, room_name;
            room_id = model.get('ID');
            room_name = model.get('post_title');
            html = "<option value='" + room_id + "' >" + room_name + "</option>";
            return _this.$el.find('select').append(html);
          };
        })(this));
        this.$el.find("#js-room-select option[value='-1']").attr({
          'selected': 'selected'
        });
        return this.$el.find('#js-room-select').selectpicker();
      };

      ChooseRoomsView.prototype.loadRoomApps = function(e) {
        var selectedIndex, selectedRoomId;
        selectedIndex = $(e.currentTarget).attr('rel');
        selectedRoomId = $('select#js-room-select option:eq(' + selectedIndex + ')').attr('value');
        if (selectedRoomId !== '-1') {
          this.trigger('load:original:rooms', selectedRoomId);
          return this.trigger('load:translated:rooms', selectedRoomId);
        } else {
          this.$el.find('.alert').remove();
          this.$el.append('<div class="alert alert-success">' + _.polyglot.t("Please select a room to translate") + '</div>');
          return this.$el.find('.alert').fadeOut(5000);
        }
      };

      return ChooseRoomsView;

    })(Marionette.ItemView);
  });
});
