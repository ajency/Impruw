var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-rooms/choose-plans/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageRooms.ChoosePlans', function(ChoosePlans, App, Backbone, Marionette, $, _) {
    ChoosePlans.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var collection;
        this.collection = collection = App.request("get:plans:collection");
        this.ChoosePlansView = this._getPlansView(collection);
        this.listenTo(this.ChoosePlansView, "load:original:plans", this.loadOriginalPlans);
        this.listenTo(this.ChoosePlansView, "load:translated:plans", this.loadTranslatedPlans);
        return this.show(this.ChoosePlansView, {
          loading: true
        });
      };

      Controller.prototype._getPlansView = function(collection) {
        if (collection.length === 0) {
          return new ChoosePlans.Views.EmptyView({
            collection: collection
          });
        } else {
          return new ChoosePlans.Views.ChoosePlansView({
            collection: collection
          });
        }
      };

      Controller.prototype.loadOriginalPlans = function(selectedPlanId) {
        return Marionette.triggerMethod.call(this.region, "original:plan", selectedPlanId);
      };

      Controller.prototype.loadTranslatedPlans = function(selectedPlanId) {
        return Marionette.triggerMethod.call(this.region, "translated:plan", selectedPlanId);
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("choose:plans:app", function(opts) {
      return new ChoosePlans.Controller(opts);
    });
  });
});
