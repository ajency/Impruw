var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.ImageWithText.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.ImageWithTextView = (function(_super) {
      __extends(ImageWithTextView, _super);

      function ImageWithTextView() {
        return ImageWithTextView.__super__.constructor.apply(this, arguments);
      }

      ImageWithTextView.prototype.className = 'imagewithtext';

      ImageWithTextView.prototype.template = '{{#image}} <img src="{{imageurl}}" alt="{{title}}" class="{{alignclass}} img-responsive"/> {{/image}} {{#placeholder}} <div class="image-placeholder {{alignclass}}"><span class="bicon icon-uniF10E"></span>{{#polyglot}}Upload Image{{/polyglot}}</div> {{/placeholder}} <p class="editor"></p> <div class="clearfix"></div>';

      ImageWithTextView.prototype.mixinTemplateHelpers = function(data) {
        data = ImageWithTextView.__super__.mixinTemplateHelpers.call(this, data);
        data.holder = '';
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
        }
        data.alignclass = function() {
          switch (this.align) {
            case 'left':
              return 'pull-left';
            case 'right':
              return 'pull-right';
          }
        };
        return data;
      };

      ImageWithTextView.prototype.events = {
        'click img,.image-placeholder': function(e) {
          e.stopPropagation();
          return this.trigger("show:media:manager");
        },
        'blur p.editor': function(e) {
          return this.trigger("text:element:blur", this.$el.children('p.editor').html());
        }
      };

      ImageWithTextView.prototype.onStyleUpadted = function(newStyle, prevStyle) {
        return this.$el.removeClass(prevStyle).addClass(newStyle);
      };

      ImageWithTextView.prototype.onRender = function() {
        var style;
        style = Marionette.getOption(this, 'style');
        return this.onStyleUpadted(_.slugify(style), '');
      };

      ImageWithTextView.prototype.onShow = function() {
        var content;
        this.$el.children('p.editor').attr('contenteditable', 'true').attr('id', _.uniqueId('text-'));
        this.editor = CKEDITOR.inline(document.getElementById(this.$el.children('p.editor').attr('id')));
        content = Marionette.getOption(this, 'templateHelpers').content;
        return this.editor.setData(_.stripslashes(content));
      };

      return ImageWithTextView;

    })(Marionette.ItemView);
  });
});
