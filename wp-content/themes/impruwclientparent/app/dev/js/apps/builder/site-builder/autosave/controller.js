var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['app', 'apps/builder/site-builder/autosave/autosavehelper', 'heartbeat'], function(App, AutoSaveHelper) {
  return App.module('SiteBuilderApp.AutoSave', function(AutoSave, App, Backbone, Marionette, $, _) {
    var $document, AutoSaveAPI, AutoSaveLocal, AutoSaveServer;
    $document = $(document);
    AutoSaveLocal = (function() {
      function AutoSaveLocal() {
        this.hasSupport = this.checkLocalStorgeSupport();
      }

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

      return AutoSaveLocal;

    })();
    AutoSaveServer = (function() {
      function AutoSaveServer() {
        this.handleTick = __bind(this.handleTick, this);
        this.hbAutoSavePageJSONTick = __bind(this.hbAutoSavePageJSONTick, this);
        this.hbAutoSavePageJSONSend = __bind(this.hbAutoSavePageJSONSend, this);
        this.autoSaveData = false;
        this.nextRun = 0;
        $document.on('heartbeat-send.autosave-page-json', this.hbAutoSavePageJSONSend);
        $document.on('heartbeat-tick.autosave-page-json', this.hbAutoSavePageJSONTick);
      }

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
        if ((new Date()).getTime() < this.nextRun) {
          return false;
        }
        pageId = App.request("get:original:editable:page");
        json = AutoSaveHelper.getPageJson();
        if (json === false) {
          return false;
        }
        this.disableButtons();
        data = _.defaults(json, {
          'page_id': pageId
        });
        return data;
      };

      AutoSaveServer.prototype.hbAutoSavePageJSONTick = function(event, data) {
        if (data['autosave-page-json']) {
          return this.handleTick(data['autosave-page-json']);
        }
      };

      AutoSaveServer.prototype.handleTick = function() {
        this.schedule();
        this.enableButtons();
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

    })();
    AutoSaveAPI = (function() {
      function AutoSaveAPI() {
        this.local = new AutoSaveLocal;
        this.server = new AutoSaveServer;
      }

      return AutoSaveAPI;

    })();
    return App.commands.setHandler("autosave-api", function() {
      return App.autoSaveAPI = new AutoSaveAPI;
    });
  });
});
