var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-selection/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguageSelection', function(LanguageSelection, App, Backbone, Marionette, $, _) {
    LanguageSelection.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var collection;
        this.siteModel = App.request('get:site:model');
        this.collection = collection = App.request("get:all:languages");
        this.languageSelectionView = this._getLanguageView(this.collection, this.siteModel);
        this.listenTo(this.languageSelectionView, "itemview:language:updated", this.updateLanguageModel);
        this.listenTo(this.languageSelectionView, "update:enabled:languages", this.updateEnabledLanguages);
        this.listenTo(this.languageSelectionView, "update:hidden:languages", this.updateHiddenLanguages);
        this.listenTo(this.languageSelectionView, "load:language:page:nav", this.loadLanguagePageNav);
        return this.show(this.languageSelectionView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(collection, model) {
        return new LanguageSelection.Views.LanguageSelectionView({
          collection: collection,
          model: model
        });
      };

      Controller.prototype.updateLanguageModel = function(view, checkbox) {
        var collection, data, model;
        model = view.model;
        collection = model.collection;
        data = [];
        if (checkbox.is(':checked')) {
          data = {
            selectStatus: true
          };
        } else {
          data = {
            selectStatus: false
          };
        }
        return model.set(data);
      };

      Controller.prototype.updateEnabledLanguages = function(enabledLanguageCodes) {
        var data, responseFn;
        data = {
          enabledlanguages: enabledLanguageCodes
        };
        responseFn = (function(_this) {
          return function(response) {
            var selLang, selectedLanguagesCollection;
            selLang = JSON.parse(response.data);
            selectedLanguagesCollection = App.request("get:selected:languages");
            return _this.languageSelectionView.triggerMethod("selected:languages:enabled", selectedLanguagesCollection);
          };
        })(this);
        return $.post("" + AJAXURL + "?action=update-enabled-languages", data, responseFn, 'json');
      };

      Controller.prototype.updateHiddenLanguages = function(languageCode, hiddenValue) {
        var data, responseFn;
        console.log(this.collection);
        data = {
          languageCode: languageCode,
          isHidden: hiddenValue
        };
        responseFn = (function(_this) {
          return function(response) {
            return _this.languageSelectionView.triggerMethod("hidden:languages", response.msg);
          };
        })(this);
        return $.post("" + AJAXURL + "?action=update-hidden-languages", data, responseFn, 'json');
      };

      Controller.prototype.loadLanguagePageNav = function(selectedEditingLanguage) {
        return Marionette.triggerMethod.call(this.region, "load:page:nav:bar", selectedEditingLanguage);
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:language:selection:app", function(opts) {
      return new LanguageSelection.Controller(opts);
    });
  });
});
