// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["app", 'backbone'], function(App, Backbone) {
    return App.module("Entities.Themes", function(Themes, App, Backbone, Marionette, $, _) {
      var API, _ref, _ref1;
      Themes.ThemeModel = (function(_super) {
        __extends(ThemeModel, _super);

        function ThemeModel() {
          _ref = ThemeModel.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        ThemeModel.prototype.defaults = function() {};

        return ThemeModel;

      })(Backbone.Model);
      Themes.ThemeCollection = (function(_super) {
        __extends(ThemeCollection, _super);

        function ThemeCollection() {
          _ref1 = ThemeCollection.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        ThemeCollection.prototype.model = Themes.ThemeModel;

        ThemeCollection.prototype.url = function() {
          return "" + AJAXURL + "?action=get-themes";
        };

        return ThemeCollection;

      })(Backbone.Collection);
      API = {
        getThemes: function(param) {
          var themes;
          if (param == null) {
            param = {};
          }
          themes = new Themes.ThemeCollection;
          themes.fetch({
            reset: true,
            data: param
          });
          return themes;
        }
      };
      return App.reqres.setHandler("get:themes", function() {
        return API.getThemes();
      });
    });
  });

}).call(this);
