var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('RevisionHistory.Views', function(Views, App) {
    var RevisionHistoryItem;
    RevisionHistoryItem = (function(_super) {
      __extends(RevisionHistoryItem, _super);

      function RevisionHistoryItem() {
        return RevisionHistoryItem.__super__.constructor.apply(this, arguments);
      }

      RevisionHistoryItem.prototype.template = '<li> <span class="revision"> {{author}}, {{timeElapsed}} <a href="#" class="time-link">{{post_modified}}</a> </span> </li>';

      RevisionHistoryItem.prototype.mixinTemplateHelpers = function(data) {
        var days, hours, milliseconds, minutes, seconds;
        data = RevisionHistoryItem.__super__.mixinTemplateHelpers.call(this, data);
        milliseconds = new Date() - (new Date(data.post_modified));
        seconds = parseInt((milliseconds / 1000) % 60);
        minutes = parseInt((milliseconds / (1000 * 60)) % 60);
        hours = parseInt((milliseconds / (1000 * 60 * 60)) % 24);
        days = parseInt((milliseconds / (1000 * 60 * 60 * 24)) % 7);
        if (days > 1) {
          data.timeElapsed = "" + days + " days ago";
        } else if (days === 1) {
          data.timeElapsed = "1 day ago";
        } else if (hours > 1) {
          data.timeElapsed = "" + hours + " hours ago";
        } else if (hours === 1) {
          data.timeElapsed = "1 hour ago";
        } else if (minutes > 1) {
          data.timeElapsed = "" + minutes + " minutes ago";
        } else if (minutes === 1) {
          data.timeElapsed = "1 minute ago";
        } else if (seconds) {
          data.timeElapsed = "" + seconds + " seconds ago";
        }
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

      RevisionHitoryList.prototype.onShow = function() {
        return console.log('df');
      };

      return RevisionHitoryList;

    })(Marionette.CompositeView);
  });
});
