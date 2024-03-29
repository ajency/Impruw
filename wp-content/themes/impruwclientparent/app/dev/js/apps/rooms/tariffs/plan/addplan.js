var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/rooms/tariffs/plan/templates/addPlan.html'], function(App, AppController, addPlanTpl) {
  return App.module("RoomsApp.RoomsTariff.Plan.Add", function(Add, App) {
    var AddPlanController, AddPlanView;
    AddPlanController = (function(_super) {
      __extends(AddPlanController, _super);

      function AddPlanController() {
        this.planSaved = __bind(this.planSaved, this);
        return AddPlanController.__super__.constructor.apply(this, arguments);
      }

      AddPlanController.prototype.initialize = function(opt) {
        var planView;
        this.planView = planView = this._getAddPlanView();
        this.listenTo(planView, "add:plan:details", (function(_this) {
          return function(data) {
            var plan;
            plan = App.request("create:plan:model", data);
            return plan.save(null, {
              wait: true,
              success: _this.planSaved
            });
          };
        })(this));
        return this.show(planView);
      };

      AddPlanController.prototype.planSaved = function(plan) {
        var pcollection;
        pcollection = App.request("get:plans:collection");
        pcollection.add(plan);
        return this.planView.triggerMethod("saved:plan");
      };

      AddPlanController.prototype._getAddPlanView = function(plan) {
        return new AddPlanView({
          model: plan
        });
      };

      return AddPlanController;

    })(AppController);
    AddPlanView = (function(_super) {
      __extends(AddPlanView, _super);

      function AddPlanView() {
        return AddPlanView.__super__.constructor.apply(this, arguments);
      }

      AddPlanView.prototype.tagName = 'form';

      AddPlanView.prototype.className = 'form-horizontal';

      AddPlanView.prototype.template = addPlanTpl;

      AddPlanView.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Add Plan'),
        modal_size: 'medium-modal'
      };

      AddPlanView.prototype.events = {
        'click #btn_addplan': function(e) {
          var data;
          if (this.$el.valid()) {
            this.$el.find('#btn_addplan').prop('disabled', true);
            data = Backbone.Syphon.serialize(this);
            return this.trigger("add:plan:details", data);
          }
        }
      };

      AddPlanView.prototype.onSavedPlan = function() {
        this.$el.parent().find('.alert').remove();
        this.$el.parent().prepend("<div class=\"alert alert-success\">" + _.polyglot.t("New tarriff created") + "</div>");
        this.$el.find('input').val('');
        this.$el.find('textarea').val('');
        return this.$el.find('#btn_addplan').prop('disabled', false);
      };

      AddPlanView.prototype.onShow = function() {
        return this.$el.find('input[type="checkbox"]').radiocheck();
      };

      return AddPlanView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:add:plan", function() {
      return new AddPlanController({
        region: App.dialogRegion
      });
    });
  });
});
