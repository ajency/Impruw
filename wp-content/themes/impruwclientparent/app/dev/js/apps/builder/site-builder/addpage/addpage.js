var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module("AddPage", function(AddPage, App) {
    var AddPageController, AddPageView;
    AddPageController = (function(_super) {
      __extends(AddPageController, _super);

      function AddPageController() {
        this.newMenuItemAdded = __bind(this.newMenuItemAdded, this);
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
            var is_theme_template;
            is_theme_template = false;
            console.log(model);
            console.log(model.get('is_theme_template'));
            if (model.get('is_theme_template')) {
              console.log(model.get('is_theme_template'));
              is_theme_template = true;
            }
            return _this.layout.triggerMethod("update:template:page:id", model.get('ID'), is_theme_template);
          };
        })(this));
        return this.show(layout);
      };

      AddPageController.prototype._saveNewPage = function(data) {
        var page;
        this.setAsMenuItem = data.add_to_menu;
        page = App.request("create:page:model", data);
        return page.save(null, {
          wait: true,
          success: this.showSuccessMessage
        });
      };

      AddPageController.prototype.showSuccessMessage = function(page) {
        var data, menuCollection, menuId, menumodel;
        this.addToPageMenu(page);
        this.layout.triggerMethod("show:success:message");
        menuId = window.MENUID;
        if (menuId === 0) {
          return;
        }
        if (this.setAsMenuItem === true) {
          menumodel = App.request("create:new:menu:item");
          menumodel.set('menu_id', menuId);
          menuCollection = App.request("get:menu:items:by:menuid", window.MENUID);
          data = {
            menu_item_title: page.get('post_title'),
            page_id: page.get('original_id'),
            menu_item_parent: 0,
            order: menuCollection.length + 1
          };
          return menumodel.save(data, {
            wait: true,
            success: this.newMenuItemAdded
          });
        }
      };

      AddPageController.prototype.newMenuItemAdded = function(model) {
        var menuCollection;
        menuCollection = App.request("get:menu:items:by:menuid", window.MENUID);
        return menuCollection.add(model);
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
        modal_size: 'modal'
      };

      AddPageView.prototype.regions = {
        chooseTemplateRegion: '#choose-template-region'
      };

      AddPageView.prototype.template = '<div class="row add-page-container"> <div class="form-group"> <label for="post_title" class="col-sm-3 control-label">{{#polyglot}}Page Title{{/polyglot}}</label> <div class="col-sm-9"> <input type="text" required class="form-control" id="post_title" name="post_title" /> <div class="p-messages"></div> </div> </div> <input type="hidden" name="is_theme_template" value="false"/> <input type="hidden" name="template_page_id" value="0"/> <div class="form-group"> <div class="col-sm-9 col-sm-offset-3"> <label class="control-label"> <span class="checkbox"> <input type="checkbox" value="1" checked="checked" name="add_to_menu"/> Add page to menu </span> </label> <div id="choose-template-region"></div> <div class="select-template-error field-error hide">{{#polyglot}}Please select a template first{{/polyglot}}</div> <button type="button" class="btn btn-sm btn-wide aj-imp-orange-btn add-new-page"> {{#polyglot}}Add New Page{{/polyglot}}</button> </div> </div> </div>';

      AddPageView.prototype.onShow = function() {
        return this.$el.find('input[type="checkbox"]').radiocheck();
      };

      AddPageView.prototype.onShowSuccessMessage = function() {
        return this.$el.prepend('<div class="alert alert-success">' + _.polyglot.t("New Page added") + '</div>');
      };

      AddPageView.prototype.onUpdateTemplatePageId = function(id, is_theme_template) {
        if (is_theme_template == null) {
          is_theme_template = false;
        }
        this.$el.find('input[name="is_theme_template"]').val(is_theme_template);
        this.$el.find('input[name="template_page_id"]').val(id);
        return this.$el.find('.select-template-error').removeClass('show').addClass('hide');
      };

      AddPageView.prototype.events = {
        'click .add-new-page': function() {
          if (this.$el.valid()) {
            if (this.$el.find('input[name="template_page_id"]').val() !== '0') {
              return this.trigger("add:new:page", Backbone.Syphon.serialize(this));
            } else {
              return this.$el.find('.select-template-error').removeClass('hide').addClass('show');
            }
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
