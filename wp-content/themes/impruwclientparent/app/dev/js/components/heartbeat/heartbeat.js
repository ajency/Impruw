define(['app', 'marionette', 'jquery', 'heartbeat'], function(App, Marionette, $) {
  var $document, HeartbeatAPI, hb;
  if (!wp.heartbeat) {
    throw new Error('heartbeat api not loaded');
  }
  hb = wp.heartbeat;
  $document = $(document);
  HeartbeatAPI = {
    AppAuthenticationHb: function() {
      return $document.on('heartbeat-tick.wp-auth-check', function(evt, data) {
        if (data['wp-auth-check'] === false) {
          alert('you are logged out');
          return window.location.reload();
        }
      }).on('heartbeat-connection-lost', function() {
        console.log("lost");
        return App.execute('connection-lost');
      }).on('heartbeat-connection-restored', function() {
        console.log("restored");
        return App.execute('connection-restored');
      });
    },
    AppPageEditHb: function() {
      var lock, locked, pageId;
      pageId = 0;
      lock = '';
      locked = false;
      return $document.on('heartbeat-send.refresh-lock', function(evt, data) {
        var send;
        pageId = $.cookie('current-page-id');
        lock = lock;
        send = {};
        send.post_id = pageId;
        if (lock) {
          send.lock = lock;
        }
        data['wp-refresh-post-lock'] = send;
        return data;
      }).on('heartbeat-tick.refresh-lock', function(evt, data) {
        var received;
        if (!data['wp-refresh-post-lock']) {
          return;
        }
        received = data['wp-refresh-post-lock'];
        if (received.lock_error) {
          locked = true;
          return App.vent.trigger('page:took:over', received.lock_error.text);
        } else if (received.new_lock) {
          lock = received.new_lock;
          if (locked === true) {
            locked = false;
            return App.vent.trigger('page:released', received);
          }
        }
      });
    }
  };
  App.commands.setHandler("edit-page-heartbeat", function() {
    return HeartbeatAPI.AppPageEditHb();
  });
  return App.commands.setHandler("heartbeat-api", function() {
    HeartbeatAPI.AppAuthenticationHb();
    HeartbeatAPI.AppPageEditHb();
    return hb.interval(15);
  });
});
