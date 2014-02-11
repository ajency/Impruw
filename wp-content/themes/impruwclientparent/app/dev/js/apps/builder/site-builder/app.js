// Generated by CoffeeScript 1.6.3
(function() {
  define(['app', 'apps/builder/site-builder/show/controller', 'apps/builder/site-builder/element/controller', 'apps/builder/site-builder/settings/controller'], function(App) {
    return App.module('SiteBuilderApp', function(SiteBuilderApp, App, Backbone, Marionette, $, _) {
      var API;
      API = {
        show: function() {
          return new SiteBuilderApp.Show.Controller;
        },
        appendNewElement: function(evt, ui) {
          return new SiteBuilderApp.Element.Controller({
            evt: evt,
            ui: ui
          });
        },
        showSettings: function(model) {
          return new SiteBuilderApp.Settings.Controller({
            region: App.settingsRegion,
            model: model
          });
        },
        deleteElement: function(model) {
          return model.destroy();
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
      App.vent.on("element:dropped", function(evt, ui) {
        return API.appendNewElement(evt, ui);
      });
      App.reqres.setHandler("get:dropped:region", function(sectionID) {
        return API.getDroppedRegion(sectionID);
      });
      App.vent.on("show:settings:popup", function(model) {
        return API.showSettings(model);
      });
      App.vent.on("delete:element", function(model) {
        if (confirm("Are you sure?")) {
          return API.deleteElement(model);
        }
      });
      return SiteBuilderApp.on('start', function() {
        return API.show();
      });
    });
  });

}).call(this);
