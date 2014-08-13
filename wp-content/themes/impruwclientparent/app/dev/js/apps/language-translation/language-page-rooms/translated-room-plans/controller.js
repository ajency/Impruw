var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-rooms/translated-room-plans/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageRooms.TranslatedPlans', function(TranslatedPlans, App, Backbone, Marionette, $, _) {
    TranslatedPlans.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.planUpdated = __bind(this.planUpdated, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var editingLang, planId, planModel;
        this.planId = planId = opts.planId;
        this.editingLang = editingLang = opts.editingLang;
        this.planModel = planModel = App.request("get:translated:plan:by:id", planId, editingLang);
        this.translatedPlanView = this._getTranslatedPlanView(planModel);
        this.listenTo(this.translatedPlanView, "translated:plan:updated", this.updateTranslatedPlan);
        return this.show(this.translatedPlanView, {
          loading: true
        });
      };

      Controller.prototype._getTranslatedPlanView = function(model) {
        return new TranslatedPlans.Views.TranslatedPlanItemView({
          model: model
        });
      };

      Controller.prototype.updateTranslatedPlan = function(newPlanTitle, newPlanDesc, planId) {
        var data;
        data = [];
        data['translatedPlanTitle'] = newPlanTitle;
        data['translatedPlanDesc'] = newPlanDesc;
        data['translatedPlanID'] = planId;
        this.planModel.set(data);
        return $.post("" + AJAXURL + "?action=update-translated-plan", {
          plan_title: newPlanTitle,
          plan_desc: newPlanDesc,
          plan_id: planId,
          editingLang: this.editingLang
        }, this.planUpdated, 'json');
      };

      Controller.prototype.planUpdated = function(response) {
        return this.translatedPlanView.triggerMethod("room:plan:updated");
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:translated:plans:app", function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new TranslatedPlans.Controller(opts);
    });
  });
});
