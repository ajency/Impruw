var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Social.Views', function(Views, App, Backbone, Marionette, $, _) {
    var SocialItem;
    SocialItem = (function(_super) {
      __extends(SocialItem, _super);

      function SocialItem() {
        return SocialItem.__super__.constructor.apply(this, arguments);
      }

      SocialItem.prototype.tagName = 'li';

      SocialItem.prototype.template = '<a href="javascript:void(0);"><span class="name">{{socialname}}</span></a>';

      SocialItem.prototype.onRender = function() {
        return this.$el.find('a').addClass("icon-" + (_.slugify(this.model.get('socialname'))));
      };

      return SocialItem;

    })(Marionette.ItemView);
    return Views.SocialView = (function(_super) {
      __extends(SocialView, _super);

      function SocialView() {
        return SocialView.__super__.constructor.apply(this, arguments);
      }

      SocialView.prototype.tagName = 'ul';

      SocialView.prototype.className = 'social';

      SocialView.prototype.itemView = SocialItem;

      SocialView.prototype.onRender = function() {
        var className, style;
        style = Marionette.getOption(this, 'style');
        className = _.slugify(style);
        return this.$el.addClass(className);
      };

      SocialView.prototype.onShow = function() {
        this.$el.attr("data-content", "If you are trying to set your Facebook or Twitter link, you can do that by going to your <a href='../dashboard/#/site-profile/' target='_BLANK'>site profile</a> from the dashboard. You can test the icons by clicking on preview or your live site.");
        return this.$el.popover({
          html: true,
          placement: 'top'
        });
      };

      return SocialView;

    })(Marionette.CollectionView);
  });
});
