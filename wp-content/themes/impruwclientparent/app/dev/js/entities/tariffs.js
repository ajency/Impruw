var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Tariffs", function(Tariffs, App, Backbone, Marionette, $, _) {
    var API;
    Tariffs.TariffModel = (function(_super) {
      __extends(TariffModel, _super);

      function TariffModel() {
        return TariffModel.__super__.constructor.apply(this, arguments);
      }

      TariffModel.prototype.defaults = function() {
        return {
          weekdays: {
            tariff_amount: 0
          },
          weekends: {
            tariff_amount: 0
          }
        };
      };

      TariffModel.prototype.relations = [
        {
          type: Backbone.HasOne,
          key: 'room',
          relatedModel: 'App.Tariffs.Media.MediaModel',
          collectionType: 'App.Tariffs.Media.MediaCollection'
        }
      ];

      return TariffModel;

    })(Backbone.RelationalModel);
    Tariffs.TariffCollection = (function(_super) {
      __extends(TariffCollection, _super);

      function TariffCollection() {
        return TariffCollection.__super__.constructor.apply(this, arguments);
      }

      TariffCollection.prototype.model = Tariffs.TariffModel;

      TariffCollection.prototype.url = function(models) {
        var ids, tariff, _i, _len;
        if (models == null) {
          models = [];
        }
        if (models.length === 0) {
          return "" + AJAXURL + "?action=get-tariffs";
        } else {
          ids = [];
          for (_i = 0, _len = models.length; _i < _len; _i++) {
            tariff = models[_i];
            ids.push(tariff.get('id'));
          }
          ids = ids.join();
          return "" + AJAXURL + "?action=get-tariffs&ids=" + ids;
        }
      };

      return TariffCollection;

    })(Backbone.Collection);
    API = {
      getTariffs: function(param) {
        var rooms;
        if (param == null) {
          param = {};
        }
        rooms = new Tariffs.TariffCollection;
        rooms.fetch({
          reset: true,
          data: param
        });
        return rooms;
      }
    };
    return App.reqres.setHandler("get:tariffs:entities", function() {
      return API.getTariffs();
    });
  });
});
