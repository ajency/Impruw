define(['marionette', 'underscore'], function(Marionette, _) {
  window.App = new Marionette.Application;
  App.addRegions({
    headerRegion: '#header-region',
    elementsBoxRegion: '#elements-box-region',
    builderWrapper: '#builder-region',
    settingsRegion: Marionette.Region.Settings.extend({
      el: '#settings-region'
    }),
    loginRegion: Marionette.Region.Dialog.extend({
      el: '#login-region'
    }),
    dialogRegion: Marionette.Region.Dialog.extend({
      el: '#dialog-region'
    }),
    chooseThemeRegion: '#choose-theme-region',
    unusedElementsRegion: '#fl_menu'
  });
  App.startNewInstance = function() {
    var instanceId;
    instanceId = _.makeid();
    return $.ajax({
      type: 'GET',
      url: "" + AJAXURL + "?action=set-app-instance",
      async: false,
      data: {
        instance_id: instanceId
      },
      success: function(resp) {
        if (resp.success === true) {
          return App.instanceId = resp.instance;
        }
      }
    });
  };
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
  App.commands.setHandler("register:builder:instance", function(instance, id) {
    return App.registerElement(instance, id);
  });
  App.commands.setHandler("unregister:builder:instance", function(instance, id) {
    return App.unregisterElement(instance, id);
  });
  App.on("initialize:after", function(options) {
    var user;
    Pace.on('done', function() {
      Pace.options = {
        ajax: false
      };
      $('body').addClass('pace-min-theme');
      return $('#initial-loader').fadeOut('fast', function() {
        return $('#initial-loader').remove();
      });
    });
    user = App.request("get:user:model");
    return App.execute("when:fetched", user, (function(_this) {
      return function() {
        App.startHistory();
        _this.rootRoute = ISTHEMESELECTED === 1 ? '' : 'choose-theme';
        return App.navigate(_this.rootRoute, {
          trigger: true
        });
      };
    })(this));
  });
  App.execute("heartbeat-api");
  App.startNewInstance();
  return App;
});
