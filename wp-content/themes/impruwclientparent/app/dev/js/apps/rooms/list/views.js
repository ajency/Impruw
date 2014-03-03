var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'tpl!apps/rooms/list/templates/mainview', 'tpl!apps/rooms/list/templates/singleroom', 'tpl!apps/rooms/list/templates/emptyview'], function(App, mainviewTpl, roomsingleTpl, emptyTpl) {
  App.module('RoomsApp.List.View', function(View, App, Backbone, Marionette, $, _) {
    View.RoomSingle = (function(_super) {
      __extends(RoomSingle, _super);

      function RoomSingle() {
        return RoomSingle.__super__.constructor.apply(this, arguments);
      }

      RoomSingle.prototype.template = roomsingleTpl;

      RoomSingle.prototype.tagName = 'tr';

      RoomSingle.prototype.events = {
        'click a.editroom_link': function(e) {
          return this.trigger('edit:room:clicked', this.model);
        }
      };

      return RoomSingle;

    })(Marionette.ItemView);
    View.EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.template = emptyTpl;

      return EmptyView;

    })(Marionette.ItemView);
    return View.MainView = (function(_super) {
      __extends(MainView, _super);

      function MainView() {
        return MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.template = mainviewTpl;

      MainView.prototype.itemViewContainer = '.room-list tbody';

      MainView.prototype.itemView = View.RoomSingle;

      MainView.prototype.emptyView = View.EmptyView;

      return MainView;

    })(Marionette.CompositeView);
  });
  return App.RoomsApp.List.View;
});
