var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/rooms/list/controller', 'apps/rooms/edit/controller'], function(App) {
  return App.module('RoomsApp', function(RoomsApp, App, Backbone, Marionette, $, _) {
    var API;
    RoomsApp.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'rooms': 'list',
        'rooms/edit/:id': 'edit'
      };

      return Router;

    })(Marionette.AppRouter);
    API = {
      list: function() {
        var list;
        list = new RoomsApp.List.Controller;
        return list.showListView();
      },
      edit: function(room) {
        var edit, roomId;
        if (!_.isObject(room)) {
          roomId = parseInt(room);
          room = new App.Entities.Rooms.Room({
            id: roomId
          });
        }
        return edit = new RoomsApp.Edit.Controller({
          model: room
        });
      }
    };
    return RoomsApp.on({
      'start': function() {
        _.logAppMsg("Room Module started...");
        return new RoomsApp.Router({
          controller: API
        });
      }
    });
  });
});
