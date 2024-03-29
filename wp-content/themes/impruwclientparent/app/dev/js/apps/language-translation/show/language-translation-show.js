var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/show/language-translation-view'], function(App, AppController) {
  return App.module('LanguageApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    return Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this._loadPageContent = __bind(this._loadPageContent, this);
        this._loadMenuContent = __bind(this._loadMenuContent, this);
        this._loadFooterContent = __bind(this._loadFooterContent, this);
        this._loadHeaderContent = __bind(this._loadHeaderContent, this);
        this._loadSiteContent = __bind(this._loadSiteContent, this);
        this._loadPageRoomContent = __bind(this._loadPageRoomContent, this);
        this._loadPageNavBar = __bind(this._loadPageNavBar, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        this.languageLayout = this._getLanguageLayout();
        this.show(this.languageLayout, {
          loading: true
        });
        App.vent.trigger("set:active:menu", 'language');
        this.listenTo(this.languageLayout, 'show', (function(_this) {
          return function() {
            return App.execute('show:language:selection:app', {
              region: _this.languageLayout.languageSelectionRegion
            });
          };
        })(this));
        this.listenTo(this.languageLayout.languageSelectionRegion, "load:page:nav:bar", this._loadPageNavBar);
        this.listenTo(this.languageLayout.languagePageNav, "load:page:room:content", this._loadPageRoomContent);
        this.listenTo(this.languageLayout.languagePageNav, "load:other:page:content", this._loadPageContent);
        this.listenTo(this.languageLayout.languagePageNav, "load:site:content", this._loadSiteContent);
        this.listenTo(this.languageLayout.languagePageNav, "load:header:content", this._loadHeaderContent);
        this.listenTo(this.languageLayout.languagePageNav, "load:footer:content", this._loadFooterContent);
        return this.listenTo(this.languageLayout.languagePageNav, "load:menu:content", this._loadMenuContent);
      };

      Controller.prototype._getLanguageLayout = function() {
        return new Show.Views.LanguageLayout;
      };

      Controller.prototype._loadPageNavBar = function(selectedEditingLanguage) {
        return App.execute("show:language:page:nav:app", {
          region: this.languageLayout.languagePageNav,
          language: selectedEditingLanguage
        });
      };

      Controller.prototype._loadPageRoomContent = function(editingLanguage) {
        return App.execute("show:language:page:rooms:app", {
          region: this.languageLayout.languagePageRooms,
          editLang: editingLanguage
        });
      };

      Controller.prototype._loadSiteContent = function(editingLanguage) {
        return App.execute("show:site:content:app", {
          region: this.languageLayout.languagePageRooms,
          editLang: editingLanguage
        });
      };

      Controller.prototype._loadHeaderContent = function(editingLanguage) {
        return App.execute("show:header:content:app", {
          region: this.languageLayout.languagePageRooms,
          editLang: editingLanguage
        });
      };

      Controller.prototype._loadFooterContent = function(editingLanguage) {
        return App.execute("show:footer:content:app", {
          region: this.languageLayout.languagePageRooms,
          editLang: editingLanguage
        });
      };

      Controller.prototype._loadMenuContent = function(editingLanguage) {
        return App.execute("show:menu:content:app", {
          region: this.languageLayout.languagePageRooms,
          editLang: editingLanguage
        });
      };

      Controller.prototype._loadPageContent = function(editingLanguage, pageId, originalId) {
        return App.execute("show:language:page:content:app", {
          region: this.languageLayout.languagePageRooms,
          editLang: editingLanguage,
          pageId: pageId,
          originalId: originalId
        });
      };

      return Controller;

    })(AppController);
  });
});
