var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'holder'], function(App, Holder) {
  return App.module('SiteBuilderApp.Element.Image.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.ImageView = (function(_super) {
      __extends(ImageView, _super);

      function ImageView() {
        return ImageView.__super__.constructor.apply(this, arguments);
      }

      ImageView.prototype.className = 'image';

      ImageView.prototype.template = '{{#image}} <img src="{{imageurl}}" alt="{{title}}" class="{{alignclass}} img-responsive"/> <div class="clearfix"></div> {{/image}} {{#placeholder}} <div class="image-placeholder"><span class=""></span></div> {{/placeholder}}';

      ImageView.prototype.mixinTemplateHelpers = function(data) {
        data = ImageView.__super__.mixinTemplateHelpers.call(this, data);
        if (this.model.isNew()) {
          data.placeholder = true;
        } else {
          data.image = true;
          data.imageurl = function() {
            if (this.sizes['thumbnail']) {
              return this.sizes['thumbnail'].url;
            } else {
              return this.sizes['full'].url;
            }
          };
          data.alignclass = function() {
            switch (this.alignment) {
              case 'left':
                return 'pull-left';
              case 'right':
                return 'pull-right';
            }
          };
        }
        return data;
      };

      ImageView.prototype.events = {
        'click': function(e) {
          e.stopPropagation();
          return this.trigger("show:media:manager");
        }
      };

      ImageView.prototype.onShow = function() {
        var height, src, width;
        if (this.model.isNew()) {
          Holder.run();
          return this.$el.find('img').removeAttr('data-src');
        } else {
          width = this.$el.width();
          height = this.$el.height();
          src = this.model.getBestFit(width, height);
          return this.$el.find('img').attr('src', src);
        }
      };

      return ImageView;

    })(Marionette.ItemView);
  });
});
