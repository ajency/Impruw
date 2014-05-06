var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module("AddPage", function(AddPage, App) {
    var AddPageController, AddPageView;
    AddPageController = (function(_super) {
      __extends(AddPageController, _super);

      function AddPageController() {
        return AddPageController.__super__.constructor.apply(this, arguments);
      }

      AddPageController.prototype.initialize = function(opt) {
        var view;
        if (opt == null) {
          opt = {};
        }
        this.view = view = this._getAddPageView();
        this.listenTo(view, "add:new:page", (function(_this) {
          return function(data) {
            return _this._saveNewPage(data);
          };
        })(this));
        this.listenTo(view, "cancel:add:new:page", (function(_this) {
          return function() {
            return console.log("cancel");
          };
        })(this));
        return this.show(view);
      };

      AddPageController.prototype._getAddPageView = function() {
        return new AddPageView;
      };

      return AddPageController;

    })(AppController);
    return AddPageView = (function(_super) {
      __extends(AddPageView, _super);

      function AddPageView() {
        return AddPageView.__super__.constructor.apply(this, arguments);
      }

      AddPageView.prototype.tagName = 'form';

      AddPageView.prototype.className = 'form-horizontal';

      AddPageView.prototype.template = '<div class="row"> <div class="form-group"> <label for="inputEmail3" class="col-sm-2 control-label">Page title</label> <div class="col-sm-10 col-sm-offset-2"> <input type="text" required class="form-control" id="post_title" name="post_title" /> <div class="p-messages"></div> </div> </div> <button type="button" class="btn btn-wide aj-imp-submit add-new-page">Add New Page</button> <button type="button" class="btn cancel-button">Cancel</button> </div>';

      AddPageView.prototype.events = {
        'click .add-new-page': function() {
          if (this.$el.valid()) {
            return this.trigger("add:new:page", Backbone.Syphon.serialize(this));
          }
        },
        'click .cancel-button': function() {
          return this.trigger("cancel:add:new:page");
        }
      };

      return AddPageView;

    })(Marionette.ItemView);
  });
});
