define(['app', 'jquery'], function(App, $) {
  var $document, $notificationEle;
  $document = $(document);
  $notificationEle = $('#notification-element');
  App.vent.on("autosave-failed", function(reason) {
    return $notificationEle.text("Autosave failed: " + reason).fadeIn();
  });
  App.vent.on("publish-failed", function(reason) {
    return $notificationEle.text("Publish failed: " + reason).fadeIn();
  });
  App.vent.on('connection-lost', function() {
    $('body').css('opacity', 0.5);
    return $notificationEle.text(_.polyglot('Connection Lost')).fadeIn();
  });
  return App.vent.on('connection-restored', function() {
    $('body').css('opacity', 1);
    return $notificationEle.text(_.polyglot('Connection Restored')).fadeOut();
  });
});
