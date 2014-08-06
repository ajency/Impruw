var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-rooms/original-room-plans/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageRooms.OriginalPlans', function(OriginalPlans, App, Backbone, Marionette, $, _) {
    OriginalPlans.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var planId, planModel;
        planId = opts.planId;
        this.planModel = planModel = App.request("get:plan:by:id", planId);
        this.originalPlanView = this._getPlanView(planModel);
        return this.show(this.originalPlanView, {
          loading: true
        });
      };

      Controller.prototype._getPlanView = function(model) {
        return new OriginalPlans.Views.OriginalPlanItemView({
          model: model
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:original:plans:app", function(opts) {
      return new OriginalPlans.Controller(opts);
    });
  });
});
