define(['app', 'marionette', 'jquery', 'heartbeat'], function(App, Marionette, $) {
  var $document, HeartbeatAPI, hb;
  if (!wp.heartbeat) {
    throw new Error('heartbeat api not loaded');
  }
  hb = wp.heartbeat;
  $document = $(document);
  HeartbeatAPI = {
    AppInstanceCheckHb: function() {
      return $(document).on("heartbeat-send.check-instance", function(e, data) {
        return data["check-instance"] = {
          instance_id: App.instanceId
        };
      }).on("heartbeat-tick.check-instance", function(e, data) {
        var check;
        check = data["check-instance"];
        if (check.success === false && check.new_instance) {
          return App.vent.trigger("new:instance:opened", check);
        }
      }).ready(function() {
        return schedule();
      });
    },
    AppNonceRefreshHb: function() {
      var check, schedule, timeout;
      schedule = function() {
        var check, timeout;
        check = false;
        window.clearTimeout(timeout);
        return timeout = window.setTimeout(function() {
          return check = true;
        }, 300000);
      };
      check = void 0;
      timeout = void 0;
      return $(document).on("heartbeat-send.wp-refresh-nonces", function(e, data) {
        var nonce, post_id;
        nonce = void 0;
        post_id = void 0;
        if (check) {
          if ((post_id = $.cookie('current-page-id')) && (nonce = window.lockValue)) {
            return data["wp-refresh-post-nonces"] = {
              post_id: post_id,
              post_nonce: nonce
            };
          }
        }
      }).on("heartbeat-tick.wp-refresh-nonces", function(e, data) {
        var nonces;
        nonces = data["wp-refresh-post-nonces"];
        if (nonces) {
          schedule();
          if (nonces.replace) {
            $.each(nonces.replace, function(selector, value) {
              return window[selector] = value;
            });
          }
          if (nonces.heartbeatNonce) {
            return window.heartbeatSettings.nonce = nonces.heartbeatNonce;
          }
        }
      }).ready(function() {
        return schedule();
      });
    },
    AppAuthenticationHb: function() {
      $document.on('heartbeat-tick.wp-auth-check', function(evt, data) {
        if (data['wp-auth-check'] === false) {
          alert('you are logged out');
          return window.location.reload();
        }
      }).on('heartbeat-connection-lost', function() {
        return App.vent.trigger('connection-lost');
      }).on('heartbeat-connection-restored', function() {
        return App.vent.trigger('connection-restored');
      });
      return App.vent.on("new:instance:opened", function(data) {
        alert(data.reason);
        return window.location.href = window.location.href + '?expire=true';
      });
    },
    AppPageEditHb: function() {
      var locked;
      locked = false;
      return $document.on('heartbeat-send.refresh-lock', function(evt, data) {
        var lock, pageId, send;
        pageId = $.cookie('current-page-id');
        lock = window.lockValue || false;
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
          window.lockValue = received.new_lock;
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
    HeartbeatAPI.AppNonceRefreshHb();
    HeartbeatAPI.AppInstanceCheckHb();
    return hb.interval(15);
  });
});
