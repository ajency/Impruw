var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/room-summary/policies/views'], function(App, AppController) {
  return App.module('RoomSummaryApp.Policies', function(Policies, App, Backbone, Marionette, $, _) {
    Policies.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.policyUpdated = __bind(this.policyUpdated, this);
        this.updateAdditionalPolicy = __bind(this.updateAdditionalPolicy, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var sitemodel;
        this.sitemodel = sitemodel = opts.model;
        this.view = this.getPoliciesFormView(sitemodel);
        this.listenTo(this.view, "update:additional:policy:click", this.updateAdditionalPolicy);
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getPoliciesFormView = function(model) {
        return new Policies.View.PoliciesForm({
          model: model
        });
      };

      Controller.prototype.updateAdditionalPolicy = function(data) {
        this.sitemodel.set(data);
        return this.sitemodel.save(null, {
          wait: true,
          onlyChanged: true,
          success: this.policyUpdated
        });
      };

      Controller.prototype.policyUpdated = function() {
        return this.view.triggerMethod("policy:updated");
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:policies:form", function(opts) {
      return new Policies.Controller(opts);
    });
  });
});
