var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('FacilitiesApp.List.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyView, FacilityItem;
    FacilityItem = (function(_super) {
      __extends(FacilityItem, _super);

      function FacilityItem() {
        return FacilityItem.__super__.constructor.apply(this, arguments);
      }

      FacilityItem.prototype.className = 'facility';

      FacilityItem.prototype.tagName = 'div';

      FacilityItem.prototype.template = '<div class="display_facility"> <label for="checkbox2" class="checkbox "> <input type="checkbox" {{#selected}}checked="true"{{/selected}}  name="facility[{{term_id}}]" value="{{term_id}}"> <span class="facility-name">{{name}}</span> </label> <div class="action"> <a href="javascript:void(0)" class="edit">{{#polyglot}}Edit{{/polyglot}}</a>&nbsp; <a href="javascript:void(0)" class="delete">{{#polyglot}}Delete{{/polyglot}}</a> </div> </div> <div class="update_facility hidden"> <div class="facility_update"> <input type="text" name="facility_name" class="form-control input-sm" value="{{name}}" /> <div class="facility_actions"> <a href="javascript:void(0)" class="update">{{#polyglot}}Update{{/polyglot}}</a> <a href="javascript:void(0)" class="cancel" >{{#polyglot}}Cancel{{/polyglot}}</a> </div> </div> </div>';

      FacilityItem.prototype.serializeData = function() {
        var data;
        data = FacilityItem.__super__.serializeData.call(this);
        data.selected = Marionette.getOption(this, 'selected');
        return data;
      };

      FacilityItem.prototype.onShow = function() {
        this.$el.attr({
          'id': "facility-" + (this.model.get('term_id'))
        });
        return this.$el.find('input[type="checkbox"]').radiocheck();
      };

      FacilityItem.prototype.events = {
        'click a.delete': function() {
          if (confirm(_.polyglot.t('Are you sure?'))) {
            return this.trigger("delete:facility:clicked", this.model);
          }
        },
        'click a.edit': function() {
          var facility_name;
          facility_name = this.$el.find('.display_facility .facility-name').html();
          this.$el.find('input[name="facility_name"]').val(facility_name);
          this.$el.find('.display_facility').addClass('hidden');
          return this.$el.find('.update_facility').removeClass('hidden');
        },
        'click a.cancel': function() {
          this.$el.find('.update_facility').addClass('hidden');
          return this.$el.find('.display_facility').removeClass('hidden');
        },
        'click a.update': function() {
          return this.trigger("update:facility:clicked", {
            facility_name: this.$el.find('input[name="facility_name"]').val()
          });
        }
      };

      return FacilityItem;

    })(Marionette.ItemView);
    EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.className = 'empty-info empty-roomfacilities';

      EmptyView.prototype.tagName = 'div';

      EmptyView.prototype.template = '{{#polyglot}}No Facilities Found{{/polyglot}}';

      return EmptyView;

    })(Marionette.ItemView);
    return Views.FacilitiesView = (function(_super) {
      __extends(FacilitiesView, _super);

      function FacilitiesView() {
        return FacilitiesView.__super__.constructor.apply(this, arguments);
      }

      FacilitiesView.prototype.template = '<div class="facilities-list clearfix"></div>';

      FacilitiesView.prototype.itemView = FacilityItem;

      FacilitiesView.prototype.emptyView = EmptyView;

      FacilitiesView.prototype.itemViewContainer = '.facilities-list';

      FacilitiesView.prototype.itemViewOptions = function(item, index) {
        var id, ids, prefacilities, selected, v;
        prefacilities = Marionette.getOption(this, 'prefacilities');
        id = parseInt(item.get('term_id'));
        selected = false;
        ids = _.values(_.invert(prefacilities));
        v = _.filter(ids, function(d) {
          return parseInt(d) === id;
        });
        if (v.length > 0) {
          selected = true;
        }
        return {
          selected: selected
        };
      };

      FacilitiesView.prototype.onUpdateView = function(model) {
        var facility_name, term_id;
        term_id = model.get('term_id');
        facility_name = model.get('facility_name');
        this.$el.find("#facility-" + term_id + " .display_facility").removeClass('hidden');
        this.$el.find("#facility-" + term_id + " .update_facility").addClass('hidden');
        return this.$el.find("#facility-" + term_id + " .facility-name").text(facility_name);
      };

      return FacilitiesView;

    })(Marionette.CompositeView);
  });
});
