var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/builder/right-block/revision-history/views'], function(App, AppController) {
  return App.module('RevisionHistory', function(RevisionHistory, App) {
    RevisionHistory.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        var pageId;
        pageId = options.pageId;
        this.revisions = App.request("get:page:revisions", pageId);
        return App.execute("when:fetched", [this.revisions], (function(_this) {
          return function() {
            var lastThreeRevisions;
            lastThreeRevisions = _.first(_this.revisions.toArray(), 3);
            _this.latestRevision = new Backbone.Collection(lastThreeRevisions);
            _this.view = _this._showHistoryView();
            return _this.show(_this.view);
          };
        })(this));
      };

      Controller.prototype._showHistoryView = function() {
        console.log('x');
        return new RevisionHistory.Views.RevisionHitoryList({
          collection: this.latestRevision
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler('show:revision:history', function(opts) {
      console.log('history');
      return new RevisionHistory.Controller(opts);
    });
  });
});
