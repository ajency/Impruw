var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'moment'], function(App, moment) {
  return App.module('RevisionHistory.Views', function(Views, App) {
    var RevisionHistoryItem;
    RevisionHistoryItem = (function(_super) {
      __extends(RevisionHistoryItem, _super);

      function RevisionHistoryItem() {
        return RevisionHistoryItem.__super__.constructor.apply(this, arguments);
      }

      RevisionHistoryItem.prototype.template = '<li> <span class="revision"> {{author}}, {{timeElapsed}} <a href="#" class="time-link">{{post_modified}}</a> </span> </li>';

      RevisionHistoryItem.prototype.mixinTemplateHelpers = function(data) {
        data = RevisionHistoryItem.__super__.mixinTemplateHelpers.call(this, data);
        data.timeElapsed = moment(new Date(data.post_date)).fromNow();
        return data;
      };

      return RevisionHistoryItem;

    })(Marionette.ItemView);
    return Views.RevisionHitoryList = (function(_super) {
      __extends(RevisionHitoryList, _super);

      function RevisionHitoryList() {
        return RevisionHitoryList.__super__.constructor.apply(this, arguments);
      }

      RevisionHitoryList.prototype.template = '<h6>{{#polyglot}}History{{/polyglot}}</h6> <ol> </ol> <a href="#history" class="view-history-link">{{#polyglot}}View Full History{{/polyglot}}</a>';

      RevisionHitoryList.prototype.itemView = RevisionHistoryItem;

      RevisionHitoryList.prototype.itemViewContainer = 'ol';

      RevisionHitoryList.prototype.events = {
        'click .view-history-link': function(e) {
          e.preventDefault();
          if (this.collection.at(0)) {
            return this.trigger("show:revision:restore");
          }
        }
      };

      RevisionHitoryList.prototype.onShow = function() {};

      return RevisionHitoryList;

    })(Marionette.CompositeView);
  });
});
