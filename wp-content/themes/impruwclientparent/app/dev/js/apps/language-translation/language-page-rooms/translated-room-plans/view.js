var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-page-rooms/translated-room-plans/templates/translatedplansview.html'], function(App, translatedplansviewTpl) {
  return App.module('LanguageApp.LanguagePageRooms.TranslatedPlans.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.TranslatedPlanItemView = (function(_super) {
      __extends(TranslatedPlanItemView, _super);

      function TranslatedPlanItemView() {
        return TranslatedPlanItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedPlanItemView.prototype.template = translatedplansviewTpl;

      TranslatedPlanItemView.prototype.events = {
        "click #btn_update_plan_translation": "updateRoomPlan"
      };

      TranslatedPlanItemView.prototype.updateRoomPlan = function(e) {
        var newPlanDesc, newPlanTitle, planId;
        e.preventDefault();
        newPlanTitle = this.$el.find('#translated-plan-name').val();
        newPlanDesc = this.$el.find('#translated-plan-desc').val();
        planId = this.$el.find('#translated-plan-id').val();
        return this.trigger("translated:plan:updated", newPlanTitle, newPlanDesc, planId);
      };

      TranslatedPlanItemView.prototype.onRoomPlanUpdated = function() {
        this.$el.find('.alert').remove();
        this.$el.append('<div class="alert alert-success">' + _.polyglot.t("Room plan details updated") + '</div>');
        return this.$el.find('.alert').fadeOut(5000);
      };

      return TranslatedPlanItemView;

    })(Marionette.ItemView);
  });
});
