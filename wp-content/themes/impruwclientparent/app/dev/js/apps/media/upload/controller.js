var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/media/upload/views'], function(App, AppController) {
  return App.module("Media.Upload", function(Upload, App) {
    Upload.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        var view;
        view = this._getView();
        this.listenTo(view, "upload:complete", function() {});
        return this.show(view);
      };

      Controller.prototype._getView = function(mediaCollection) {
        return new Upload.Views.UploadView;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler('start:media:upload:app', (function(_this) {
      return function(options) {
        return new Upload.Controller({
          region: options.region
        });
      };
    })(this));
  });
});
