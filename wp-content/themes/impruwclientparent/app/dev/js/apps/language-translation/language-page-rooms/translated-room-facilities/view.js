var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageRooms.TranslatedRoomFacilities.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TranslatedRoomFacilitiesItemView;
    TranslatedRoomFacilitiesItemView = (function(_super) {
      __extends(TranslatedRoomFacilitiesItemView, _super);

      function TranslatedRoomFacilitiesItemView() {
        return TranslatedRoomFacilitiesItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedRoomFacilitiesItemView.prototype.template = '<div class="form-group"> <div class="col-sm-12"> <input type="text" placeholder="{{#polyglot}}Add Translation{{/polyglot}}" id="translated_facility_names" class="form-control" value="{{facilityName}}" data-facility="{{facilityId}}"> </div> </div> ';

      return TranslatedRoomFacilitiesItemView;

    })(Marionette.ItemView);
    return Views.TranslatedRoomFacilitiesView = (function(_super) {
      __extends(TranslatedRoomFacilitiesView, _super);

      function TranslatedRoomFacilitiesView() {
        return TranslatedRoomFacilitiesView.__super__.constructor.apply(this, arguments);
      }

      TranslatedRoomFacilitiesView.prototype.template = '<form class="edit_term_translation"> </form> <div> <button class="btn btn-xs aj-imp-orange-btn" name="btn_update-term-translation" id="btn_update-term-translation"> Update </button> </div>';

      TranslatedRoomFacilitiesView.prototype.tagName = 'div';

      TranslatedRoomFacilitiesView.prototype.className = 'col-sm-5';

      TranslatedRoomFacilitiesView.prototype.itemView = TranslatedRoomFacilitiesItemView;

      TranslatedRoomFacilitiesView.prototype.itemViewContainer = '.edit_term_translation';

      TranslatedRoomFacilitiesView.prototype.events = {
        "click #btn_update-term-translation": "updateFacilityTerms"
      };

      TranslatedRoomFacilitiesView.prototype.updateFacilityTerms = function(e) {
        var facilities;
        e.preventDefault();
        facilities = [];
        this.$el.find("input").each(function() {
          facilities.push({
            name: $(this).val(),
            id: $(this).attr("data-facility")
          });
        });
        return this.trigger('update:translated:facilities', facilities);
      };

      return TranslatedRoomFacilitiesView;

    })(Marionette.CompositeView);
  });
});
