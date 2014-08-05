var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-rooms/show/view', 'apps/language-translation/language-page-rooms/original-language-rooms/controller', 'apps/language-translation/language-page-rooms/translated-language-rooms/controller', 'apps/language-translation/language-page-rooms/choose-rooms/controller', 'apps/language-translation/language-page-rooms/choose-plans/controller', 'apps/language-translation/language-page-rooms/original-room-facilities/controller', 'apps/language-translation/language-page-rooms/translated-room-facilities/controller', 'apps/language-translation/language-page-rooms/original-room-dateranges/controller', 'apps/language-translation/language-page-rooms/translated-room-dateranges/controller', 'apps/language-translation/language-page-rooms/original-room-plans/controller'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageRooms', function(LanguagePageRooms, App, Backbone, Marionette, $, _) {
    LanguagePageRooms.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this._loadOriginalPlans = __bind(this._loadOriginalPlans, this);
        this._loadTranslatedRooms = __bind(this._loadTranslatedRooms, this);
        this._loadOriginalRooms = __bind(this._loadOriginalRooms, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var editLang;
        editLang = opts.editLang;
        this.editingLang = editLang;
        this.pageLanguageLayout = this._getLanguageLayout();
        $('.aj-imp-widget-content').show();
        this.show(this.pageLanguageLayout, {
          loading: true
        });
        this.listenTo(this.pageLanguageLayout, 'show', (function(_this) {
          return function() {
            App.execute('choose:rooms:app', {
              region: _this.pageLanguageLayout.chooseRooms
            });
            App.execute("original:room:facilities:app", {
              region: _this.pageLanguageLayout.originalRoomFacilities,
              editLang: _this.editingLang
            });
            App.execute("translated:room:facilities:app", {
              region: _this.pageLanguageLayout.translatedRoomFacilities,
              editLang: _this.editingLang
            });
            App.execute("original:room:dateranges:app", {
              region: _this.pageLanguageLayout.originalRoomDateranges,
              editLang: _this.editingLang
            });
            App.execute("translated:room:dateranges:app", {
              region: _this.pageLanguageLayout.translatedRoomDateranges,
              editLang: _this.editingLang
            });
            return App.execute('choose:plans:app', {
              region: _this.pageLanguageLayout.choosePlans
            });
          };
        })(this));
        this.listenTo(this.pageLanguageLayout.chooseRooms, "original:room", this._loadOriginalRooms);
        this.listenTo(this.pageLanguageLayout.chooseRooms, "translated:room", this._loadTranslatedRooms);
        this.listenTo(this.pageLanguageLayout.choosePlans, "original:plan", this._loadOriginalPlans);
        return this.listenTo(this.pageLanguageLayout.choosePlans, "translated:plan", this._loadTranslatedPlans);
      };

      Controller.prototype._getLanguageLayout = function() {
        return new LanguagePageRooms.Views.PageRooomsLayout;
      };

      Controller.prototype._loadOriginalRooms = function(selectedRoomIndex) {
        App.execute('show:original:rooms:app', {
          region: this.pageLanguageLayout.originalRoomContent,
          roomId: selectedRoomIndex
        });
      };

      Controller.prototype._loadTranslatedRooms = function(selectedRoomIndex) {
        App.execute('show:translated:rooms:app', {
          region: this.pageLanguageLayout.translatedRoomContent,
          roomId: selectedRoomIndex,
          editingLang: this.editingLang
        });
      };

      Controller.prototype._loadOriginalPlans = function(selectedPlan) {
        App.execute('show:original:plans:app', {
          region: this.pageLanguageLayout.originalPlanContent,
          planId: selectedPlan
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:language:page:rooms:app", function(opts) {
      return new LanguagePageRooms.Controller(opts);
    });
  });
});
