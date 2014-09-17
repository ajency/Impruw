var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/builder/unused-elements/views'], function(App, AppController, bootbox) {
  return App.module('UnusedElement', function(UnusedElement, App, Backbone, Marionette, $, _) {
    var UnusedElementController;
    UnusedElementController = (function(_super) {
      __extends(UnusedElementController, _super);

      function UnusedElementController() {
        this.clearElement = __bind(this.clearElement, this);
        this.clearAllElements = __bind(this.clearAllElements, this);
        this.showView = __bind(this.showView, this);
        return UnusedElementController.__super__.constructor.apply(this, arguments);
      }

      UnusedElementController.prototype.initialize = function(opts) {
        var revisionId;
        this.pageId = opts.pageId, revisionId = opts.revisionId;
        this.region.close();
        this.unusedElementCollection = App.request("get:unused:elements", this.pageId, revisionId);
        return this.unusedElementCollection.xhr.done(this.showView);
      };

      UnusedElementController.prototype.showView = function() {
        var view;
        console.log(this.unusedElementCollection);
        if (this.unusedElementCollection.length === 0) {
          return;
        }
        this.view = view = this.getUnsedElementView(this.unusedElementCollection);
        this.listenTo(view, 'clear:all:elements', this.clearAllElements);
        this.listenTo(view, 'clear:element', this.clearElement);
        this.listenTo(App.vent, 'page:took:over', function() {
          return view.triggerMethod('page:took:over');
        });
        this.listenTo(App.vent, 'page:released', function() {
          return view.triggerMethod('page:released');
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

      UnusedElementController.prototype.clearAllElements = function() {
        return $.post("" + AJAXURL + "?action=clear-all-elements", {
          page_id: this.pageId
        }, ((function(_this) {
          return function(resp) {
            if (resp.success === true) {
              return _this.view.triggerMethod('elements:cleared');
            }
          };
        })(this)), 'json');
      };

      UnusedElementController.prototype.clearElement = function(id) {
        return $.post("" + AJAXURL + "?action=remove-unused-element", {
          page_id: this.pageId,
          element_meta_id: id
        }, ((function(_this) {
          return function(resp) {
            return _this.view.triggerMethod('element:cleared', id);
          };
        })(this)), 'json');
      };

      return UnusedElementController;

    })(AppController);
    return App.commands.setHandler("show:unused:elements", function(opt) {
      return new UnusedElementController(opt);
    });
  });
});
