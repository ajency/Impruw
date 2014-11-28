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

      Controller.prototype.deleteElement = function(model) {
        var isDeletable;
        isDeletable = true;
        this.layout.elementRegion.currentView.$el.children('.panel-group').children('.panel').each((function(_this) {
          return function(index, panel) {
            if (!$(panel).children('.panel-collapse').canBeDeleted()) {
              isDeletable = false;
              return false;
            }
          };
        })(this));
        console.log(isDeletable);
        if (!isDeletable) {
          return bootbox.confirm("<h4 class='delete-message'>" + _.polyglot.t("All elements inside the Accordion will also be deleted. Do you want to continue?") + "</h4>", function(answer) {
            if (answer === true) {
              model.destroy();
              return _.delay(function() {
                return App.commands.execute("auto:save");
              }, 700);
            }
          });
        } else {
          return model.destroy();
        }
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
