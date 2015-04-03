var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'bootbox', 'apps/builder/site-builder/elements/tabs/views', 'apps/builder/site-builder/elements/tabs/settings/controller'], function(App, bootbox) {
  return App.module('SiteBuilderApp.Element.Tabs', function(Tabs, App) {
    return Tabs.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Tabs',
          justified: true,
          columncount: 2,
          elements: [],
          meta_id: _.uniqueId('tab-'),
          style: 'default'
        });
        options.modelData.justified = _.toBoolean(options.modelData.justified);
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:style", this.changeStyle);
        this.listenTo(this.layout.model, 'change:justified', this.changeJustified);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype.changeStyle = function(model) {
        var newStyle, prevStyle, _ref;
        prevStyle = (_ref = model.previous('style')) != null ? _ref : '';
        newStyle = model.get('style');
        this.layout.elementRegion.currentView.triggerMethod("style:changed", _.slugify(newStyle), _.slugify(prevStyle));
        return this.layout.setHiddenField('style', newStyle);
      };

      Controller.prototype.changeJustified = function(model, justified) {
        this.layout.elementRegion.currentView.triggerMethod('set:justified', justified);
        return this.layout.setHiddenField('justified', justified);
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

      Controller.prototype.deleteElement = function(model) {
        if (!this.layout.elementRegion.currentView.$el.find('.tab-content').canBeDeleted()) {
          return bootbox.confirm("<h4 class='delete-message'>" + _.polyglot.t("All elements inside the Tab will also be deleted. Do you want to continue?") + "</h4>", function(answer) {
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
