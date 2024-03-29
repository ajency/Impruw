var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

define(["marionette", "app"], function(Marionette, App) {
  var AppController;
  return AppController = (function(_super) {
    __extends(AppController, _super);

    function AppController(options) {
      if (options == null) {
        options = {};
      }
      this.region = options.region || App.request("default:region");
      this._instance_id = _.uniqueId("controller");
      App.commands.execute("register:instance", this, this._instance_id);
      AppController.__super__.constructor.call(this, options);
    }

    AppController.prototype.close = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      delete this.region;
      delete this.options;
      App.commands.execute("unregister:instance", this, this._instance_id);
      return AppController.__super__.close.call(this, args);
    };

    AppController.prototype.show = function(view, options) {
      if (options == null) {
        options = {};
      }
      _.defaults(options, {
        loading: false,
        region: this.region
      });
      this._setMainView(view);
      return this._manageView(view, options);
    };

    AppController.prototype._setMainView = function(view) {
      if (this._mainView) {
        return;
      }
      this._mainView = view;
      return this.listenTo(view, "close", this.close);
    };

    AppController.prototype._manageView = function(view, options) {
      if (options.loading) {
        return App.commands.execute("show:loading", view, options);
      } else {
        return options.region.show(view);
      }
    };

    return AppController;

  })(Marionette.Controller);
});
