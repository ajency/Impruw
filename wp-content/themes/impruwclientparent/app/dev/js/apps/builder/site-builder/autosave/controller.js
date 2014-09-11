var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['app', 'apps/builder/site-builder/autosave/autosavehelper', 'heartbeat'], function(App, AutoSaveHelper) {
  return App.module('SiteBuilderApp.AutoSave', function(AutoSave, App, Backbone, Marionette, $, _) {
    var $document, AutoSaveAPI, AutoSaveLocal, AutoSaveServer;
    $document = $(document);
    AutoSaveLocal = (function(_super) {
      __extends(AutoSaveLocal, _super);

      function AutoSaveLocal() {
        return AutoSaveLocal.__super__.constructor.apply(this, arguments);
      }

      AutoSaveLocal.prototype.initialize = function() {
        return this.hasSupport = this.checkLocalStorgeSupport();
      };

      AutoSaveLocal.prototype.checkLocalStorgeSupport = function() {
        var error, result, test;
        test = Math.random().toString();
        result = false;
        try {
          window.sessionStorage.setItem('wp-test', test);
          result = window.sessionStorage.getItem('wp-test') === test;
          window.sessionStorage.removeItem('wp-test');
        } catch (_error) {
          error = _error;
        }
        return result;
      };

      AutoSaveLocal.prototype.getLastSaved = function(pageId) {
        return 'lst-saved';
      };

      AutoSaveLocal.prototype.saveLocal = function(json) {};

      return AutoSaveLocal;

    })(Marionette.Controller);
    AutoSaveServer = (function(_super) {
      __extends(AutoSaveServer, _super);

      function AutoSaveServer() {
        this.handleTick = __bind(this.handleTick, this);
        this.hbAutoSavePageJSONTick = __bind(this.hbAutoSavePageJSONTick, this);
        this.hbAutoSavePageJSONSend = __bind(this.hbAutoSavePageJSONSend, this);
        return AutoSaveServer.__super__.constructor.apply(this, arguments);
      }

      AutoSaveServer.prototype.initialize = function(options) {
        this.local = options.local;
        this._lastUpdated = 0;
        this.autoSaveData = false;
        this.nextRun = 0;
        $document.on('heartbeat-send.autosave-page-json', this.hbAutoSavePageJSONSend);
        $document.on('heartbeat-tick.autosave-page-json', this.hbAutoSavePageJSONTick);
        this.canAutosave = true;
        this.listenTo(App.vent, 'page:took:over', (function(_this) {
          return function(errorMessage) {
            return _this.canAutosave = false;
          };
        })(this));
        return this.listenTo(App.vent, 'page:released', (function(_this) {
          return function() {
            return _this.canAutosave = true;
          };
        })(this));
      };

      AutoSaveServer.prototype.hbAutoSavePageJSONSend = function(evt, data) {
        this.autoSaveData = this.getAutoSaveData();
        if (this.autoSaveData !== false) {
          data['autosave-page-json'] = this.autoSaveData;
        }
        return data;
      };

      AutoSaveServer.prototype.triggerSave = function() {
        this.nextRun = 0;
        return wp.heartbeat.connectNow();
      };

      AutoSaveServer.prototype.getAutoSaveData = function() {
        var data, json, pageId;
        if (!this.canAutosave) {
          return false;
        }
        if ((new Date()).getTime() < this.nextRun) {
          return false;
        }
        json = AutoSaveHelper.getPageJson();
        pageId = App.request("get:original:editable:page");
        if (json === false || !this.isPageModified(json, pageId)) {
          return false;
        }
        this.disableButtons();
        data = _.defaults(json, {
          'page_id': pageId
        });
        this.local.saveLocal(data);
        return data;
      };

      AutoSaveServer.prototype.isPageModified = function(json, pageId) {
        var lastLocalSaved, stringifyJson;
        lastLocalSaved = this.local.getLastSaved(pageId);
        stringifyJson = JSON.stringify(json);
        return lastLocalSaved !== stringifyJson;
      };

      AutoSaveServer.prototype.hbAutoSavePageJSONTick = function(event, data) {
        if (data['autosave-page-json']) {
          return this.handleTick(data['autosave-page-json']);
        }
      };

      AutoSaveServer.prototype.handleTick = function(data) {
        this.schedule();
        this.enableButtons();
        if (data.success === false) {
          App.vent.trigger("autosave:failed", data);
        } else {
          this._lastUpdated = data._last_updated;
        }
        return this.autoSaveData = false;
      };

      AutoSaveServer.prototype.enableButtons = function() {
        return App.vent.trigger('autosave:page:json:enable:buttons');
      };

      AutoSaveServer.prototype.disableButtons = function() {
        return App.vent.trigger('autosave:page:json:disable:buttons');
      };

      AutoSaveServer.prototype.schedule = function() {
        var autosaveInterval;
        if (typeof window.autosaveInterval !== 'undefined') {
          autosaveInterval = window.autosaveInterval;
        } else {
          autosaveInterval = 6;
        }
        return this.nextRun = (new Date()).getTime() + (autosaveInterval * 1000) || 60000;
      };

      return AutoSaveServer;

    })(Marionette.Controller);
    AutoSaveAPI = (function() {
      function AutoSaveAPI() {
        this.local = new AutoSaveLocal;
        this.server = new AutoSaveServer({
          local: this.local
        });
      }

      return AutoSaveAPI;

    })();
    return App.commands.setHandler("autosave-api", function() {
      return App.autoSaveAPI = new AutoSaveAPI;
    });
  });
});
