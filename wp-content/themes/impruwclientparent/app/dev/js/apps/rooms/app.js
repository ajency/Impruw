var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/rooms/list/controller', 'apps/rooms/add/controller', 'apps/rooms/edit/controller', 'apps/slider-manager/edit-slider/editcontroller'], function(App) {
  return App.module('RoomsApp', function(RoomsApp, App, Backbone, Marionette, $, _) {
    var API;
    RoomsApp.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'rooms': 'list',
        'rooms/add': 'add',
        'rooms/edit/:id': 'edit'
      };

      return Router;

    })(Marionette.AppRouter);
    API = {
      list: function() {
        return App.execute("show:rooms:list", {
          region: App.rightRegion
        });
      },
      add: function() {
        return App.execute("show:add:room");
      },
      edit: function(id) {
        return App.execute('show:edit:room', {
          region: App.rightRegion,
          roomId: parseInt(id)
        });
      }
    };
    return RoomsApp.on({
      'start': function() {
        return new RoomsApp.Router({
          controller: API
        });
      }
    });
  });
});
