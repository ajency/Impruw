var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

define(['app', 'controllers/base-controller', 'bootbox', 'apps/builder/site-builder/show/views'], function(App, AppController, bootbox) {
  return App.module('SiteBuilderApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    var siteBuilderController;
    siteBuilderController = null;
    Show.BuilderController = (function(_super) {
      __extends(BuilderController, _super);

      function BuilderController() {
        this.addNestedElements = __bind(this.addNestedElements, this);
        this.startFillingElements = __bind(this.startFillingElements, this);
        return BuilderController.__super__.constructor.apply(this, arguments);
      }

      BuilderController.prototype.initialize = function(opt) {
        var elementLoaded, elements, pageId, revisionId;
        if (opt == null) {
          opt = {};
        }
        this.region = App.getRegion('builderRegion');
        pageId = opt.pageId, revisionId = opt.revisionId;
        elements = App.request("get:page:json", pageId, revisionId);
        elementLoaded = false;
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
        elements._fetch.done((function(_this) {
          return function() {
            elementLoaded = true;
            return _.delay(function() {
              _this.deferreds = [];
              _this.startFillingElements();
              return $.when.apply($, _this.deferreds).done(function() {
                var elements;
                elements = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                App.autoSaveAPI.local.resume();
                App.autoSaveAPI.local.doAutoSave();
                App.vent.trigger("page:rendered");
                _this.view.triggerMethod("page:rendered");
                return _this.deferreds = [];
              }).fail(function() {
                App.autoSaveAPI.local.suspend();
                App.autoSaveAPI.local.reset();
                return _this.view.triggerMethod("page:render:failed");
              });
            }, 200);
          };
        })(this)).fail((function(_this) {
          return function() {
            return _this.view.triggerMethod("page:rendered:failed");
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
        return _.each(['header', 'page', 'footer'], (function(_this) {
          return function(key, index) {
            var container, section;
            section = _this.view.model.get(key);
            container = _this._getContainer(key);
            return _.each(section, function(element, i) {
              var eleController;
              if (element.element === 'Row') {
                return _this.addNestedElements(container, element);
              } else {
                eleController = App.request("add:new:element", container, element.element, element);
                return _this.deferreds.push(eleController._promise);
              }
            });
          };
        })(this));
      };

      BuilderController.prototype.addNestedElements = function(container, element) {
        var eleController;
        eleController = App.request("add:new:element", container, element.element, element);
        this.deferreds.push(eleController._promise);
        return _.each(element.elements, (function(_this) {
          return function(column, index) {
            if (column.elements.length === 0) {
              return;
            }
            container = eleController.layout.elementRegion.currentView.$el.children().eq(index);
            return _.each(column.elements, function(ele, i) {
              if (element.element === 'Row') {
                return _this.addNestedElements($(container), ele);
              } else {
                eleController = App.request("add:new:element", container, ele.element, ele);
                return _this.deferreds.push(eleController._promise);
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
        this.listenTo(this.layout, "add:new:page:clicked", function() {
          return App.execute("show:add:new:page", {
            region: App.dialogRegion
          });
        });
        App.commands.setHandler("page:published", this.triggerPagePublishOnView);
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
        this.listenTo(App.vent, 'autosave:page:json:enable:buttons', function() {
          return layout.triggerMethod('autosave:page:json:enable:buttons');
        });
        this.listenTo(App.vent, 'autosave:page:json:disable:buttons', function() {
          return layout.triggerMethod('autosave:page:json:disable:buttons');
        });
        return this.show(layout, {
          loading: true
        });
      };

      Controller.prototype.triggerPagePublishOnView = function() {
        return this.layout.triggerMethod("page:published");
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
        if (siteBuilderController !== null) {
          siteBuilderController.close();
        }
        _.each(App.elements, function(element) {
          return element.close();
        });
        App.elements = [];
        siteBuilderController = new Show.BuilderController({
          pageId: pageId
        });
        return App.execute("show:right:block", {
          region: App.rightBlockRegion,
          pageId: pageId
        });
      };
    })(this));
  });
});
