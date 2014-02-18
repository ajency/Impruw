// Generated by CoffeeScript 1.6.3
(function() {
  define(['app', 'apps/builder/site-builder/show/controller', 'apps/builder/site-builder/element/controller', 'apps/builder/site-builder/settings/controller', 'apps/builder/site-builder/autosave/controller', 'apps/builder/site-builder/elements-loader'], function(App) {
    return App.module('SiteBuilderApp', function(SiteBuilderApp, App, Backbone, Marionette, $, _) {
      var API;
      API = {
        show: function() {
          return this.showController = new SiteBuilderApp.Show.Controller;
        },
        appendNewElement: function(container, type, modelData) {
          return new SiteBuilderApp.Element[type].Controller({
            container: container,
            type: type,
            modelData: modelData
          });
        },
        showSettings: function(model, x, y) {
          return new SiteBuilderApp.Settings.Controller({
            region: App.settingsRegion,
            model: model
          });
        },
        autoSave: function() {
          var autoSave;
          autoSave = new SiteBuilderApp.AutoSave.Controller;
          return autoSave.autoSave();
        },
        fetchCurrentPageJSON: function() {
          var pageId;
          pageId = App.request("get:current:editable:page");
          return this.showController.fetchCurrentPageJSON(pageId);
        },
        getDroppedRegion: function(sectionID) {
          switch (sectionID) {
            case 'site-header-region':
              return 'header';
            case 'site-page-region':
              return 'page';
            case 'site-footer-region':
              return 'footer';
            default:
              return 'page';
          }
        }
      };
      App.vent.on("element:dropped", function(container, type, modelData) {
        if (modelData == null) {
          modelData = {};
        }
        return API.appendNewElement(container, type, modelData);
      });
      App.reqres.setHandler("get:dropped:region", function(sectionID) {
        return API.getDroppedRegion(sectionID);
      });
      App.vent.on("show:settings:popup", function(model, x, y) {
        return API.showSettings(model, x, y);
      });
      App.commands.setHandler("auto:save", function() {
        return API.autoSave();
      });
      App.commands.setHandler("fetch:current:page:json", function() {
        return API.fetchCurrentPageJSON();
      });
      return SiteBuilderApp.on('start', function() {
        return API.show();
      });
    });
  });

}).call(this);
