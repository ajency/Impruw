var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Plans", function(Plans, App, Backbone, Marionette, $, _) {
    var API, Plan, PlanCollection, planCollection;
    Plan = (function(_super) {
      __extends(Plan, _super);

      function Plan() {
        return Plan.__super__.constructor.apply(this, arguments);
      }

      Plan.prototype.name = 'plan';

      Plan.prototype.defaults = function() {
        return {
          plan_name: '',
          plan_description: ''
        };
      };

      return Plan;

    })(Backbone.Model);
    PlanCollection = (function(_super) {
      __extends(PlanCollection, _super);

      function PlanCollection() {
        return PlanCollection.__super__.constructor.apply(this, arguments);
      }

      PlanCollection.prototype.model = Plan;

      PlanCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=fetch-plans";
      };

      return PlanCollection;

    })(Backbone.Collection);
    planCollection = new PlanCollection;
    _.each(PLANS, function(ele, index) {
      return ele['id'] = parseInt(ele['id']);
    });
    planCollection.set(PLANS);
    API = {
      getPlansCollection: function() {
        return planCollection;
      },
      createPlanModel: function(data) {
        var plan;
        if (data == null) {
          data = {};
        }
        plan = new Plan(data);
        return plan;
      },
      getPlanById: function(id) {
        var plan;
        plan = planCollection.get(parseInt(id));
        return plan;
      },
      getTranslatedPlanById: function(id, language) {
        var translatedPlanModel;
        translatedPlanModel = new Plan;
        translatedPlanModel.fetch({
          data: {
            plan_id: id,
            language: language,
            action: 'fetch-plan-by-language'
          }
        });
        return translatedPlanModel;
      }
    };
    App.reqres.setHandler("get:plans:collection", function() {
      return API.getPlansCollection();
    });
    App.reqres.setHandler("create:plan:model", function(data) {
      return API.createPlanModel(data);
    });
    App.reqres.setHandler("get:plan:by:id", function(id) {
      return API.getPlanById(id);
    });
    return App.reqres.setHandler("get:translated:plan:by:id", function(id, language) {
      return API.getTranslatedPlanById(id, language);
    });
  });
});
