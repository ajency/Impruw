var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/image/views'], function(App) {
  return App.module('SiteBuilderApp.Element.Logo.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.LogoView = (function(_super) {
      __extends(LogoView, _super);

      function LogoView() {
        return LogoView.__super__.constructor.apply(this, arguments);
      }

      LogoView.prototype.className = 'logo';

      LogoView.prototype.template = '{{#image}} <img src="{{imageurl}}" alt="{{title}}" class="{{alignclass}} img-responsive "/> <div class="clearfix"></div> {{/image}} {{#imageNotFound}} <div class="image-placeholder" style="height:100%;"><span class="bicon icon-uniF10E"></span>{{#polyglot}}Image not found. Upload new image.{{/polyglot}}</div> {{/imageNotFound}} {{#placeholder}} <div class="image-placeholder"><span class="bicon icon-uniF10E"></span>Logo</div> {{/placeholder}}';

      return LogoView;

    })(App.SiteBuilderApp.Element.Image.Views.ImageView);
  });
});
