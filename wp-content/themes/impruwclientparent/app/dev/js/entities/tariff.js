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
          '': '',
          '': ''
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
      getTariffCollection: function() {
        return tariffCollection;
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
    App.reqres.setHandler("get:tariffs:collection", function() {
      return API.getTariffCollection();
    });
    return App.reqres.setHandler("get:tariff", function(id) {
      return API.getTariff(id);
    });
  });
});
