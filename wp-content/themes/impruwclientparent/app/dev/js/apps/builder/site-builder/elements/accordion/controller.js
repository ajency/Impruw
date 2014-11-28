var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'bootbox', 'apps/builder/site-builder/elements/accordion/views'], function(App, bootbox) {
  return App.module('SiteBuilderApp.Element.Accordion', function(Accordion, App) {
    return Accordion.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Accordion',
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
        return new Accordion.Views.AccordionView({
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
