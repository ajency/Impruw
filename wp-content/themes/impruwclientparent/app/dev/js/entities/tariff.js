var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Tariffs", function(Tariffs, App, Backbone, Marionette, $, _) {
    var API, Tariff, TariffCollection, tariffCollection;
    Tariff = (function(_super) {
      __extends(Tariff, _super);

      function Tariff() {
        return Tariff.__super__.constructor.apply(this, arguments);
      }

      Tariff.prototype.name = 'tariff';

      Tariff.prototype.defaults = function() {
        return {
          'plan_id': 0,
          'daterange_id': 0,
          'weekday': {},
          'weekend': {}
        };
      };

      return Tariff;

    })(Backbone.Model);
    TariffCollection = (function(_super) {
      __extends(TariffCollection, _super);

      function TariffCollection() {
        return TariffCollection.__super__.constructor.apply(this, arguments);
      }

      TariffCollection.prototype.model = Tariff;

      TariffCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=fetch-tariffs";
      };

      return TariffCollection;

    })(Backbone.Collection);
    tariffCollection = new TariffCollection;
    API = {
      getTariffCollection: function(roomId) {
        tariffCollection.fetch({
          reset: true,
          data: {
            room_id: roomId
          }
        });
        return tariffCollection;
      },
      getTariffsForDateRange: function(daterangeId) {
        return tariffCollection.where({
          'daterange_id': daterangeId
        });
      },
      getTariff: function(id) {
        var tariff;
        tariff = new Tariff({
          id: id
        });
        tariff.fetch();
        return tariff;
      }
    };
    App.reqres.setHandler("get:tariffs:collection", function(roomId) {
      return API.getTariffCollection(roomId);
    });
    App.reqres.setHandler("get:tariffs:for:daterange", function(daterangeId) {
      return API.getTariffsForDateRange(daterangeId);
    });
    return App.reqres.setHandler("get:tariff", function(id) {
      return API.getTariff(id);
    });
  });
});
