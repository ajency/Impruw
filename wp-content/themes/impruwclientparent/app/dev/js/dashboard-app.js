define(['marionette'], function(Marionette) {
  window.App = new Marionette.Application;
  App.addRegions({
    leftRegion: '#aj-imp-left',
    rightRegion: '#aj-imp-right',
    footerRegion: '#footer-section',
    dialogRegion: Marionette.Region.Dialog.extend({
      el: '#dialog-region'
    }),
    loginRegion: Marionette.Region.Dialog.extend({
      el: '#login-region'
    })
  });
  App.rootRoute = "#/dashboard";
  App.loginRoute = "login";
  App.on('start', function() {
    return _.logAppMsg("Application Started....");
  });
  App.reqres.setHandler("default:region", function() {
    return App.rightRegion;
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
    Pace.on('done', function() {
      Pace.options = {
        ajax: false
      };
      $('body').addClass('pace-min-theme');
      return $('#initial-loader').fadeOut('fast', function() {
        $('#initial-loader').remove();
        return $('#footer-section').removeClass('hidden');
      });
    });
    App.startHistory();
    if (!this.getCurrentRoute()) {
      return App.navigate(this.rootRoute, {
        trigger: true
      });
    }
  });
  return App;
});
