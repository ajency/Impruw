var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Image.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.ImageView = (function(_super) {
      __extends(ImageView, _super);

      function ImageView() {
        return ImageView.__super__.constructor.apply(this, arguments);
      }

      ImageView.prototype.className = 'image imgLiquidFill';

      ImageView.prototype.template = '{{#image}} <img src="{{imageurl}}" alt="{{title}}" width="100%" class="{{alignclass}} img-responsive"/> <div class="clearfix"></div> {{/image}} {{#placeholder}} <div class="image-placeholder"><span class="bicon icon-uniF10E"></span>Upload Image</div> {{/placeholder}}';

      ImageView.prototype.mixinTemplateHelpers = function(data) {
        data = ImageView.__super__.mixinTemplateHelpers.call(this, data);
        if (this.model.isNew()) {
          data.placeholder = true;
        } else {
          data.image = true;
          data.imageurl = '';
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
        if (this.model.isNew()) {
          return;
        }
        this.$el.resizable({
          maxWidth: this.$el.closest('.column').width(),
          helper: "ui-image-resizable-helper",
          stop: (function(_this) {
            return function(evt, ui) {
              return _this.assignImagePath(_this.$el.height());
            };
          })(this)
        });
        return this.assignImagePath(0);
      };

      ImageView.prototype.assignImagePath = function(height) {
        var image, width;
        if (height == null) {
          height = 0;
        }
        width = this.$el.width();
        image = this.model.getBestFit(width);
        this.$el.find('img').attr('src', image.url);
        this.$el.css('height', height === 0 ? this.$el.height() : height);
        return this.$el.imgLiquid();
      };

      return ImageView;

    })(Marionette.ItemView);
  });
});
