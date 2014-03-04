define(["backbone", "mustache"], function(Backbone, Mustache) {
  var _sync;
  _.extend(Backbone.Model.prototype, {
    parse: function(resp) {
      if (resp.code === 'OK') {
        return resp.data;
      }
      return resp;
    }
  });
  _.extend(Backbone.Collection.prototype, {
    parse: function(resp) {
      if (resp.code === 'OK') {
        return resp.data;
      }
      return resp;
    }
  });
  _sync = Backbone.sync;
  Backbone.sync = function(method, entity, options) {
    var sync;
    if (options == null) {
      options = {};
    }
    sync = _sync(method, entity, options);
    if (!entity._fetch && method === "read" || !entity._fetch && method === "create") {
      entity._fetch = sync;
    }
    return sync;
  };
  _.extend(Backbone.Collection.prototype, {
    fetched: false
  });
  return Backbone.send = function(action, options) {
    var xhr;
    if (options == null) {
      options = {};
    }
    if (_.isObject(action)) {
      options = action;
    } else {
      options.data = options.data || {};
      options.data = _.extend(options.data, {
        action: action
      });
    }
    options = _.defaults(options, {
      type: 'POST',
      url: AJAXURL
    });
    xhr = null;
    $.Deferred(function(deferred) {
      if (options.success) {
        deferred.done(options.success);
      }
      if (options.error) {
        deferred.fail(options.error);
      }
      delete options.success;
      delete options.error;
      return xhr = $.ajax(options).done(function(response) {
        if (response.code === !'OK') {
          response = {
            code: 'ERROR'
          };
        }
        if (_.isObject(response) && response.code === 'OK') {
          return deferred.resolveWith(this, [response]);
        } else {
          return deferred.rejectWith(this, [response]);
        }
      }).fail(function() {
        return deferred.rejectWith(this, arguments);
      });
    }).promise();
    return xhr;
  };
});
