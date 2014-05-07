var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Themes", function(Themes, App, Backbone, Marionette, $, _) {
    var API, themesCollection, themesColorCollection;
    Themes.ThemeModel = (function(_super) {
      __extends(ThemeModel, _super);

      function ThemeModel() {
        return ThemeModel.__super__.constructor.apply(this, arguments);
      }

      ThemeModel.prototype.idAttribute = 'ID';

      ThemeModel.prototype.defaults = function() {
        return {
          post_title: '',
          image_url: '',
          preview_link: '#'
        };
      };

      ThemeModel.prototype.name = 'theme';

      return ThemeModel;

    })(Backbone.Model);
    Themes.ThemeColorModel = (function(_super) {
      __extends(ThemeColorModel, _super);

      function ThemeColorModel() {
        return ThemeColorModel.__super__.constructor.apply(this, arguments);
      }

      return ThemeColorModel;

    })(Backbone.Model);
    Themes.ThemeColorCollection = (function(_super) {
      __extends(ThemeColorCollection, _super);

      function ThemeColorCollection() {
        return ThemeColorCollection.__super__.constructor.apply(this, arguments);
      }

      ThemeColorCollection.prototype.model = Themes.ThemeColorModel;

      ThemeColorCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=get-default-theme-color-set";
      };

      return ThemeColorCollection;

    })(Backbone.Collection);
    themesColorCollection = new Themes.ThemeColorCollection;
    themesColorCollection.fetch();
    Themes.ThemeCollection = (function(_super) {
      __extends(ThemeCollection, _super);

      function ThemeCollection() {
        this.getExcept = __bind(this.getExcept, this);
        return ThemeCollection.__super__.constructor.apply(this, arguments);
      }

      ThemeCollection.prototype.model = Themes.ThemeModel;

      ThemeCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=get-themes";
      };

      ThemeCollection.prototype.getExcept = function(currentTheme) {
        var models;
        models = this.filter(function(theme) {
          return _.slugify(theme.get('post_title')) !== currentTheme;
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
        themes = themesCollection.getExcept(CURRENTTHEME);
        return new Themes.ThemeCollection(themes);
      },
      getThemeColorCollection: function(param) {
        if (param == null) {
          param = {};
        }
        return themesColorCollection;
      }
    };
    App.reqres.setHandler("get:themes:collection", function() {
      return API.getThemesCollection();
    });
    return App.reqres.setHandler("get:themes:color:collection", function() {
      return API.getThemeColorCollection();
    });
  });
});
