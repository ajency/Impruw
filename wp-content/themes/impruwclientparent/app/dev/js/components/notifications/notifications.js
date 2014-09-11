define(['app', 'jquery', 'mustache', 'underscore'], function(App, $, Mustache, _) {
  var $document, $notificationEle, Helper;
  $document = $(document);
  $notificationEle = $('#notifications-region');
  Helper = {
    template: '<div class="notification-message"> <button type="button" class="close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> <div class="message-text">{{{messageText}}}</div> </div>',
    toHtml: function(dataObj) {
      return Mustache.to_html(Helper.template, dataObj);
    }
  };
  App.vent.on("autosave-failed", function(reason) {
    var notification;
    notification = Helper.toHtml({
      messageText: "Autosave failed: " + reason
    });
    $notificationEle.append(notification);
    return notification.fadeIn();
  });
  App.vent.on("publish-failed", function(reason) {
    var notification;
    notification = Helper.toHtml({
      messageText: "Published failed: " + reason
    });
    $notificationEle.append(notification);
    return notification.fadeIn();
  });
  App.vent.on('connection-lost', function() {
    $('body').css('opacity', 0.5);
    return $notificationEle.append(Helper.toHtml({
      messageText: _.polyglot.t('Connection Lost')
    })).fadeIn();
  });
  return App.vent.on('connection-restored', function() {
    $('body').css('opacity', 1);
    return $notificationEle.append(Helper.toHtml({
      messageText: _.polyglot.t('Connection Restored')
    })).fadeOut();
  });
});
