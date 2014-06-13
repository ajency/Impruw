var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module("AddPage", function(AddPage, App) {
    var AddPageController, AddPageView;
    AddPageController = (function(_super) {
      __extends(AddPageController, _super);

      function AddPageController() {
        this.showSuccessMessage = __bind(this.showSuccessMessage, this);
        return AddPageController.__super__.constructor.apply(this, arguments);
      }

      AddPageController.prototype.initialize = function(opt) {
        var layout;
        if (opt == null) {
          opt = {};
        }
        this.layout = layout = this._getAddPageView();
        this.listenTo(layout, "show", function() {
          return App.execute("show:templates:grid", {
            region: layout.chooseTemplateRegion
          });
        });
        this.listenTo(layout, "add:new:page", (function(_this) {
          return function(data) {
            return _this._saveNewPage(data);
          };
        })(this));
        this.listenTo(layout.chooseTemplateRegion, "template:selected", (function(_this) {
          return function(model) {
            return _this.layout.triggerMethod("update:template:page:id", model.get('ID'));
          };
        })(this));
        return this.show(layout);
      };

      AddPageController.prototype._saveNewPage = function(data) {
        var page;
        page = App.request("create:page:model", data);
        return page.save(null, {
          wait: true,
          success: this.showSuccessMessage
        });
      };

      AddPageController.prototype.showSuccessMessage = function(page) {
        this.addToPageMenu(page);
        this.layout.triggerMethod("show:success:message");
        return App.vent.trigger("new:page:added", page);
      };

      AddPageController.prototype.addToPageMenu = function(pageModel) {
        var pageCollection;
        pageCollection = App.request("get:editable:pages");
        return pageCollection.add(pageModel);
      };

      AddPageController.prototype._getAddPageView = function() {
        return new AddPageView;
      };

      return AddPageController;

    })(AppController);
    AddPageView = (function(_super) {
      __extends(AddPageView, _super);

      function AddPageView() {
        return AddPageView.__super__.constructor.apply(this, arguments);
      }

      AddPageView.prototype.tagName = 'form';

      AddPageView.prototype.className = 'form-horizontal';

      AddPageView.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Add New Page'),
        modal_size: 'medium-modal'
      };

      AddPageView.prototype.regions = {
        chooseTemplateRegion: '#choose-template-region'
      };

      AddPageView.prototype.template = '<div class="row"> <div class="form-group"> <label for="inputEmail3" class="col-sm-2 control-label">{{#polyglot}}Page Title{{/polyglot}}</label> <div class="col-sm-10"> <input type="text" required class="form-control" id="post_title" name="post_title" /> <div class="p-messages"></div> </div> </div> <input type="hidden" name="template_page_id" value="0"/> <div class="form-group"> <div class="col-sm-10 col-sm-offset-2"> <div id="choose-template-region"></div> <button type="button" class="btn btn-sm btn-wide aj-imp-orange-btn add-new-page">{{#polyglot}}Add New Page{{/polyglot}}</button> </div> </div> </div>';

      AddPageView.prototype.onShowSuccessMessage = function() {
        return this.$el.prepend('<div class="alert alert-success">' + _.polyglot.t("New Page added") + '</div>');
      };

      AddPageView.prototype.onUpdateTemplatePageId = function(id) {
        return this.$el.find('input[name="template_page_id"]').val(id);
      };

      AddPageView.prototype.events = {
        'click .add-new-page': function() {
          if (this.$el.valid()) {
            return this.trigger("add:new:page", Backbone.Syphon.serialize(this));
          }
        }
      };

      return AddPageView;

    })(Marionette.Layout);
    return App.commands.setHandler("show:add:new:page", function(opt) {
      return new AddPageController(opt);
    });
  });
});
