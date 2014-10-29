var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/builder/site-builder/revision/revision-views'], function(App, AppController) {
  return App.module("SiteBuilderApp.Revision", function(Revision, App) {
    Revision.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        this.revisionCollection = options.revisionCollection;
        this.view = this._getRevisionView();
        this.listenTo(this.view, 'after:show', (function(_this) {
          return function() {
            if (options.revisionId) {
              return _this.view.triggerMethod('show:revision:with:id', options.revisionId);
            }
          };
        })(this));
        this.listenTo(this.view, "close:revision", (function(_this) {
          return function() {
            return _this.region.close();
          };
        })(this));
        this.listenTo(this.view, 'restore:revision', function(data) {
          return App.request('restore:revision', data);
        });
        return this.show(this.view);
      };

      Controller.prototype._getRevisionView = function() {
        return new Revision.Views.RevisionView({
          collection: this.revisionCollection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:revision:restore", function(opts) {
      return new Revision.Controller(opts);
    });
  });
});
