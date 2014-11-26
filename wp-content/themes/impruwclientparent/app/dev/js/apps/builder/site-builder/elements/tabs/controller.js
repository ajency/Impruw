var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/tabs/views', 'apps/builder/site-builder/elements/tabs/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.Tabs', function(Tabs, App) {
    return Tabs.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Tabs',
          columncount: 2,
          elements: [],
          meta_id: 0,
          style: 'default'
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:style", this.changeStyle);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype.changeStyle = function(model) {
        var newStyle, prevStyle, _ref;
        prevStyle = (_ref = model.previous('style')) != null ? _ref : '';
        newStyle = model.get('style');
        this.layout.elementRegion.currentView.triggerMethod("style:changed", _.slugify(newStyle), _.slugify(prevStyle));
        return this.layout.setHiddenField('style', newStyle);
      };

      Controller.prototype.getTabView = function() {
        return new Tabs.Views.TabsView({
          model: this.layout.model
        });
      };

      Controller.prototype.renderElement = function() {
        this.removeSpinner();
        this.view = this.getTabView();
        return this.layout.elementRegion.show(this.view);
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
