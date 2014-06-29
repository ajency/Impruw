var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.LanguageFacilities", function(LanguageFacilities, App, Backbone, Marionette, $, _) {
    var API, facilityCollection;
    LanguageFacilities.FacilityModel = (function(_super) {
      __extends(FacilityModel, _super);

      function FacilityModel() {
        return FacilityModel.__super__.constructor.apply(this, arguments);
      }

      FacilityModel.prototype.name = 'languagefacility';

      FacilityModel.prototype.idAttribute = 'facilityId';

      return FacilityModel;

    })(Backbone.Model);
    LanguageFacilities.FacilityCollection = (function(_super) {
      __extends(FacilityCollection, _super);

      function FacilityCollection() {
        return FacilityCollection.__super__.constructor.apply(this, arguments);
      }

      FacilityCollection.prototype.model = LanguageFacilities.FacilityModel;

      FacilityCollection.prototype.url = function() {
        return AJAXURL + '?action=fetch-default-facilities';
      };

      return FacilityCollection;

    })(Backbone.Collection);
    facilityCollection = new LanguageFacilities.FacilityCollection;
    API = {
      getDefaultFacilities: function() {
        facilityCollection.fetch();
        return facilityCollection;
      },
      getEditedLanguageFacilities: function(editLang) {
        var languageFacilities;
        languageFacilities = new LanguageFacilities.FacilityCollection;
        languageFacilities.fetch({
          data: {
            editLang: editLang
          }
        });
        return languageFacilities;
      }
    };
    App.reqres.setHandler("get:default:facilities", function() {
      return API.getDefaultFacilities();
    });
    return App.reqres.setHandler("get:edited:language:facilities", function(editLang) {
      return API.getEditedLanguageFacilities(editLang);
    });
  });
});
