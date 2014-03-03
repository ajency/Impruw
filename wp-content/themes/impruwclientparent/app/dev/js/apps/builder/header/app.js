define(['app', 'apps/builder/header/show/controller'], function(App) {
  return App.module('HeaderApp', function(HeaderApp, App, Backbone, Marionette, $, _) {
    var API;
    API = {
      show: function() {
        return new HeaderApp.Show.Controller({
          region: App.headerRegion
        });
      },
      getCurrentPageId: function() {
        return $.cookie('current-page-id');
      }
    };
    App.reqres.setHandler("get:current:editable:page", function() {
      return API.getCurrentPageId();
    });
    return HeaderApp.on('start', function() {
      return API.show();
    });
  });
});
