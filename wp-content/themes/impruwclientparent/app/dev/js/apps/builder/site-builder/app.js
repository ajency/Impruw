define(['app', 'apps/builder/site-builder/show/controller', 'apps/builder/site-builder/element/controller', 'apps/builder/site-builder/autosave/controller', 'apps/builder/site-builder/elements-loader'], function(App) {
  return App.module('SiteBuilderApp', function(SiteBuilderApp, App, Backbone, Marionette, $, _) {
    var API;
    SiteBuilderApp['header'] = false;
    SiteBuilderApp['page-content'] = false;
    SiteBuilderApp['footer'] = false;
    API = {
      show: function() {
        return this.showController = new SiteBuilderApp.Show.Controller;
      },
      addNewElement: function(container, type, modelData) {
        if (SiteBuilderApp.Element[type]) {
          return new SiteBuilderApp.Element[type].Controller({
            container: container,
            modelData: modelData
          });
        }
      },
      autoSave: function() {
        var autoSave;
        autoSave = new SiteBuilderApp.AutoSave.Controller;
        return autoSave.autoSave();
      },
      isSectionModified: function(section) {
        return SiteBuilderApp[section];
      },
      sectionModified: function(section) {
        return SiteBuilderApp[section] = true;
      },
      resetSection: function() {
        SiteBuilderApp['header'] = false;
        SiteBuilderApp['page-content'] = false;
        return SiteBuilderApp['footer'] = false;
      }
    };
    App.reqres.setHandler("add:new:element", function(container, type, modelData) {
      if (modelData == null) {
        modelData = {};
      }
      return API.addNewElement(container, type, modelData);
    });
    App.commands.setHandler("auto:save", function() {
      return API.autoSave();
    });
    App.reqres.setHandler("is:section:modified", function(section) {
      return API.isSectionModified(section);
    });
    App.reqres.setHandler("section:modified", function(section) {
      return API.sectionModified(section);
    });
    return SiteBuilderApp.on('start', function() {
      return API.show();
    });
  });
});
