var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('RightBlock.Views', function(Views, App) {
    return Views.RightBlockLayout = (function(_super) {
      __extends(RightBlockLayout, _super);

      function RightBlockLayout() {
        return RightBlockLayout.__super__.constructor.apply(this, arguments);
      }

      RightBlockLayout.prototype.className = 'right-toolbox';

      RightBlockLayout.prototype.template = '<div class="handle-right"><span class="bicon icon-uniF164"></span></div> <a href="#choose-theme" class="btn btn-sm btn-block choose-theme"><span class="bicon icon-uniF185"></span>{{#polyglot}}Switch Theme{{/polyglot}}</a> <div id="aj-imp-color-sel"> <a class="btn btn-xs btn-block">{{#polyglot}}Change Theme Colors{{/polyglot}}</a> </div> <div class="revision-history"> <h6>{{#polyglot}}History{{/polyglot}}</h6> <ol> <li> <span class="revision"> Admin, 5 minutes ago <a href="#" class="time-link">15th Oct 2014 @ 13:41:21</a> </span> </li> <li> <span class="revision"> You, 3 hours ago <a href="#" class="time-link">15th Oct 2014 @ 10:16:42</a> </span> </li> <li> <span class="revision"> You, 3 days ago <a href="#" class="time-link">11th Oct 2014 @ 22:30:54</a> </span> </li> </ol> <a href="#history" class="view-history-link">{{#polyglot}}View Full History{{/polyglot}}</a> </div> <div class="aj-imp-builder-options"> <a href="#" class="builder-help">{{#polyglot}}Need Help{{/polyglot}}&nbsp;<span class="bicon icon-uniF13B"></span></a> </div> <div id="unused-elements"></div>';

      RightBlockLayout.prototype.regions = {
        unusedElementsRegion: '#unused-elements'
      };

      RightBlockLayout.prototype.events = {
        'click #aj-imp-color-sel': function() {
          return this.trigger("show:theme:color:clicked");
        }
      };

      RightBlockLayout.prototype.onShow = function() {
        return this.$el.tabSlideOut({
          tabHandle: '.handle-right',
          tabLocation: 'right',
          speed: 300,
          action: 'click',
          topPos: '30px',
          fixedPosition: true
        });
      };

      return RightBlockLayout;

    })(Marionette.Layout);
  });
});
