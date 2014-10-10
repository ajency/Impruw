define(['app', 'jquery', 'mustache', 'underscore', 'heartbeat'], function(App, $, Mustache, _) {
  var $document, $notificationEle, Helper, closeNotification, connectionNotification;
  $document = $(document);
  $notificationEle = $('#notifications-region');
  connectionNotification = null;
  closeNotification = function(e) {
    return $(this).parent().fadeOut('fast', (function(_this) {
      return function() {
        return $(_this).parent().remove();
      };
    })(this));
  };
  Helper = {
    template: '<div class="notification-message"> {{#close}} <button type="button" class="close close-notification"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> {{/close}} <div class="message-text">{{{messageText}}}</div> </div>',
    toHtml: function(dataObj) {
      return Mustache.to_html(Helper.template, dataObj);
    }
  };
  App.vent.on("autosave-failed", function(reason) {
    var notification;
    notification = $(Helper.toHtml({
      messageText: "Autosave failed: " + reason,
      close: true
    }));
    $notificationEle.append(notification);
    notification.fadeIn().find('button').on('click', closeNotification);
    _.delay((function() {
      return notification.remove();
    }), 3000);
    return wp.heartbeat.connectNow();
  });
  App.vent.on("publish:failed", function(reason) {
    var notification;
    notification = $(Helper.toHtml({
      messageText: "Published failed: " + reason,
      close: true
    }));
    $notificationEle.append(notification);
    notification.fadeIn().find('button').on('click', closeNotification);
    return _.delay((function() {
      return notification.remove();
    }), 3000);
  });
  App.vent.on("page:published", function() {
    var notification;
    notification = $(Helper.toHtml({
      messageText: "Page published successfully",
      close: true
    }));
    $notificationEle.append(notification);
    notification.fadeIn().find('button').on('click', closeNotification);
    return _.delay((function() {
      return notification.remove();
    }), 3000);
  });
  App.vent.on('connection-lost', function() {
    connectionNotification = $(Helper.toHtml({
      messageText: _.polyglot.t("Connection Lost")
    }));
    $notificationEle.append(connectionNotification);
    connectionNotification.fadeIn();
    return $('.conn-lost-overlay').removeClass('hidden');
  });
  App.vent.on('connection-restored', function() {
    if (connectionNotification !== null) {
      connectionNotification.fadeOut('fast', function() {
        return connectionNotification.remove();
      });
    }
    return $('.conn-lost-overlay').addClass('hidden');
  });
  return App.reqres.setHandler('error:encountered', function(error) {
    return $.post(AJAXURL, {
      action: 'impruw_error_encountered',
      error: error
    });
  });
});
