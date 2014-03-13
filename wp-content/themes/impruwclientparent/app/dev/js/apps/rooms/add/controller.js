var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/add/views'], function(App, AppController) {
  return App.module('RoomsApp.Add', function(Add, App, Backbone, Marionette, $, _) {
    Add.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.showSaveMessage = __bind(this.showSaveMessage, this);
        this._saveNewRoom = __bind(this._saveNewRoom, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        var layout;
        this.layout = layout = this.getAddRoomLayout();
        this.listenTo(layout, "show", (function(_this) {
          return function() {
            return _this._showAddRoomForm();
          };
        })(this));
        this.show(layout);
        return App.navigate("rooms/add");
      };

      Controller.prototype._showAddRoomForm = function() {
        this.formView = this._getFormView();
        this.listenTo(this.formView, "save:new:room", (function(_this) {
          return function(data) {
            return _this._saveNewRoom(data);
          };
        })(this));
        return this.layout.formRegion.show(this.formView);
      };

      Controller.prototype._saveNewRoom = function(data) {
        var roomModel;
        roomModel = App.request("create:new:room:model", data);
        return roomModel.save(null, {
          wait: true,
          success: this.showSaveMessage
        });
      };

      Controller.prototype.showSaveMessage = function() {
        return this.formView.triggerMethod("show:success:message");
      };

      Controller.prototype._getFormView = function() {
        return new Add.View.AddRoom;
      };

      Controller.prototype.getAddRoomLayout = function() {
        return new Add.View.AddRoomLayout;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:add:room", function(opts) {
      return new Add.Controller;
    });
  });
});
