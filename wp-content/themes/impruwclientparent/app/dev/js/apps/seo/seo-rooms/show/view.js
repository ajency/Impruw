var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/seo/templates/seoroomsview.html'], function(App, seoroomsviewTpl) {
  return App.module('SeoApp.SeoRooms.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.SeoRooomsLayout = (function(_super) {
      __extends(SeoRooomsLayout, _super);

      function SeoRooomsLayout() {
        return SeoRooomsLayout.__super__.constructor.apply(this, arguments);
      }

      SeoRooomsLayout.prototype.template = seoroomsviewTpl;

      SeoRooomsLayout.prototype.className = 'tab-content';

      SeoRooomsLayout.prototype.regions = {
        chooseRooms: ".pick-room",
        seoRoomContent: ".seo-room-content"
      };

      return SeoRooomsLayout;

    })(Marionette.Layout);
  });
});
