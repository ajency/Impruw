var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'holder'], function(App, Holder) {
  return App.module('SiteBuilderApp.Element.ImageWithText.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.ImageWithTextView = (function(_super) {
      __extends(ImageWithTextView, _super);

      function ImageWithTextView() {
        return ImageWithTextView.__super__.constructor.apply(this, arguments);
      }

      ImageWithTextView.prototype.className = 'image';

      ImageWithTextView.prototype.template = '<img {{holder}}src="{{imageurl}}" alt="{{title}}" class="{{alignclass}} img-responsive image-img-with-text"/> <p class="editor"></p> <div class="clearfix"></div>';

      ImageWithTextView.prototype.mixinTemplateHelpers = function(data) {
        data = ImageWithTextView.__super__.mixinTemplateHelpers.call(this, data);
        data.holder = '';
        if (this.model.isNew()) {
          data.holder = 'data-';
          data.imageurl = function() {
            return this.url = "" + SITEURL + "/wp-content/themes/impruwclientparent/app/dev/js/plugins/holder.js/35%x165";
          };
        } else {
          if (!data.sizes[data.size]) {
            data.size = _.chain(_.keys(data.sizes)).first().value();
          }
          data.imageurl = function() {
            return this.sizes[this.size].url;
          };
        }
        data.alignclass = function() {
          switch (this.alignment) {
            case 'left':
              return 'pull-left';
            case 'right':
              return 'pull-right';
          }
        };
        return data;
      };

      ImageWithTextView.prototype.events = {
        'click img': function(e) {
          e.stopPropagation();
          return this.trigger("show:media:manager");
        },
        'blur p.editor': function(e) {
          return this.trigger("text:element:blur", this.$el.children('p.editor').html());
        }
      };

      ImageWithTextView.prototype.onShow = function() {
        var content;
        if (this.model.isNew()) {
          Holder.run();
          this.$el.find('img').removeAttr('data-src');
        }
        this.$el.children('p.editor').attr('contenteditable', 'true').attr('id', _.uniqueId('text-'));
        this.editor = CKEDITOR.inline(document.getElementById(this.$el.children('p.editor').attr('id')));
        content = Marionette.getOption(this, 'templateHelpers').content;
        return this.editor.setData(_.stripslashes(content));
      };

      return ImageWithTextView;

    })(Marionette.ItemView);
  });
});
