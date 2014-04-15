var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Themes", function(Themes, App, Backbone, Marionette, $, _) {
    var API, themesCollection;
    Themes.ThemeModel = (function(_super) {
      __extends(ThemeModel, _super);

      function ThemeModel() {
        return ThemeModel.__super__.constructor.apply(this, arguments);
      }

      ThemeModel.prototype.idAttribute = 'ID';

      return ThemeModel;

    })(Backbone.Model);
    ({
      defaults: function() {
        return {
          post_title: '',
          image_url: '',
          preview_link: '#'
        };
      },
      name: 'theme'
    });
    Themes.ThemeCollection = (function(_super) {
      __extends(ThemeCollection, _super);

      function ThemeCollection() {
        return ThemeCollection.__super__.constructor.apply(this, arguments);
      }

      ThemeCollection.prototype.model = Themes.ThemeModel;

      ThemeCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=get-themes";
      };

      ThemeCollection.prototype.getExcept = function(theme) {
        var models;
        models = this.filter(function(theme) {
          return _.slugify(theme.get('post_title')) !== theme;
        });
        return models;
      };

      return ThemeCollection;

    })(Backbone.Collection);
    themesCollection = new Themes.ThemeCollection;
    themesCollection.fetch();
    API = {
      getThemesCollection: function(param) {
        var themes;
        if (param == null) {
          param = {};
        }
        themes = new Themes.ThemeCollection;
        themes = themesCollection.getExcept(CURRENTTHEME);
        return themes;
      }
    };
    return App.reqres.setHandler("get:themes:collection", function() {
      return API.getThemesCollection();
    });
  });
});
