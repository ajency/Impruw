var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/billing/account-summary/templates/siteAddOnsInfo.html'], function(App, viewTpl) {
  return App.module('BillingApp.SiteAddOnsInfo.View', function(View, App, Backbone, Marionette, $, _) {
    var EmptyBillingInfoView, SiteAddOnsInfoItemView;
    SiteAddOnsInfoItemView = (function(_super) {
      __extends(SiteAddOnsInfoItemView, _super);

      function SiteAddOnsInfoItemView() {
        return SiteAddOnsInfoItemView.__super__.constructor.apply(this, arguments);
      }

      SiteAddOnsInfoItemView.prototype.template = '<div class="form-group"> <label for="checkbox2" class="checkbox"><input type="checkbox" data-toggle="checkbox" value="{{element}}" {{#selectStatus}}checked{{/selectStatus}}> {{title}} </label> </div>';

      SiteAddOnsInfoItemView.prototype.className = 'col-sm-3';

      SiteAddOnsInfoItemView.prototype.onShow = function() {
        return this.$el.find('input[type="checkbox"]').radiocheck();
      };

      SiteAddOnsInfoItemView.prototype.serializeData = function() {
        var data;
        data = SiteAddOnsInfoItemView.__super__.serializeData.call(this, data);
        if (data.title === "Room Summary") {
          data.title = _.polyglot.t("Display Rooms / Room Summary");
        } else {
          data.title = _.polyglot.t(data.title);
        }
        return data;
      };

      SiteAddOnsInfoItemView.prototype.mixinTemplateHelpers = function(data) {
        data = SiteAddOnsInfoItemView.__super__.mixinTemplateHelpers.call(this, data);
        data.selectStatus = function() {
          var maxAllowedCount, selectStatus;
          selectStatus = false;
          maxAllowedCount = PLAN_FEATURE_COUNT['site_add_ons'][0]['allowed_count'];
          if (maxAllowedCount === 99999) {
            selectStatus = true;
          } else if (SELECTED_SITE_ADDONS.length <= maxAllowedCount) {
            _.each(SELECTED_SITE_ADDONS, function(site_add_on, key) {
              if (site_add_on === data.element) {
                return selectStatus = true;
              }
            });
          }
          return selectStatus;
        };
        return data;
      };

      return SiteAddOnsInfoItemView;

    })(Marionette.ItemView);
    View.SiteAddOnsInfoView = (function(_super) {
      __extends(SiteAddOnsInfoView, _super);

      function SiteAddOnsInfoView() {
        return SiteAddOnsInfoView.__super__.constructor.apply(this, arguments);
      }

      SiteAddOnsInfoView.prototype.template = viewTpl;

      SiteAddOnsInfoView.prototype.itemView = SiteAddOnsInfoItemView;

      SiteAddOnsInfoView.prototype.itemViewContainer = '#selected-site-addons';

      SiteAddOnsInfoView.prototype.emptyView = EmptyBillingInfoView;

      SiteAddOnsInfoView.prototype.events = {
        'click #btn_update-selected-addons': 'setSelectedAddOns',
        'click .checkbox': 'checkMaximumAllowedCount'
      };

      SiteAddOnsInfoView.prototype.onShow = function() {
        return this.checkMaximumAllowedCount();
      };

      SiteAddOnsInfoView.prototype.checkMaximumAllowedCount = function() {
        var lengthOfSelectedAddOns, maxAllowedCount;
        maxAllowedCount = PLAN_FEATURE_COUNT['site_add_ons'][0]['allowed_count'];
        lengthOfSelectedAddOns = $("input:checked").length;
        if (lengthOfSelectedAddOns >= maxAllowedCount) {
          return this.$el.find(":checkbox:not(:checked)").prop("disabled", true);
        } else {
          return this.$el.find(":checkbox:not(:checked)").prop("disabled", false);
        }
      };

      SiteAddOnsInfoView.prototype.setSelectedAddOns = function(e) {
        var arr, maxAllowedCount, selectedaddOns, siteaddonCheckedCount;
        e.preventDefault();
        siteaddonCheckedCount = $('div#selected-site-addons :checkbox:checked').length;
        maxAllowedCount = PLAN_FEATURE_COUNT['site_add_ons'][0]['allowed_count'];
        if (siteaddonCheckedCount > maxAllowedCount) {
          this.$el.parent().find('.alert').remove();
          this.$el.parent().append("<div class=\"alert alert-error\"><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" + _.polyglot.t("can select certain maximum addons", {
            maxAllowedCount: maxAllowedCount
          }) + "</div>");
          return;
        }
        arr = this.$el.find("div#selected-site-addons input[type='checkbox']");
        selectedaddOns = new Array();
        jQuery.each(arr, function() {
          if (this.checked) {
            selectedaddOns.push(this.value);
          }
        });
        return this.trigger('update:selected:addons', selectedaddOns);
      };

      SiteAddOnsInfoView.prototype.onSelectedAddonsUpdated = function(response) {
        var msg;
        if (response.code === 'OK') {
          msg = _.polyglot.t("The selected addons were successfully updated");
          this.$el.parent().find('.alert').remove();
          return this.$el.parent().append("<div class=\"alert alert-success\"><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" + msg + "</div>");
        } else if (response.code === 'ERROR') {
          msg = _.polyglot.t("The selected addons were not successfully updated");
          this.$el.parent().find('.alert').remove();
          return this.$el.parent().append("<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" + msg + "</div>");
        }
      };

      return SiteAddOnsInfoView;

    })(Marionette.CompositeView);
    EmptyBillingInfoView = (function(_super) {
      __extends(EmptyBillingInfoView, _super);

      function EmptyBillingInfoView() {
        return EmptyBillingInfoView.__super__.constructor.apply(this, arguments);
      }

      EmptyBillingInfoView.prototype.template = '<div class="row"> <div class="col-sm-12"> <div class="empty-info">' + _.polyglot.t("No site add ons are enabled yet.") + '</div> </div> </div>';

      return EmptyBillingInfoView;

    })(Marionette.ItemView);
    return View.DisabledSiteAddOnsInfo = (function(_super) {
      __extends(DisabledSiteAddOnsInfo, _super);

      function DisabledSiteAddOnsInfo() {
        return DisabledSiteAddOnsInfo.__super__.constructor.apply(this, arguments);
      }

      DisabledSiteAddOnsInfo.prototype.template = '<div class="row"> <div class="col-sm-12"> <div class="empty-info">' + _.polyglot.t("Site add ons are currently not available for your current chosen plan") + '</div> </div> </div>';

      return DisabledSiteAddOnsInfo;

    })(Marionette.ItemView);
  });
});
