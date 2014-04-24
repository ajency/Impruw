var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/room-summary/show/views'], function(App, AppController) {
  App.module('RoomSummaryApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    return Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        var sitemodel;
        this.layout = this.getLayout();
        this.sitemodel = sitemodel = App.request("get:site:model");
        App.vent.trigger("set:active:menu", 'my-profile');
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            App.execute("show:checkin:time:form", {
              region: _this.layout.checkinRegion,
              model: _this.sitemodel
            });
            return App.execute("show:policies:form", {
              region: _this.layout.policiesRegion,
              model: _this.sitemodel
            });
          };
        })(this));
        return this.show(this.layout);
      };

      Controller.prototype.getLayout = function() {
        return new Show.View.Layout;
      };

      return Controller;

    })(AppController);
  });
  return App.RoomSummaryApp.Show.Controller;
});
