var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'backbone'], function(App, Backbone) {
  return App.module("Entities.Facilities", function(Facilities, App, Backbone, Marionette, $, _) {
    var API, facilities;
    Facilities.Facility = (function(_super) {
      __extends(Facility, _super);

      function Facility() {
        return Facility.__super__.constructor.apply(this, arguments);
      }

      Facility.prototype.idAttribute = 'term_id';

      Facility.prototype.name = 'facility';

      return Facility;

    })(Backbone.Model);
    Facilities.FacilityCollection = (function(_super) {
      __extends(FacilityCollection, _super);

      function FacilityCollection() {
        return FacilityCollection.__super__.constructor.apply(this, arguments);
      }

      FacilityCollection.prototype.model = Facilities.Facility;

      FacilityCollection.prototype.url = function(models) {
        var facility, ids, _i, _len;
        if (models == null) {
          models = [];
        }
        if (models.length === 0) {
          return "" + AJAXURL + "?action=fetch-facilities";
        } else {
          ids = [];
          for (_i = 0, _len = models.length; _i < _len; _i++) {
            facility = models[_i];
            ids.push(facility.get('term_id'));
          }
          ids = ids.join();
          return "" + AJAXURL + "?action=facilities&ids=" + ids;
        }
      };

      return FacilityCollection;

    })(Backbone.Collection);
    facilities = new Facilities.FacilityCollection;
    facilities.fetch();
    API = {
      getFacilities: function() {
        return facilities;
      },
      createFacilityModel: function(data) {
        return new Facilities.Facility(data);
      }
    };
    App.reqres.setHandler("get:all:facilities", function(options) {
      return API.getFacilities();
    });
    return App.reqres.setHandler("create:new:facility:model", function(data) {
      return API.createFacilityModel(data);
    });
  });
});
