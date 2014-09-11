define(['app', 'apps/builder/site-builder/show/controller', 'apps/builder/site-builder/element/controller', 'apps/builder/site-builder/autosave/controller', 'apps/builder/site-builder/publish/publish', 'apps/builder/site-builder/elements-loader'], function(App) {
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
        } else {
          return false;
        }
      },
      publish: function() {
        var publishPage;
        publishPage = new SiteBuilderApp.Publish.Controller;
        return publishPage.publish();
      }
    };
    App.reqres.setHandler("add:new:element", function(container, type, modelData) {
      if (modelData == null) {
        modelData = {};
      }
      return API.addNewElement(container, type, modelData);
    });
    App.commands.setHandler("publish:page", function() {
      return API.publish();
    });
    return SiteBuilderApp.on('start', function() {
      return API.show();
    });
  });
});
