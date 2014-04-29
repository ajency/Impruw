define(['app', 'apps/builder/site-builder/show/controller', 'apps/builder/site-builder/element/controller', 'apps/builder/site-builder/autosave/controller', 'apps/builder/site-builder/publish/publish', 'apps/builder/site-builder/elements-loader'], function(App) {
  return App.module('SiteBuilderApp', function(SiteBuilderApp, App, Backbone, Marionette, $, _) {
    var API;
    window.S = SiteBuilderApp;
    SiteBuilderApp['header'] = false;
    SiteBuilderApp['page-content'] = false;
    SiteBuilderApp['footer'] = false;
    API = {
      show: function() {
        return this.showController = new SiteBuilderApp.Show.Controller;
      },
      addNewElement: function(container, type, modelData) {
        App.execute("mark:section:as:modified", container);
        if (SiteBuilderApp.Element[type]) {
          return new SiteBuilderApp.Element[type].Controller({
            container: container,
            modelData: modelData
          });
        }
      },
      markSectionAsModified: function(container) {
        return _.each(['header', 'page-content', 'footer'], function(section, index) {
          if ($(container) === $("#site-" + section + "-region") || $(container).closest("#site-" + section + "-region").length > 0) {
            return SiteBuilderApp[section] = true;
          }
        });
      },
      autoSave: function() {
        var autoSave;
        autoSave = new SiteBuilderApp.AutoSave.Controller;
        return autoSave.autoSave();
      },
      publish: function() {
        var publishPage;
        publishPage = new SiteBuilderApp.Publish.Controller;
        return publishPage.publish();
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
    App.commands.setHandler("save:revision", function() {
      return API.autoSave();
    });
    App.commands.setHandler("publish:page", function() {
      return API.publish();
    });
    App.reqres.setHandler("is:section:modified", function(section) {
      return API.isSectionModified(section);
    });
    App.commands.setHandler("mark:section:as:modified", function(container) {
      return API.markSectionAsModified(container);
    });
    App.commands.setHandler("reset:changed:sections", function() {
      return API.resetSection();
    });
    return SiteBuilderApp.on('start', function() {
      return API.show();
    });
  });
});
