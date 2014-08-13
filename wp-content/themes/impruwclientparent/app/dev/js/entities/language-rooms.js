var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.LanguageFacilities", function(LanguageFacilities, App, Backbone, Marionette, $, _) {
    var API, facilityCollection, facilityModel;
    LanguageFacilities.FacilityModel = (function(_super) {
      __extends(FacilityModel, _super);

      function FacilityModel() {
        return FacilityModel.__super__.constructor.apply(this, arguments);
      }

      FacilityModel.prototype.name = 'languagfacility';

      FacilityModel.prototype.idAttribute = 'term_id';

      return FacilityModel;

    })(Backbone.Model);
    LanguageFacilities.FacilityCollection = (function(_super) {
      __extends(FacilityCollection, _super);

      function FacilityCollection() {
        return FacilityCollection.__super__.constructor.apply(this, arguments);
      }

      FacilityCollection.prototype.model = LanguageFacilities.FacilityModel;

      FacilityCollection.prototype.url = function() {
        return AJAXURL + '?fetch-language-facility';
      };

      return FacilityCollection;

    })(Backbone.Collection);
    facilityModel = new LanguageFacilities.FacilityModel;
    facilityCollection = new LanguageFacilities.FacilityCollection;
    API = {
      getFacilities: function(editlanguage) {
        facilityCollection.fetch({
          data: {
            editlanguage: editlanguage
          }
        });
        return facilityCollection;
      }
    };
    return App.reqres.setHandler("get:lang:facilities", function(editlanguage) {
      return API.getFacilities(editlanguage);
    });
  });
});
