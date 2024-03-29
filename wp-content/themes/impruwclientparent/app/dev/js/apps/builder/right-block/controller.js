var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/builder/right-block/views', 'apps/builder/right-block/revision-history/controller'], function(App, AppController) {
  return App.module("RightBlock", function(RightBlock, App) {
    RightBlock.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        var pageId, revisionId;
        console.log('right-block');
        revisionId = options.revisionId;
        pageId = options.pageId;
        this.layout = this._getLayoutView();
        this.listenTo(this.layout, 'show', (function(_this) {
          return function() {
            App.execute("show:unused:elements", {
              region: _this.layout.unusedElementsRegion,
              revisionId: revisionId,
              pageId: pageId
            });
            return App.execute("show:revision:history", {
              region: _this.layout.revisionHistoryRegion,
              pageId: pageId
            });
          };
        })(this));
        this.listenTo(this.layout, "show:theme:font:clicked", function() {
          return App.execute("show:theme:font:set", {
            region: App.dialogRegion
          });
        });
        return this.show(this.layout);
      };

      Controller.prototype._getLayoutView = function() {
        return new RightBlock.Views.RightBlockLayout;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler('show:right:block', function(opts) {
      return new RightBlock.Controller(opts);
    });
  });
});
