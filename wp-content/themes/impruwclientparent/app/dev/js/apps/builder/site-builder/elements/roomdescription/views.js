var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.RoomDescription.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.RoomDescriptionView = (function(_super) {
      __extends(RoomDescriptionView, _super);

      function RoomDescriptionView() {
        return RoomDescriptionView.__super__.constructor.apply(this, arguments);
      }

      RoomDescriptionView.prototype.className = 'roomdescription';

      RoomDescriptionView.prototype.template = '<div class="room-description-container clearfix"> <div class="room-description"> <h1>Room Description</h1> <div class="room-description-desc">{{#polyglot}}This will display the room description you added to the room. You cannot edit your room description here. To edit the room description, go to Rooms from Dashboard and edit your room description there. The text you add there will display on the live site. You cannot add links and formatting to your room description. The format in which the text is displayed will be defined by the theme you are using. To display your check in / check out time and additional policies, drag and drop the Room Summary element to your single room page.{{/polyglot}}</div> </div> </div>';

      RoomDescriptionView.prototype.onShow = function() {
        this.$el.attr("data-content", "Update room information <a href='" + SITEURL + "/dashboard/#/rooms'>here</a> ");
        return this.$el.popover({
          html: true,
          placement: 'top'
        });
      };

      return RoomDescriptionView;

    })(Marionette.ItemView);
  });
});
