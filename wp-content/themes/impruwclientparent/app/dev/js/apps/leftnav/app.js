define(['app', 'apps/leftnav/show/controller'], function(App) {
  return App.module('LeftNav', function(LeftNav, App, Backbone, Marionette, $, _) {
    var API;
    API = {
      show: function() {
        var controller;
        controller = new LeftNav.Show.Controller({
          region: App.leftRegion
        });
        return controller.showLeftNav();
      }
    };
    return LeftNav.on('start', function() {
      _.logAppMsg("LeftNav Module started...");
      return API.show();
    });
  });
});
