var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/builder/unused-elements/views'], function(App, AppController) {
  return App.module('UnusedElement', function(UnusedElement, App, Backbone, Marionette, $, _) {
    var UnusedElementController;
    UnusedElementController = (function(_super) {
      __extends(UnusedElementController, _super);

      function UnusedElementController() {
        return UnusedElementController.__super__.constructor.apply(this, arguments);
      }

      UnusedElementController.prototype.initialize = function(opts) {
        var pageId, revisionId, unusedElementCollection, view;
        pageId = opts.pageId, revisionId = opts.revisionId;
        unusedElementCollection = App.request("get:unused:elements", pageId, revisionId);
        view = this.getUnsedElementView(unusedElementCollection);
        this.listenTo(view, "show:theme:color:clicked", function() {
          return App.execute("show:theme:color:set", {
            region: App.dialogRegion
          });
        });
        return this.show(view, {
          loading: true
        });
      };

      UnusedElementController.prototype.getUnsedElementView = function(unusedElementCollection) {
        return new UnusedElement.Views.UnsedElementsViews({
          collection: unusedElementCollection
        });
      };

      return UnusedElementController;

    })(AppController);
    return App.commands.setHandler("show:unused:elements", function(opt) {
      return new UnusedElementController(opt);
    });
  });
});
