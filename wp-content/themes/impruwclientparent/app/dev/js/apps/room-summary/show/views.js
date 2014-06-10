var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/room-summary/show/templates/mainview.html'], function(App, mainviewTpl) {
  return App.module('RoomSummaryApp.Show.View', function(View, App, Backbone, Marionette, $, _) {
    return View.Layout = (function(_super) {
      __extends(Layout, _super);

      function Layout() {
        return Layout.__super__.constructor.apply(this, arguments);
      }

      Layout.prototype.initialize = function() {};

      Layout.prototype.template = mainviewTpl;

      Layout.prototype.regions = {
        checkinRegion: '#check-in-region',
        policiesRegion: '#policies-region'
      };

      return Layout;

    })(Marionette.Layout);
  });
});
