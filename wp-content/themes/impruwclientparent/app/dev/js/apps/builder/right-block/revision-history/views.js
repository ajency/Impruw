var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['app', 'moment'], function(App, moment) {
  return App.module('RevisionHistory.Views', function(Views, App) {
    var RevisionHistoryItem;
    RevisionHistoryItem = (function(_super) {
      __extends(RevisionHistoryItem, _super);

      function RevisionHistoryItem() {
        return RevisionHistoryItem.__super__.constructor.apply(this, arguments);
      }

      RevisionHistoryItem.prototype.template = '<li> <span class="revision"> {{author}}, {{timeElapsed}} <a href="#" class="time-link">{{date}}</a> </span> </li>';

      RevisionHistoryItem.prototype.events = {
        'click .time-link': function(e) {
          return this.trigger("show:revision:restore", this.model.id);
        }
      };

      RevisionHistoryItem.prototype.mixinTemplateHelpers = function(data) {
        var dateGMT;
        data = RevisionHistoryItem.__super__.mixinTemplateHelpers.call(this, data);
        dateGMT = new Date(data.post_date.replace(/-/g, '/') + ' UTC ');
        data.date = dateGMT.toLocaleDateString();
        data.timeElapsed = moment(dateGMT).fromNow();
        return data;
      };

      return RevisionHistoryItem;

    })(Marionette.ItemView);
    return Views.RevisionHitoryList = (function(_super) {
      __extends(RevisionHitoryList, _super);

      function RevisionHitoryList() {
        this.getLatestCollection = __bind(this.getLatestCollection, this);
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

      RevisionHitoryList.prototype.initialize = function(option) {
        this.revisionCollection = Marionette.getOption(this, 'fullCollection');
        this.getLatestCollection();
        return this.listenTo(this.revisionCollection, 'add', this.getLatestCollection);
      };

      RevisionHitoryList.prototype.getLatestCollection = function() {
        var lastThreeRevisions;
        this.revisionCollection.comparator = function(rev) {
          return -rev.id;
        };
        this.revisionCollection.sort();
        lastThreeRevisions = _.first(this.revisionCollection.toArray(), 3);
        this.collection = new Backbone.Collection(lastThreeRevisions);
        return this.render();
      };

      return RevisionHitoryList;

    })(Marionette.CompositeView);
  });
});
