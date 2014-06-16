var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Link.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.LinkView = (function(_super) {
      __extends(LinkView, _super);

      function LinkView() {
        return LinkView.__super__.constructor.apply(this, arguments);
      }

      LinkView.prototype.tagName = 'span';

      LinkView.prototype.template = '<a href="{{link}}" target="{{target}}">{{text}}</a>';

      LinkView.prototype.className = 'link';

      LinkView.prototype.onRender = function() {
        var className;
        className = _.slugify(this.model.get('style'));
        return this.$el.addClass(className);
      };

      LinkView.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        }
      };

      return LinkView;

    })(Marionette.ItemView);
  });
});