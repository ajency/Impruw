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

      RoomDescriptionView.prototype.template = '<div class="room-description-container clearfix"> <div class="room-description"> <h1>Room Description</h1> <div class="room-description-desc">Lorem ipsum dolor sit amet</div> </div> </div>';

      return RoomDescriptionView;

    })(Marionette.ItemView);
  });
});
