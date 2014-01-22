// Generated by CoffeeScript 1.6.3
(function() {
  define(['marionette'], function(Marionette) {
    window.app = new Marionette.Application;
    app.addRegions({
      leftRegion: '#aj-imp-left',
      rightRegion: '#aj-imp-right',
      footerRegion: '#footer-section'
    });
    app.rootRoute = "dashboard";
    app.addInitializer(function() {
      return app.module('LeftNav').start();
    });
    app.on('start', function() {
      return _.logAppMsg("Application Started....");
    });
    app.reqres.setHandler("default:region", function() {
      return app.rightSection;
    });
    app.commands.setHandler("register:instance", function(instance, id) {
      return app.register(instance, id);
    });
    app.commands.setHandler("unregister:instance", function(instance, id) {
      return app.unregister(instance, id);
    });
    app.on("initialize:after", function(options) {
      app.startHistory();
      if (!this.getCurrentRoute()) {
        return app.navigate(this.rootRoute, {
          trigger: true
        });
      }
    });
    return app;
  });

}).call(this);
