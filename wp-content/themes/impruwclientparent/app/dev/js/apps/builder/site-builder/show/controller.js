var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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
        var elements, pageId, revisionId;
        if (opt == null) {
          opt = {};
        }
        this.region = App.getRegion('builderRegion');
        pageId = opt.pageId, revisionId = opt.revisionId;
        elements = App.request("get:page:json", pageId, revisionId);
        this.view = new Show.View.Builder({
          model: elements
        });
        this.listenTo(this.view, "add:new:element", function(container, type, metaId) {
          var currentPageId, model, modelData;
          if (metaId == null) {
            metaId = 0;
          }
          modelData = {};
          if (metaId !== 0) {
            model = App.request("get:unused:element:by:metaid", metaId);
            modelData = model.toJSON();
            currentPageId = App.request("get:current:editable:page");
            App.execute("unused:element:added", metaId, currentPageId);
          }
          return App.request("add:new:element", container, type, modelData);
        });
        App.execute("when:fetched", [elements], (function(_this) {
          return function() {
            return _.delay(function() {
              _this.startFillingElements();
              return App.execute("autosave-api");
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
        return _.each(section, (function(_this) {
          return function(element, i) {
            if (element.element === 'Row') {
              return _this.addNestedElements(container, element);
            } else {
              return App.request("add:new:element", container, element.element, element);
            }
          };
        })(this));
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
        this.pageNameUpdated = __bind(this.pageNameUpdated, this);
        this.loadRevision = __bind(this.loadRevision, this);
        this.triggerPagePublishOnView = __bind(this.triggerPagePublishOnView, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opt) {
        var layout;
        if (opt == null) {
          opt = {};
        }
        this.region = App.getRegion('builderWrapper');
        this.pages = App.request("get:editable:pages");
        this.layout = layout = new Show.View.MainView({
          collection: this.pages
        });
        this.listenTo(layout, 'editable:page:changed', function(pageId) {
          $.cookie('current-page-id', pageId);
          return App.execute("editable:page:changed", pageId);
        });
        this.listenTo(layout, "add:page:revisions", this.addPageRevisions);
        this.listenTo(this.layout, "add:new:page:clicked", function() {
          return App.execute("show:add:new:page", {
            region: App.dialogRegion
          });
        });
        App.commands.setHandler("page:published", this.triggerPagePublishOnView);
        this.listenTo(App.vent, "revision:link:clicked", function(revisionId) {
          var currentPageId;
          currentPageId = App.request("get:current:editable:page");
          return App.execute("editable:page:changed", currentPageId, revisionId);
        });
        this.listenTo(layout, 'show', (function(_this) {
          return function(layout) {
            return _.delay(function() {
              return App.addRegions({
                builderRegion: '#aj-imp-builder-drag-drop'
              });
            }, 200);
          };
        })(this));
        this.listenTo(layout, "update:page:name", this.updatePageName);
        this.listenTo(App.vent, 'page:took:over', function(errorMessage) {
          return layout.triggerMethod('page:took:over', errorMessage);
        });
        this.listenTo(App.vent, 'page:released', function() {
          return layout.triggerMethod('page:released');
        });
        return this.show(layout, {
          loading: true
        });
      };

      Controller.prototype.triggerPagePublishOnView = function() {
        return this.layout.triggerMethod("page:published");
      };

      Controller.prototype.loadRevision = function(revisionId) {
        var currentPageId;
        currentPageId = App.request("get:current:editable:page");
        return App.execute("editable:page:changed", currentPageId, revisionId);
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

      Controller.prototype.updatePageName = function(pageData) {
        var updatedPageModel;
        updatedPageModel = App.request("get:page:model:by:id", pageData.ID);
        updatedPageModel.set(pageData);
        return updatedPageModel.save(null, {
          wait: true,
          success: this.pageNameUpdated
        });
      };

      Controller.prototype.pageNameUpdated = function(updatedPageModel) {
        return this.layout.triggerMethod("page:name:updated", updatedPageModel);
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("editable:page:changed", (function(_this) {
      return function(pageId, revisionId) {
        if (revisionId == null) {
          revisionId = 0;
        }
        App.resetElementRegistry();
        if (siteBuilderController !== null) {
          siteBuilderController.close();
        }
        siteBuilderController = new Show.BuilderController({
          pageId: pageId,
          revisionId: revisionId
        });
        return App.execute("show:unused:elements", {
          region: App.unusedElementsRegion,
          revisionId: revisionId,
          pageId: pageId
        });
      };
    })(this));
  });
});
