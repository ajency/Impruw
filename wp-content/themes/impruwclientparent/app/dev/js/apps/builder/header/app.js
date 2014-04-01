define(['app', 'apps/builder/header/show/controller'], function(App) {
  return App.module('HeaderApp', function(HeaderApp, App, Backbone, Marionette, $, _) {
    var API, headerController;
    headerController = null;
    API = {
      show: function() {
        return headerController = new HeaderApp.Show.Controller({
          region: App.headerRegion
        });
      },
      getCurrentPageId: function() {
        var page_id;
        page_id = isNaN($.cookie('current-page-id')) ? headerController.setHomePage() : $.cookie('current-page-id');
        page_id;
        return $.cookie('current-page-id');
      },
      getCurrentPageName: function() {
        return headerController.getCurrentPageName();
      }
    };
    App.reqres.setHandler("get:current:editable:page", function() {
      return API.getCurrentPageId();
    });
    App.reqres.setHandler("get:current:editable:page:name", function() {
      return API.getCurrentPageName();
    });
    return HeaderApp.on('start', function() {
      return API.show();
    });
  });
});
