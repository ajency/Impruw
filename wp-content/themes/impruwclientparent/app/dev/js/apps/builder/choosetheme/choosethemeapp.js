var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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
        this.themeSelected = __bind(this.themeSelected, this);
        this.resetRouter = __bind(this.resetRouter, this);
        this.languageUpdated = __bind(this.languageUpdated, this);
        this.chooseSiteLanguage = __bind(this.chooseSiteLanguage, this);
        this.cancelThemeSwitch = __bind(this.cancelThemeSwitch, this);
        return ChooseThemeController.__super__.constructor.apply(this, arguments);
      }

      ChooseThemeController.prototype.initialize = function() {
        var themesCollection, view;
        themesCollection = App.request("get:themes:collection");
        this.view = view = this._getChooseThemeView(themesCollection);
        this.listenViewEvents(view);
        return this.show(view, {
          loading: true
        });
      };

      ChooseThemeController.prototype.listenViewEvents = function(view) {
        this.listenTo(view, "itemview:choose:theme:clicked", this.themeSelected);
        this.listenTo(view, "cancel:theme:switch", this.cancelThemeSwitch);
        this.listenTo(view, "choose:site:language", this.chooseSiteLanguage);
        return this.listenTo(view, "close", this.resetRouter);
      };

      ChooseThemeController.prototype.cancelThemeSwitch = function() {
        return this.view.close();
      };

      ChooseThemeController.prototype.chooseSiteLanguage = function(language) {
        return $.post("" + AJAXURL + "?action=choose-site-language", {
          site_language: language
        }, this.languageUpdated, 'json');
      };

      ChooseThemeController.prototype.languageUpdated = function(response) {
        return this.view.triggerMethod("site:language:updated");
      };

      ChooseThemeController.prototype.resetRouter = function() {
        return App.navigate('');
      };

      ChooseThemeController.prototype.themeSelected = function(iv, model) {
        var data, responseFn;
        data = {
          new_theme_id: model.get('ID')
        };
        if (ISTHEMESELECTED === 1) {
          data.clone_pages = false;
        }
        responseFn = (function(_this) {
          return function() {
            return window.location.href = BUILDERURL;
          };
        })(this);
        return $.post("" + AJAXURL + "?action=assign-theme-to-site", data, responseFn, 'json');
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
