var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Plans", function(Plans, App, Backbone, Marionette, $, _) {
    var API, PlanCollection, planCollection;
    Plans = (function(_super) {
      __extends(Plans, _super);

      function Plans() {
        return Plans.__super__.constructor.apply(this, arguments);
      }

      Plans.prototype.name = 'plan';

      Plans.prototype.defaults = function() {
        return {
          plan_name: '',
          plan_description: ''
        };
      };

      return Plans;

    })(Backbone.Model);
    PlanCollection = (function(_super) {
      __extends(PlanCollection, _super);

      function PlanCollection() {
        return PlanCollection.__super__.constructor.apply(this, arguments);
      }

      PlanCollection.prototype.model = Plans;

      PlanCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=fetch-plans";
      };

      return PlanCollection;

    })(Backbone.Collection);
    planCollection = new PlanCollection;
    API = {
      getPlansCollection: function() {
        planCollection;
        planCollection.fetch();
        return planCollection;
      },
      createPlanModel: function(data) {
        var plan;
        if (data == null) {
          data = {};
        }
        plan = new Plans(data);
        return plan;
      }
    };
    App.reqres.setHandler("get:plans:collection", function() {
      return API.getPlansCollection();
    });
    return App.reqres.setHandler("create:plan:model", function(data) {
      return API.createPlanModel(data);
    });
  });
});
