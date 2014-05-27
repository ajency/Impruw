var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module("PageTemplates", function(PageTemplates, App) {
    var EmptyView, PageTemplatesController, PageTemplatesGrid, TemplateView;
    PageTemplatesController = (function(_super) {
      __extends(PageTemplatesController, _super);

      function PageTemplatesController() {
        return PageTemplatesController.__super__.constructor.apply(this, arguments);
      }

      PageTemplatesController.prototype.initialize = function(opt) {
        var collection, view;
        if (opt == null) {
          opt = {};
        }
        this.collection = collection = App.request("get:pages:collection");
        this.collection.fetch({
          data: {
            'meta_key': 'page_templates'
          }
        });
        view = this._getPageTemplatesGrid(this.collection);
        this.listenTo(view, "itemview:template:clicked", (function(_this) {
          return function(iv, model) {
            return Marionette.triggerMethod.call(_this.region, "template:selected", model);
          };
        })(this));
        return this.show(view, {
          loading: true
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

      EmptyView.prototype.template = '<div class="empty-view">No Templates Found.</div>';

      return EmptyView;

    })(Marionette.ItemView);
    PageTemplatesGrid = (function(_super) {
      __extends(PageTemplatesGrid, _super);

      function PageTemplatesGrid() {
        return PageTemplatesGrid.__super__.constructor.apply(this, arguments);
      }

      PageTemplatesGrid.prototype.template = '<h4>Choose a page Template</h4> <ul class="templates"></ul>';

      PageTemplatesGrid.prototype.itemView = TemplateView;

      PageTemplatesGrid.prototype.itemViewContainer = '.templates';

      PageTemplatesGrid.prototype.emptyView = EmptyView;

      return PageTemplatesGrid;

    })(Marionette.CompositeView);
    return App.commands.setHandler("show:templates:grid", function(opt) {
      return new PageTemplatesController(opt);
    });
  });
});
