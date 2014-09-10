var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Text.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.TextView = (function(_super) {
      __extends(TextView, _super);

      function TextView() {
        this.setUpCKEditor = __bind(this.setUpCKEditor, this);
        return TextView.__super__.constructor.apply(this, arguments);
      }

      TextView.prototype.tagName = 'div';

      TextView.prototype.template = '';

      TextView.prototype.className = 'text';

      TextView.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        },
        'blur': function() {
          return this.trigger("text:element:blur", this.$el.html());
        }
      };

      TextView.prototype.initialize = function() {
        return this.$el.on('focus', _.once(this.setUpCKEditor));
      };

      TextView.prototype.setUpCKEditor = function() {
        var html;
        this.editor = CKEDITOR.inline(document.getElementById(this.$el.attr('id')));
        html = this.$el.html();
        this.editor.setData(html);
        return this.editor.config.placeholder = 'Click here to enter your text...';
      };

      TextView.prototype.onShow = function() {
        var content, _ref;
        this.$el.attr('contenteditable', 'true').attr('id', _.uniqueId('text-'));
        content = (_ref = this.model.get('content')[WPML_DEFAULT_LANG]) != null ? _ref : this.model.get('content');
        return this.$el.html(_.stripslashes(content != null ? content : ''));
      };

      TextView.prototype.onClose = function() {
        return this.editor.destroy();
      };

      return TextView;

    })(Marionette.ItemView);
  });
});
