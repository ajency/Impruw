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
        this.revisionCollection = App.request("get:page:revisions", pageId);
        App.commands.setHandler('update:revision:on:published', (function(_this) {
          return function(revision) {
            return _this.revisionCollection.add(revision);
          };
        })(this));
        return App.execute("when:fetched", [this.revisionCollection], (function(_this) {
          return function() {
            _this.view = _this._showHistoryView();
            _this.listenTo(_this.view, "show:revision:restore itemview:show:revision:restore", function(view, id) {
              if (id == null) {
                id = 0;
              }
              return App.execute("show:revision:restore", {
                region: App.revisionRestoreRegion,
                revisionCollection: _this.revisionCollection,
                revisionId: id
              });
            });
            return _this.show(_this.view);
          };
        })(this));
      };

      Controller.prototype._showHistoryView = function() {
        return new RevisionHistory.Views.RevisionHitoryList({
          fullCollection: this.revisionCollection
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
