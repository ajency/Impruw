var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/room-summary/show/controller', 'apps/room-summary/checkin/controller', 'apps/room-summary/policies/controller'], function(App) {
  return App.module('RoomSummaryApp', function(RoomSummaryApp, App, Backbone, Marionette, $, _) {
    var API;
    RoomSummaryApp.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'room-summary': 'show'
      };

      return Router;

    })(Marionette.AppRouter);
    API = {
      show: function() {
        return new RoomSummaryApp.Show.Controller({
          region: App.rightRegion
        });
      }
    };
    return RoomSummaryApp.on({
      'start': function() {
        return new RoomSummaryApp.Router({
          controller: API
        });
      }
    });
  });
});
