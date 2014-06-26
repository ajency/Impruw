var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageRooms.ChooseRooms.Views', function(Views, App, Backbone, Marionette, $, _) {
    var ChooseRoomsItemView;
    ChooseRoomsItemView = (function(_super) {
      __extends(ChooseRoomsItemView, _super);

      function ChooseRoomsItemView() {
        return ChooseRoomsItemView.__super__.constructor.apply(this, arguments);
      }

      ChooseRoomsItemView.prototype.template = '<option value="{{ID}}"">{{post_title}}</option>';

      return ChooseRoomsItemView;

    })(Marionette.ItemView);
    return Views.ChooseRoomsView = (function(_super) {
      __extends(ChooseRoomsView, _super);

      function ChooseRoomsView() {
        return ChooseRoomsView.__super__.constructor.apply(this, arguments);
      }

      ChooseRoomsView.prototype.template = "<form> Pick a Room: <select class='js-room-select' id='js-room-select'> <option>Choose a room</option> </select> </form>";

      ChooseRoomsView.prototype.itemView = ChooseRoomsItemView;

      ChooseRoomsView.prototype.itemViewContainer = ".js-room-select";

      ChooseRoomsView.prototype.events = {
        "click div.js-room-select ul.selectpicker li": "loadRoomApps"
      };

      ChooseRoomsView.prototype.onShow = function() {
        return this.$el.find('select').selectpicker();
      };

      ChooseRoomsView.prototype.loadRoomApps = function(e) {
        var selectedIndex, selectedRoomId;
        selectedIndex = $(e.currentTarget).attr('rel');
        selectedRoomId = $('select#js-room-select option:eq(' + selectedIndex + ')').attr('value');
        if (selectedRoomId !== "") {
          this.trigger('load:original:rooms', selectedRoomId);
        }
        if (selectedRoomId !== "") {
          return this.trigger('load:translated:rooms', selectedRoomId);
        }
      };

      return ChooseRoomsView;

    })(Marionette.CompositeView);
  });
});
