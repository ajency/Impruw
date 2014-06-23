var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Language", function(Language, App, Backbone, Marionette, $, _) {
    var API, language;
    Language.LanguageModel = (function(_super) {
      __extends(LanguageModel, _super);

      function LanguageModel() {
        return LanguageModel.__super__.constructor.apply(this, arguments);
      }

      LanguageModel.prototype.name = 'language';

      LanguageModel.prototype.idAttribute = 'ID';

      LanguageModel.prototype.defaults = {
        'ID': 1
      };

      return LanguageModel;

    })(Backbone.Model);
    language = new Language.LanguageModel;
    language.fetch();
    API = {
      getLanguageDetails: function() {
        return language;
      }
    };
    return App.reqres.setHandler("get:language:model", function(options) {
      if (options == null) {
        options = {};
      }
      return API.getLanguageDetails();
    });
  });
});
