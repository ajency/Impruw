var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'backbone'], function(App, Backbone) {
  return App.module("Entities.Analytics", function(Analytics, App, Backbone, Marionette, $, _) {
    var API;
    Analytics.AnalyticsModel = (function(_super) {
      __extends(AnalyticsModel, _super);

      function AnalyticsModel() {
        return AnalyticsModel.__super__.constructor.apply(this, arguments);
      }

      AnalyticsModel.prototype.idAttribute = 'date';

      return AnalyticsModel;

    })(Backbone.AssociatedModel);
    Analytics.AnalyticsCollection = (function(_super) {
      __extends(AnalyticsCollection, _super);

      function AnalyticsCollection() {
        return AnalyticsCollection.__super__.constructor.apply(this, arguments);
      }

      AnalyticsCollection.prototype.model = Analytics.AssociatedModel;

      return AnalyticsCollection;

    })(Backbone.Collection);
    API = {
      createStoreCollection: function() {
        var analyticsCollection;
        analyticsCollection = new Media.AnalyticsCollection;
        return App.request("set:collection", 'analyticscollection', analyticsCollection);
      }
    };
    return App.commands.setHandler("create:analytics:store", function() {
      return API.createStoreCollection();
    });
  });
});
