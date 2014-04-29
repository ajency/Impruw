var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/room-summary/policies/templates/policiesView.html'], function(App, policiesformTpl) {
  return App.module('RoomSummaryApp.Policies.View', function(View, App, Backbone, Marionette, $, _) {
    return View.PoliciesForm = (function(_super) {
      __extends(PoliciesForm, _super);

      function PoliciesForm() {
        return PoliciesForm.__super__.constructor.apply(this, arguments);
      }

      PoliciesForm.prototype.tagName = 'form';

      PoliciesForm.prototype.template = policiesformTpl;

      PoliciesForm.prototype.className = 'form-horizontal clearfix';

      PoliciesForm.prototype.events = {
        'click #update_policies': function(e) {
          var formdata;
          e.preventDefault();
          formdata = Backbone.Syphon.serialize(this);
          return this.trigger("update:additional:policy:click", formdata);
        }
      };

      PoliciesForm.prototype.onPolicyUpdated = function() {
        this.$el.find('.alert').remove();
        return this.$el.prepend('<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Additional Policies Saved.</div>');
      };

      return PoliciesForm;

    })(Marionette.ItemView);
  });
});
