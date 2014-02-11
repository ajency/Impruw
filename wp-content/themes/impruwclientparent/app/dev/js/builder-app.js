// Generated by CoffeeScript 1.6.3
(function() {
  define(['marionette'], function(Marionette) {
    window.App = new Marionette.Application;
    App.addRegions({
      headerRegion: '#header-region',
      elementsBoxRegion: '#elements-box-region',
      builderRegion: '#builder-region',
      settingsRegion: Marionette.Region.Settings.extend({
        el: '#settings-region'
      }),
      loginRegion: Marionette.Region.Dialog.extend({
        el: '#login-region'
      })
    });
    App.rootRoute = "";
    App.loginRoute = "login";
    App.on('start', function() {
      return _.logAppMsg("Application Started....");
    });
    App.reqres.setHandler("default:region", function() {
      return App.builderRegion;
    });
    App.commands.setHandler("when:fetched", function(entities, callback) {
      var xhrs;
      xhrs = _.chain([entities]).flatten().pluck("_fetch").value();
      return $.when.apply($, xhrs).done(function() {
        return callback();
      });
    });
    App.commands.setHandler("register:instance", function(instance, id) {
      return App.register(instance, id);
    });
    App.commands.setHandler("unregister:instance", function(instance, id) {
      return App.unregister(instance, id);
    });
    App.on("initialize:after", function(options) {
      var appState;
      appState = App.request("get:current:appstate");
      App.startHistory();
      if (appState.isLoggedIn()) {
        if (!this.getCurrentRoute()) {
          return App.navigate(this.rootRoute, {
            trigger: true
          });
        }
      } else {
        return App.navigate(this.loginRoute, {
          trigger: true
        });
      }
    });
    return App;
  });

}).call(this);
