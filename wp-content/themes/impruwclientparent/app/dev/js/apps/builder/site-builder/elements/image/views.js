var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Image.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.ImageView = (function(_super) {
      __extends(ImageView, _super);

      function ImageView() {
        return ImageView.__super__.constructor.apply(this, arguments);
      }

      ImageView.prototype.className = 'image';

      ImageView.prototype.template = '{{#image}} <img src="{{imageurl}}" alt="{{title}}" width="100%" class="{{alignclass}} img-responsive"/> <div class="clearfix"></div> {{/image}} {{#placeholder}} <div class="image-placeholder"><span class="bicon icon-uniF10E"></span>{{#polyglot}}Upload Image{{/polyglot}}</div> {{/placeholder}}';

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
          var ratio;
          e.stopPropagation();
          ratio = this._getImageRatio();
          return this.trigger("show:media:manager", ratio);
        }
      };

      ImageView.prototype.initialize = function(options) {
        this.imageHeightRatio = Marionette.getOption(this, 'imageHeightRatio');
        return this.positionTopRatio = Marionette.getOption(this, 'positionTopRatio');
      };

      ImageView.prototype._getImageRatio = function() {
        var height, width;
        console.log(this.$el);
        width = this.$el.width();
        height = this.$el.height();
        return "" + (parseInt(width)) + ":" + (parseInt(height));
      };

      ImageView.prototype.onShow = function() {
        if (this.model.isNew()) {
          return;
        }
        this.$el.css('overflow', 'hidden');
        if (this.imageHeightRatio !== 'auto') {
          this.$el.height(parseFloat(this.imageHeightRatio) * this.$el.width());
        }
        if (this.positionTopRatio) {
          this.$el.find('img').css('top', "" + (this.positionTopRatio * this.$el.width()) + "px");
        }
        this.$el.resizable({
          helper: "ui-image-resizable-helper",
          handles: "s",
          stop: (function(_this) {
            return function(evt, ui) {
              _this.$el.css('width', 'auto');
              _this.trigger('set:image:height', _this.$el.height(), _this.$el.width());
              return _this.adjustImagePosition();
            };
          })(this),
          start: (function(_this) {
            return function(evt, ui) {};
          })(this)
        });
        this.$el.find('img').draggable({
          axis: "y",
          cursor: "move",
          drag: (function(_this) {
            return function(evt, ui) {
              var topmarginpx;
              topmarginpx = ui.position.top;
              if (topmarginpx > 0) {
                ui.position.top = 0;
              }
              if (topmarginpx < _this.$el.height() - _this.$el.find('img').height()) {
                return ui.position.top = _this.$el.height() - _this.$el.find('img').height();
              }
            };
          })(this),
          stop: (function(_this) {
            return function(evt, ui) {
              return _this.trigger('set:image:top:position', _this.$el.width(), parseInt(_this.$el.find('img').css('top')));
            };
          })(this)
        });
        this.$el.closest('.column').on('class:changed', (function(_this) {
          return function() {
            _this.assignImagePath();
            if (_this.$el.height() > _this.$el.find('img').height()) {
              _this.$el.height('auto');
              _this.trigger('set:image:height', 'auto');
            } else {
              _this.trigger('set:image:height', _this.$el.height(), _this.$el.width());
            }
            return _this.adjustImagePosition();
          };
        })(this));
        this.assignImagePath();
        return console.log("view rendered");
      };

      ImageView.prototype.assignImagePath = function() {
        var image, width;
        width = this.$el.width();
        image = this.model.getBestFit(width);
        this.$el.find('img').attr('src', image.url);
        return this.trigger("image:size:selected", image.size);
      };

      ImageView.prototype.adjustImagePosition = function() {
        var top;
        top = parseInt(_(this.$el.find('img').css('top')).rtrim('px'));
        if (top < this.$el.height() - this.$el.find('img').height()) {
          this.$el.find('img').css('top', "" + (this.$el.height() - this.$el.find('img').height()) + "px");
        }
        return this.trigger('set:image:top:position', this.$el.width(), parseInt(this.$el.find('img').css('top')));
      };

      return ImageView;

    })(Marionette.ItemView);
  });
});
