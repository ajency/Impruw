var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/builder/header/change-theme-color/views'], function(App, AppController) {
  return App.module('ChangeThemeColorApp', function(ChangeThemeColorApp, App, Backbone, Marionette, $, _) {
    var ChangeThemeColorController, ChangeThemeColorLayout;
    ChangeThemeColorController = (function(_super) {
      __extends(ChangeThemeColorController, _super);

      function ChangeThemeColorController() {
        return ChangeThemeColorController.__super__.constructor.apply(this, arguments);
      }

      ChangeThemeColorController.prototype.initialize = function(opt) {
        if (opt == null) {
          opt = {};
        }
        this.layout = this.getLayout();
        this.listenTo(this.layout, "show", this.showColorSet);
        this.listenTo(this.layout, "edit:theme:color", this.editThemeColor);
        return this.show(this.layout, {
          loading: true
        });
      };

      ChangeThemeColorController.prototype.getLayout = function() {
        return new ChangeThemeColorLayout;
      };

      ChangeThemeColorController.prototype.showColorSet = function() {
        var themeColorCollection;
        themeColorCollection = App.request("get:themes:color:collection");
        this.themeColorSetView = this.getView(themeColorCollection);
        this.listenTo(this.themeColorSetView, "itemview:change:theme:color", this.changeThemeColorClick);
        this.listenTo(this.themeColorSetView, "itemview:edit:theme:color:clicked", this.editThemeColorClick);
        return this.layout.themecolorsetRegion.show(this.themeColorSetView);
      };

      ChangeThemeColorController.prototype.editThemeColor = function(model) {
        return App.execute("edit:theme:color:set", {
          region: this.layout.themecolorEditRegion,
          model: model
        });
      };

      ChangeThemeColorController.prototype.getView = function(themeColorCollection) {
        return new ChangeThemeColorApp.Views.ThemeColorSetView({
          collection: themeColorCollection
        });
      };

      ChangeThemeColorController.prototype.changeThemeColorClick = function(iv, model) {
        var formdata, options;
        formdata = model.toJSON();
        options = {
          url: AJAXURL,
          method: 'POST',
          data: {
            action: 'change-theme-color',
            formdata: formdata
          }
        };
        return $.ajax(options).done(function(response) {
          return window.location.reload(true);
        }).fail(function(resp) {
          return console.log('error');
        });
      };

      ChangeThemeColorController.prototype.editThemeColorClick = function(iv, model) {
        return this.layout.trigger("edit:theme:color", model);
      };

      return ChangeThemeColorController;

    })(AppController);
    ChangeThemeColorLayout = (function(_super) {
      __extends(ChangeThemeColorLayout, _super);

      function ChangeThemeColorLayout() {
        return ChangeThemeColorLayout.__super__.constructor.apply(this, arguments);
      }

      ChangeThemeColorLayout.prototype.template = '<div id="theme-color-set"></div> <div id ="theme-color-edit"></div>';

      ChangeThemeColorLayout.prototype.className = 'color-picker-container';

      ChangeThemeColorLayout.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Choose Theme Colors'),
        modal_size: 'medium-modal'
      };

      ChangeThemeColorLayout.prototype.regions = {
        themecolorsetRegion: '#theme-color-set',
        themecolorEditRegion: '#theme-color-edit'
      };

      return ChangeThemeColorLayout;

    })(Marionette.Layout);
    return App.commands.setHandler("show:theme:color:set", function(opts) {
      return new ChangeThemeColorController(opts);
    });
  });
});
