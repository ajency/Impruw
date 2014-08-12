var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/room-summary/checkin/views'], function(App, AppController) {
  return App.module('RoomSummaryApp.Checkin', function(Checkin, App, Backbone, Marionette, $, _) {
    Checkin.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.checkinTimeUpdated = __bind(this.checkinTimeUpdated, this);
        this.updateCheckinTime = __bind(this.updateCheckinTime, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.sitemodel = opts.model;
        this.view = this.getCheckinFormView(this.sitemodel);
        this.listenTo(this.view, "update:checkin:time:click", this.updateCheckinTime);
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getCheckinFormView = function(model) {
        return new Checkin.View.CheckinForm({
          model: model
        });
      };

      Controller.prototype.updateCheckinTime = function(data) {
        this.sitemodel.set(data);
        return this.sitemodel.save(null, {
          wait: true,
          onlyChanged: true,
          success: this.checkinTimeUpdated
        });
      };

      Controller.prototype.checkinTimeUpdated = function() {
        return this.view.triggerMethod("checkin:time:updated");
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:checkin:time:form", function(opts) {
      return new Checkin.Controller(opts);
    });
  });
});
