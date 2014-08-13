var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageRooms.TranslatedRoomDateranges.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TranslatedRoomDaterangesItemView;
    TranslatedRoomDaterangesItemView = (function(_super) {
      __extends(TranslatedRoomDaterangesItemView, _super);

      function TranslatedRoomDaterangesItemView() {
        return TranslatedRoomDaterangesItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedRoomDaterangesItemView.prototype.template = '<div class="form-group"> <div class="col-sm-12"> <input type="text" placeholder="{{#polyglot}}Add Translation{{/polyglot}}" id="translated_facility_names" class="form-control" value="{{daterange_name}}" data-daterange="{{id}}"> </div> </div> ';

      return TranslatedRoomDaterangesItemView;

    })(Marionette.ItemView);
    return Views.TranslatedRoomDaterangesView = (function(_super) {
      __extends(TranslatedRoomDaterangesView, _super);

      function TranslatedRoomDaterangesView() {
        return TranslatedRoomDaterangesView.__super__.constructor.apply(this, arguments);
      }

      TranslatedRoomDaterangesView.prototype.template = '<form class="form-horizontal edit_daterange_translation"> </form> <div> <button class="btn btn-xs aj-imp-orange-btn" name="btn_update-daterange-translation" id="btn_update-daterange-translation"> Update </button> </div>';

      TranslatedRoomDaterangesView.prototype.tagName = 'div';

      TranslatedRoomDaterangesView.prototype.className = 'col-sm-5';

      TranslatedRoomDaterangesView.prototype.itemView = TranslatedRoomDaterangesItemView;

      TranslatedRoomDaterangesView.prototype.itemViewContainer = '.edit_daterange_translation';

      TranslatedRoomDaterangesView.prototype.events = {
        "click #btn_update-daterange-translation": "updateDaterange"
      };

      TranslatedRoomDaterangesView.prototype.updateDaterange = function(e) {
        var dateranges;
        e.preventDefault();
        dateranges = [];
        this.$el.find("input").each(function() {
          dateranges.push({
            name: $(this).val(),
            id: $(this).attr("data-daterange"),
            translation_of: $(this).attr("data-originaldaterange")
          });
        });
        return this.trigger('update:translated:dateranges', dateranges);
      };

      TranslatedRoomDaterangesView.prototype.onDaterangeUpdated = function() {
        this.$el.find('.alert').remove();
        this.$el.append('<div class="alert alert-success">' + _.polyglot.t('Date range translation updated successfully') + '</div>');
        return this.$el.find('.alert').fadeOut(5000);
      };

      return TranslatedRoomDaterangesView;

    })(Marionette.CompositeView);
  });
});
