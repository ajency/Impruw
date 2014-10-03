var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Image.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.ImageView = (function(_super) {
      __extends(ImageView, _super);

      function ImageView() {
        this.adjustImage = __bind(this.adjustImage, this);
        this.imageMoved = __bind(this.imageMoved, this);
        return ImageView.__super__.constructor.apply(this, arguments);
      }

      ImageView.prototype.className = 'image';

      ImageView.prototype.template = '{{#image}} <img src="{{imageurl}}" alt="{{title}}" width="100%" class="{{alignclass}} img-responsive"/> <div class="clearfix"></div> {{/image}} {{#placeholder}} <div class="image-placeholder" style="height:100%;"><span class="bicon icon-uniF10E"></span>{{#polyglot}}Upload Image{{/polyglot}}</div> {{/placeholder}}';

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
        if (this.eleModel) {
          data.hyperlink = this.eleModel.get('link');
          data.linkTarget = this.eleModel.get('target');
        }
        return data;
      };

      ImageView.prototype.events = {
        'click': 'imageClick'
      };

      ImageView.prototype.initialize = function(options) {
        return this.eleModel = Marionette.getOption(this, 'eleModel');
      };

      ImageView.prototype._getImageRatio = function() {
        var height, width;
        width = this.$el.width();
        height = this.$el.height();
        return "" + (parseInt(width)) + ":" + (parseInt(height));
      };

      ImageView.prototype.onShow = function() {
        if (this.model.isNew()) {
          this.$el.resizable({
            helper: "ui-image-resizable-helper",
            handles: "s",
            stop: (function(_this) {
              return function(evt, ui) {
                return _this.$el.css('width', 'auto');
              };
            })(this)
          });
          return;
        }
        this.$el.css('overflow', 'hidden');
        this.adjustImage();
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
            return function(evt, ui) {
              return $(_this).addClass('noclick');
            };
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
        this.parentColumns = this.$el.parents('.column');
        this.parentColumns.each((function(_this) {
          return function(index, parentColumn) {
            console.log(parentColumn);
            $(parentColumn).on('class:changed', _this.adjustImage);
            return $(parentColumn).on('element:moved', _this.imageMoved);
          };
        })(this));
        return this.assignImagePath();
      };

      ImageView.prototype.imageMoved = function(i) {
        this.assignImagePath();
        this.parentColumns.each((function(_this) {
          return function(index, parentColumn) {
            $(parentColumn).off('element:moved', _this.imageMoved);
            return $(parentColumn).off('class:changed', _this.adjustImage);
          };
        })(this));
        this.parentColumns = this.$el.parents('.column');
        this.parentColumns.each((function(_this) {
          return function(index, parentColumn) {
            $(parentColumn).on('element:moved', _this.imageMoved);
            return $(parentColumn).on('class:changed', _this.adjustImage);
          };
        })(this));
        return this.adjustImage();
      };

      ImageView.prototype.imageClick = function(e) {
        var ratio;
        e.stopPropagation();
        if ($(e.target).hasClass('noclick')) {
          return $(e.target).removeClass('noclick');
        } else {
          ratio = this._getImageRatio();
          return this.trigger("show:media:manager", ratio);
        }
      };

      ImageView.prototype.assignImagePath = function() {
        var image, width;
        width = this.$el.width();
        image = this.model.getBestFit(width);
        this.$el.find('img').attr('src', image.url);
        return this.trigger("image:size:selected", image.size);
      };

      ImageView.prototype.adjustImage = function() {
        if (this.eleModel.get('heightRatio') !== 'auto') {
          this.$el.height(parseFloat(this.eleModel.get('heightRatio')) * this.$el.width());
        }
        if (this.eleModel.get('topRatio')) {
          this.$el.find('img').css('top', "" + (parseFloat(this.eleModel.get('topRatio')) * this.$el.width()) + "px");
        }
        return this.assignImagePath();
      };

      ImageView.prototype.adjustImagePosition = function() {
        var top;
        top = parseInt(_(this.$el.find('img').css('top')).rtrim('px'));
        if (top > 0) {
          this.$el.find('img').css('top', '0px');
        }
        return this.trigger('set:image:top:position', this.$el.width(), parseInt(this.$el.find('img').css('top')));
      };

      ImageView.prototype.onClose = function() {
        if (this.parentColumns) {
          return this.parentColumns.each((function(_this) {
            return function(index, parentColumn) {
              $(parentColumn).off('element:moved', _this.imageMoved);
              return $(parentColumn).off('class:changed', _this.adjustImage);
            };
          })(this));
        }
      };

      return ImageView;

    })(Marionette.ItemView);
  });
});
