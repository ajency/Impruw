var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('FacilitiesApp.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyView, FacilityItem;
    FacilityItem = (function(_super) {
      __extends(FacilityItem, _super);

      function FacilityItem() {
        return FacilityItem.__super__.constructor.apply(this, arguments);
      }

      FacilityItem.prototype.className = 'facility';

      FacilityItem.prototype.tagName = 'div';

      FacilityItem.prototype.template = '<label for="checkbox2" class="checkbox "> <span class="icons"> <span class="first-icon fui-checkbox-unchecked"></span> <span class="second-icon fui-checkbox-checked"></span> </span> <input type="checkbox" data-toggle="checkbox" name="facility[{{term_id}}]" value="{{term_id}}"> <span>{{name}}</span> </label> <div class="action"> <a href="javascript:void(0)" class="edit">Edit</a>&nbsp; <a href="javascript:void(0)" class="cancel_editfacility hidden" >Cancel</a>&nbsp; <a href="javascript:void(0)" class="delete">Delete</a> </div>';

      FacilityItem.prototype.events = {
        'click a.delete': function() {
          if (confirm('Are you sure?')) {
            return this.trigger("delete:facility:clicked", this.model);
          }
        }
      };

      return FacilityItem;

    })(Marionette.ItemView);
    EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.className = 'empty-roomfacilities';

      EmptyView.prototype.tagName = 'div';

      EmptyView.prototype.template = 'No Facilities Found';

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

      return FacilitiesView;

    })(Marionette.CompositeView);
  });
});
