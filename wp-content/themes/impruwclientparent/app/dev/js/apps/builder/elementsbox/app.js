define(['app', 'apps/builder/elementsbox/show/controller'], function(App) {
  return App.module('ElementsBoxApp', function(ElementsBoxApp, App, Backbone, Marionette, $, _) {
    var API;
    API = {
      show: function() {
        return new ElementsBoxApp.Show.Controller({
          region: App.elementsBoxRegion
        });
      }
    };
    return ElementsBoxApp.on('start', function() {
      return API.show();
    });
  });
});
