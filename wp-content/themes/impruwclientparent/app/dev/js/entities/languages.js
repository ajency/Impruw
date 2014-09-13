var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Languages", function(Languages, App, Backbone, Marionette, $, _) {
    var API, languages;
    Languages.LanguageModel = (function(_super) {
      __extends(LanguageModel, _super);

      function LanguageModel() {
        return LanguageModel.__super__.constructor.apply(this, arguments);
      }

      LanguageModel.prototype.name = 'language';

      LanguageModel.prototype.idAttribute = 'code';

      return LanguageModel;

    })(Backbone.Model);
    Languages.LanguagesCollection = (function(_super) {
      __extends(LanguagesCollection, _super);

      function LanguagesCollection() {
        return LanguagesCollection.__super__.constructor.apply(this, arguments);
      }

      LanguagesCollection.prototype.model = Languages.LanguageModel;

      LanguagesCollection.prototype.url = function() {
        return AJAXURL + '?action=get-languages';
      };

      return LanguagesCollection;

    })(Backbone.Collection);
    languages = new Languages.LanguagesCollection;
    languages.add(window.LANGUAGES);
    API = {
      getLanguages: function() {
        return languages;
      },
      getSelectedLanguages: function() {
        var selectedLanguages;
        languages = this.getLanguages();
        selectedLanguages = new Languages.LanguagesCollection;
        selectedLanguages.set(languages.where({
          'selectStatus': true
        }));
        return selectedLanguages;
      }
    };
    App.reqres.setHandler("get:all:languages", function() {
      return API.getLanguages();
    });
    return App.reqres.setHandler("get:selected:languages", function() {
      return API.getSelectedLanguages();
    });
  });
});
