(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'holder'], function(App, Holder) {
    return App.module('SiteBuilderApp.Element.RoomFacilities.Views', function(Views, App, Backbone, Marionette, $, _) {
      return Views.RoomFacilitiesView = (function(_super) {
        __extends(RoomFacilitiesView, _super);

        function RoomFacilitiesView() {
          return RoomFacilitiesView.__super__.constructor.apply(this, arguments);
        }

        RoomFacilitiesView.prototype.className = 'roomfacilities';

        return RoomFacilitiesView;

      })(Marionette.ItemView);
    });
  });

}).call(this);
