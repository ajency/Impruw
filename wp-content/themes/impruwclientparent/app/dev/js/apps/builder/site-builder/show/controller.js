var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/builder/site-builder/show/views'], function(App, AppController) {
  return App.module('SiteBuilderApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    var siteBuilderController;
    siteBuilderController = null;
    Show.BuilderController = (function(_super) {
      __extends(BuilderController, _super);

      function BuilderController() {
        return BuilderController.__super__.constructor.apply(this, arguments);
      }

      BuilderController.prototype.initialize = function(opt) {
        var elements, pageId;
        if (opt == null) {
          opt = {};
        }
        this.region = App.getRegion('builderRegion');
        pageId = App.request("get:current:editable:page");
        elements = App.request("get:page:json", pageId);
        this.view = new Show.View.Builder({
          model: elements
        });
        this.listenTo(this.view, "add:new:element", function(container, type, metaId) {
          var model, modelData;
          if (metaId == null) {
            metaId = 0;
          }
          modelData = {};
          if (metaId !== 0) {
            model = App.request("get:recovered:element", metaId);
            modelData = model.toJSON();
          }
          return App.request("add:new:element", container, type, modelData);
        });
        this.listenTo(this.view, "dependencies:fetched", (function(_this) {
          return function() {
            return _.delay(function() {
              return _this.startFillingElements();
            }, 400);
          };
        })(this));
        return this.show(this.view, {
          loading: true
        });
      };

      BuilderController.prototype._getContainer = function(section) {
        switch (section) {
          case 'header':
            return $('#site-header-region');
          case 'page':
            return $('#site-page-content-region');
          case 'footer':
            return $('#site-footer-region');
        }
      };

      BuilderController.prototype.startFillingElements = function() {
        var container, section;
        section = this.view.model.get('header');
        container = this._getContainer('header');
        _.each(section, (function(_this) {
          return function(element, i) {
            if (element.element === 'Row') {
              return _this.addNestedElements(container, element);
            } else {
              return App.request("add:new:element", container, element.element, element);
            }
          };
        })(this));
        section = this.view.model.get('page');
        container = this._getContainer('page');
        _.each(section, (function(_this) {
          return function(element, i) {
            if (!_.isObject(element)) {
              return;
            }
            if (element.element === 'Row') {
              return _this.addNestedElements(container, element);
            } else {
              return App.request("add:new:element", container, element.element, element);
            }
          };
        })(this));
        section = this.view.model.get('footer');
        container = this._getContainer('footer');
        _.each(section, (function(_this) {
          return function(element, i) {
            if (element.element === 'Row') {
              return _this.addNestedElements(container, element);
            } else {
              return App.request("add:new:element", container, element.element, element);
            }
          };
        })(this));
        return App.execute("reset:changed:sections");
      };

      BuilderController.prototype.addNestedElements = function(container, element) {
        var controller;
        controller = App.request("add:new:element", container, element.element, element);
        return _.each(element.elements, (function(_this) {
          return function(column, index) {
            if (column.elements.length === 0) {
              return;
            }
            container = controller.layout.elementRegion.currentView.$el.children().eq(index);
            return _.each(column.elements, function(ele, i) {
              if (element.element === 'Row') {
                return _this.addNestedElements($(container), ele);
              } else {
                return App.request("add:new:element", container, ele.element, ele);
              }
            });
          };
        })(this));
      };

      return BuilderController;

    })(AppController);
    Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opt) {
        var layout, pages;
        if (opt == null) {
          opt = {};
        }
        this.region = App.getRegion('builderWrapper');
        pages = App.request("get:editable:pages");
        this.layout = layout = new Show.View.MainView({
          collection: pages
        });
        this.listenTo(layout, 'editable:page:changed', function(pageId) {
          $.cookie('current-page-id', pageId);
          App.execute("editable:page:changed", pageId);
          return App.execute("reset:changed:sections");
        });
        this.listenTo(layout, "add:page:revisions", this.addPageRevisions);
        this.listenTo(layout, 'show', (function(_this) {
          return function(layout) {
            return _.delay(function() {
              return App.addRegions({
                builderRegion: '#aj-imp-builder-drag-drop'
              });
            }, 200);
          };
        })(this));
        return this.show(layout, {
          loading: true
        });
      };

      Controller.prototype.addPageRevisions = function() {
        var currentPageId, pageRevisions;
        currentPageId = App.request("get:current:editable:page");
        pageRevisions = App.request("get:page:revisions", currentPageId);
        return App.execute("when:fetched", [pageRevisions], (function(_this) {
          return function() {
            return _this.layout.triggerMethod("add:page:revision:items", pageRevisions);
          };
        })(this));
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("editable:page:changed", (function(_this) {
      return function(pageId) {
        App.resetElementRegistry();
        if (siteBuilderController !== null) {
          siteBuilderController.close();
        }
        return siteBuilderController = new Show.BuilderController();
      };
    })(this));
  });
});
