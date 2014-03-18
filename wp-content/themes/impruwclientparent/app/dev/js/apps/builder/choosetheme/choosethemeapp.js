var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/builder/choosetheme/views'], function(App, AppController) {
  return App.module('ChooseTheme', function(ChooseTheme, App) {
    var ChooseThemeController, ChooseThemeRouter, Controller;
    ChooseThemeRouter = (function(_super) {
      __extends(ChooseThemeRouter, _super);

      function ChooseThemeRouter() {
        return ChooseThemeRouter.__super__.constructor.apply(this, arguments);
      }

      ChooseThemeRouter.prototype.appRoutes = {
        'choose-theme': 'chooseTheme'
      };

      return ChooseThemeRouter;

    })(Marionette.AppRouter);
    ChooseThemeController = (function(_super) {
      __extends(ChooseThemeController, _super);

      function ChooseThemeController() {
        return ChooseThemeController.__super__.constructor.apply(this, arguments);
      }

      ChooseThemeController.prototype.initialize = function(opt) {
        var themesCollection, view;
        themesCollection = App.request("get:themes:collection");
        themesCollection.fetch();
        view = this._getChooseThemeView(themesCollection);
        this.listenTo(view, "itemview:choose:theme:clicked", (function(_this) {
          return function(iv, model) {
            return _this.region.close();
          };
        })(this));
        return this.show(view, {
          loading: true
        });
      };

      ChooseThemeController.prototype._getChooseThemeView = function(themesCollection) {
        return new ChooseTheme.Views.ChooseThemeView({
          collection: themesCollection
        });
      };

      return ChooseThemeController;

    })(AppController);
    App.commands.setHandler("show:choose:theme", function(opt) {
      if (opt == null) {
        opt = {};
      }
      if (!opt.region) {
        opt.region = App.chooseThemeRegion;
      }
      return new ChooseThemeController(opt);
    });
    Controller = {
      chooseTheme: function() {
        return new ChooseThemeController({
          region: App.chooseThemeRegion
        });
      }
    };
    return ChooseTheme.on('start', (function(_this) {
      return function() {
        return new ChooseThemeRouter({
          controller: Controller
        });
      };
    })(this));
  });
});
