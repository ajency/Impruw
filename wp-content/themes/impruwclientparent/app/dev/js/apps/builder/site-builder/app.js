define(['app', 'apps/builder/site-builder/show/controller', 'apps/builder/site-builder/element/controller', 'apps/builder/site-builder/autosave/controller', 'apps/builder/site-builder/elements-loader'], function(App) {
  return App.module('SiteBuilderApp', function(SiteBuilderApp, App, Backbone, Marionette, $, _) {
    var API;
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
    return SiteBuilderApp.on('start', function() {
      return API.show();
    });
  });
});
