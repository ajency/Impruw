var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/rooms/tariffs/plan/templates/editPlan.html'], function(App, AppController, editPlanTpl) {
  return App.module("RoomsApp.RoomsTariff.Plan.Edit", function(Edit, App) {
    var EditPlanController, EditPlanView;
    EditPlanController = (function(_super) {
      __extends(EditPlanController, _super);

      function EditPlanController() {
        this.planDeleted = __bind(this.planDeleted, this);
        this.planSaved = __bind(this.planSaved, this);
        return EditPlanController.__super__.constructor.apply(this, arguments);
      }

      EditPlanController.prototype.initialize = function(opt) {
        var model, planView;
        model = opt.model;
        this.planView = planView = this._getEditPlanView(model);
        this.listenTo(planView, "update:plan:details", (function(_this) {
          return function(data) {
            model.set(data);
            return model.save(null, {
              wait: true,
              success: _this.planSaved
            });
          };
        })(this));
        this.listenTo(planView, "delete:plan", (function(_this) {
          return function(model) {
            return model.destroy({
              allData: false,
              wait: true,
              success: _this.planDeleted
            });
          };
        })(this));
        return this.show(planView);
      };

      EditPlanController.prototype.planSaved = function() {
        return this.planView.triggerMethod("saved:plan");
      };

      EditPlanController.prototype.planDeleted = function() {
        return this.planView.triggerMethod("deleted:plan");
      };

      EditPlanController.prototype._getEditPlanView = function(plan) {
        return new EditPlanView({
          model: plan
        });
      };

      return EditPlanController;

    })(AppController);
    EditPlanView = (function(_super) {
      __extends(EditPlanView, _super);

      function EditPlanView() {
        return EditPlanView.__super__.constructor.apply(this, arguments);
      }

      EditPlanView.prototype.tagName = 'form';

      EditPlanView.prototype.className = 'form-horizontal';

      EditPlanView.prototype.template = editPlanTpl;

      EditPlanView.prototype.dialogOptions = {
        modal_title: 'Edit Plan',
        modal_size: 'medium-modal'
      };

      EditPlanView.prototype.events = {
        'click #btn_updateplan': function() {
          var data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            return this.trigger("update:plan:details", data);
          }
        },
        'click #btn_deleteplan': function() {
          if (confirm('Delete plan?')) {
            return this.trigger("delete:plan", this.model);
          }
        }
      };

      EditPlanView.prototype.onSavedPlan = function() {
        this.$el.parent().find('.alert').remove();
        return this.$el.parent().prepend('<div class="alert alert-success">Updated successfully</div>');
      };

      EditPlanView.prototype.onDeletedPlan = function() {
        return this.trigger("dialog:close");
      };

      EditPlanView.prototype.onShow = function() {
        return this.$el.find('input[type="checkbox"]').checkbox();
      };

      return EditPlanView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:edit:plan", function(opts) {
      opts = {
        region: App.dialogRegion,
        model: opts.model
      };
      return new EditPlanController(opts);
    });
  });
});
