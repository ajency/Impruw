var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-nav/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageNav', function(LanguagePageNav, App, Backbone, Marionette, $, _) {
    LanguagePageNav.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var collection, language;
        language = opts.language;
        this.editingLanguage = language;
        this.collection = collection = App.request("get:language:pages", language);
        this.languagePageNavView = this._getPageNavView(this.collection);
        this.listenTo(this.languagePageNavView, "itemview:page:room:content", this.loadLanguagePageRoomContent);
        this.listenTo(this.languagePageNavView, "itemview:page:content", this.loadLanguagePageContent);
        this.listenTo(this.languagePageNavView, "site:translate:content", this.loadSiteContent);
        this.listenTo(this.languagePageNavView, "header:translate:content", this.loadHeaderContent);
        this.listenTo(this.languagePageNavView, "footer:translate:content", this.loadFooterContent);
        return this.show(this.languagePageNavView, {
          loading: true
        });
      };

      Controller.prototype._getPageNavView = function(collection) {
        return new LanguagePageNav.Views.LanguagePageNavView({
          collection: collection
        });
      };

      Controller.prototype.loadLanguagePageRoomContent = function() {
        return Marionette.triggerMethod.call(this.region, "load:page:room:content", this.editingLanguage);
      };

      Controller.prototype.loadLanguagePageContent = function(collection, originalPageId) {
        var data, responseFn;
        data = {
          pageId: originalPageId,
          language: this.editingLanguage
        };
        responseFn = (function(_this) {
          return function(response) {
            var originalId, pageId;
            originalId = response.data.original_id;
            pageId = response.data.translated_id;
            return Marionette.triggerMethod.call(_this.region, "load:other:page:content", _this.editingLanguage, pageId, originalId);
          };
        })(this);
        return $.post("" + AJAXURL + "?action=get-language-page", data, responseFn, 'json');
      };

      Controller.prototype.loadSiteContent = function() {
        return Marionette.triggerMethod.call(this.region, "load:site:content", this.editingLanguage);
      };

      Controller.prototype.loadHeaderContent = function() {
        return Marionette.triggerMethod.call(this.region, "load:header:content", this.editingLanguage);
      };

      Controller.prototype.loadFooterContent = function() {
        return Marionette.triggerMethod.call(this.region, "load:footer:content", this.editingLanguage);
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:language:page:nav:app", function(opts) {
      return new LanguagePageNav.Controller(opts);
    });
  });
});
