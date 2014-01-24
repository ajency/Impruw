// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['dashboard-app', 'controllers/base-controller', 'components/loading/view'], function(App, AppController, LoadingView) {
    var LoadingController, _ref;
    LoadingController = (function(_super) {
      __extends(LoadingController, _super);

      function LoadingController() {
        _ref = LoadingController.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      LoadingController.prototype.initialize = function(options) {
        var config, loadingView, view;
        view = options.view, config = options.config;
        config = _.isBoolean(config) ? {} : config;
        _.defaults(config, {
          loadingType: "spinner",
          entities: this.getEntities(view),
          debug: false
        });
        switch (config.loadingType) {
          case "opacity":
            this.region.currentView.$el.css("opacity", 0.5);
            break;
          case "spinner":
            loadingView = this.getLoadingView();
            this.show(loadingView);
            break;
          default:
            throw new Error("Invalid loadingType");
        }
        return this.showRealView(view, loadingView, config);
      };

      LoadingController.prototype.showRealView = function(realView, loadingView, config) {
        var callbackFn,
          _this = this;
        callbackFn = _.debounce(function() {
          switch (config.loadingType) {
            case "opacity":
              _this.region.currentView.$el.removeAttr("style");
              break;
            case "spinner":
              if (_this.region.currentView !== loadingView) {
                return realView.close();
              }
          }
          if (!config.debug) {
            return _this.show(realView);
          }
        }, 100);
        return App.commands.execute("when:fetched", config.entities, callbackFn);
      };

      LoadingController.prototype.getEntities = function(view) {
        return _.chain(view).pick("model", "collection").toArray().compact().value();
      };

      LoadingController.prototype.getLoadingView = function() {
        return new LoadingView;
      };

      return LoadingController;

    })(AppController);
    return App.commands.setHandler("show:loading", function(view, options) {
      return new LoadingController({
        view: view,
        region: options.region,
        config: options.loading
      });
    });
  });

}).call(this);
