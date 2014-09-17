var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module("PageTemplates", function(PageTemplates, App) {
    var EmptyView, PageTemplatesController, PageTemplatesGrid, TemplateView, TemplatesLayout, ThemeTemplatesGrid;
    PageTemplatesController = (function(_super) {
      __extends(PageTemplatesController, _super);

      function PageTemplatesController() {
        return PageTemplatesController.__super__.constructor.apply(this, arguments);
      }

      PageTemplatesController.prototype.initialize = function(opt) {
        if (opt == null) {
          opt = {};
        }
        this.collection = App.request("get:pages:collection");
        this.collection.fetch();
        this.templates = App.request("get:pages:collection");
        this.templates.fetch({
          data: {
            'meta_key': 'page_templates'
          }
        });
        this.layout = this._getTemplateLayout();
        this.listenTo(this.layout, 'show', this._showTemplateViews);
        return this.show(this.layout, {
          loading: true
        });
      };

      PageTemplatesController.prototype._getTemplateLayout = function() {
        return new TemplatesLayout({
          collection: this.collection,
          templateCollection: this.templates
        });
      };

      PageTemplatesController.prototype._showTemplateViews = function() {
        this.PageTemplateView = this._getPageTemplatesGrid(this.collection);
        this.listenTo(this.PageTemplateView, "itemview:template:clicked", (function(_this) {
          return function(iv, model) {
            return Marionette.triggerMethod.call(_this.region, "template:selected", model);
          };
        })(this));
        this.layout.pageTemplatesRegion.show(this.PageTemplateView);
        this.ThemeTemplateView = this._getThemeTemplatesGrid(this.templates);
        this.listenTo(this.ThemeTemplateView, "itemview:template:clicked", (function(_this) {
          return function(iv, model) {
            return Marionette.triggerMethod.call(_this.region, "template:selected", model);
          };
        })(this));
        return this.layout.themeTemplatesRegion.show(this.ThemeTemplateView);
      };

      PageTemplatesController.prototype._getThemeTemplatesGrid = function(collection) {
        return new ThemeTemplatesGrid({
          collection: collection
        });
      };

      PageTemplatesController.prototype._getPageTemplatesGrid = function(collection) {
        return new PageTemplatesGrid({
          collection: collection
        });
      };

      return PageTemplatesController;

    })(AppController);
    TemplateView = (function(_super) {
      __extends(TemplateView, _super);

      function TemplateView() {
        return TemplateView.__super__.constructor.apply(this, arguments);
      }

      TemplateView.prototype.tagName = 'li';

      TemplateView.prototype.template = '{{post_title}}';

      TemplateView.prototype.events = {
        'click': function() {
          this.$el.closest('.template-layout').find('.templates li').removeClass('selected');
          this.$el.addClass('selected');
          return this.trigger("template:clicked", this.model);
        }
      };

      return TemplateView;

    })(Marionette.ItemView);
    EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.template = '<div class="empty-view">{{#polyglot}}No Templates Found{{/polyglot}}</div>';

      return EmptyView;

    })(Marionette.ItemView);
    PageTemplatesGrid = (function(_super) {
      __extends(PageTemplatesGrid, _super);

      function PageTemplatesGrid() {
        return PageTemplatesGrid.__super__.constructor.apply(this, arguments);
      }

      PageTemplatesGrid.prototype.template = '<h4>{{#polyglot}}Choose page Template{{/polyglot}}</h4> <ul class="templates"></ul> <input type="text" style="display: none" name="menu_order" id="menu-order">';

      PageTemplatesGrid.prototype.itemView = TemplateView;

      PageTemplatesGrid.prototype.itemViewContainer = '.templates';

      PageTemplatesGrid.prototype.emptyView = EmptyView;

      PageTemplatesGrid.prototype.onShow = function() {
        var lastPageModel;
        lastPageModel = this.collection.last();
        return this.$el.find('#menu-order').val(lastPageModel.get('menu_order'));
      };

      return PageTemplatesGrid;

    })(Marionette.CompositeView);
    ThemeTemplatesGrid = (function(_super) {
      __extends(ThemeTemplatesGrid, _super);

      function ThemeTemplatesGrid() {
        return ThemeTemplatesGrid.__super__.constructor.apply(this, arguments);
      }

      ThemeTemplatesGrid.prototype.template = '<h4>{{#polyglot}}Choose Theme Template{{/polyglot}}</h4> <ul class="templates"></ul>';

      ThemeTemplatesGrid.prototype.itemView = TemplateView;

      ThemeTemplatesGrid.prototype.itemViewContainer = '.templates';

      ThemeTemplatesGrid.prototype.emptyView = EmptyView;

      return ThemeTemplatesGrid;

    })(Marionette.CompositeView);
    TemplatesLayout = (function(_super) {
      __extends(TemplatesLayout, _super);

      function TemplatesLayout() {
        return TemplatesLayout.__super__.constructor.apply(this, arguments);
      }

      TemplatesLayout.prototype.template = '<div class="page-templates"></div> <div class="theme-templates"></div>';

      TemplatesLayout.prototype.className = 'template-layout';

      TemplatesLayout.prototype.regions = {
        pageTemplatesRegion: '.page-templates',
        themeTemplatesRegion: '.theme-templates'
      };

      return TemplatesLayout;

    })(Marionette.Layout);
    return App.commands.setHandler("show:templates:grid", function(opt) {
      return new PageTemplatesController(opt);
    });
  });
});
