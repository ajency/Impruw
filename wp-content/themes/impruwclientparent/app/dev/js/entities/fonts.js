var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Fonts", function(Fonts, App, Backbone, Marionette, $, _) {
    var API, FontsCollection, FontsModel, fontsCollection, mainFontModel, titleFontModel;
    FontsModel = (function(_super) {
      __extends(FontsModel, _super);

      function FontsModel() {
        return FontsModel.__super__.constructor.apply(this, arguments);
      }

      FontsModel.prototype.name = 'fonts';

      FontsModel.prototype.idAttribute = 'ID';

      return FontsModel;

    })(Backbone.Model);
    FontsCollection = (function(_super) {
      __extends(FontsCollection, _super);

      function FontsCollection() {
        return FontsCollection.__super__.constructor.apply(this, arguments);
      }

      FontsCollection.prototype.model = FontsModel;

      FontsCollection.prototype.url = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCd10sz9JLJawK8D8tcdAbYQw7t4U3xA1A';

      FontsCollection.prototype.parse = function(response) {
        return response.items;
      };

      return FontsCollection;

    })(Backbone.Collection);
    fontsCollection = new FontsCollection;
    mainFontModel = new FontsModel(THEMEFONTMAIN);
    titleFontModel = new FontsModel(THEMEFONTTITLE);
    API = {
      getGoogleFonts: function() {
        if (fontsCollection.size()) {
          return fontsCollection;
        } else {
          fontsCollection.fetch();
          return fontsCollection;
        }
      },
      getCurrentThemeFont: function() {
        return mainFontModel;
      }
    };
    App.reqres.setHandler('get:google:font', function() {
      return API.getGoogleFonts();
    });
    return App.reqres.setHandler('get:current:theme:font', function() {
      return API.getCurrentThemeFont();
    });
  });
});
