var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Title.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.TitleView = (function(_super) {
      __extends(TitleView, _super);

      function TitleView() {
        this.configureEditor = __bind(this.configureEditor, this);
        this.setUpCKEditor = __bind(this.setUpCKEditor, this);
        return TitleView.__super__.constructor.apply(this, arguments);
      }

      TitleView.prototype.tagName = 'h3';

      TitleView.prototype.template = '';

      TitleView.prototype.className = 'title';

      TitleView.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        },
        'blur': function() {
          return this.trigger("title:element:blur", this.$el.html());
        }
      };

      TitleView.prototype.initialize = function() {
        return this.$el.on('focus', _.once(this.setUpCKEditor));
      };

      TitleView.prototype.setUpCKEditor = function() {
        var html;
        this.editor = CKEDITOR.inline(document.getElementById(this.$el.attr('id')));
        html = this.$el.html();
        this.editor.setData(html);
        return this.editor.config.placeholder = 'Click here to enter Title';
      };

      TitleView.prototype.onShow = function() {
        var content, _ref;
        this.$el.attr('contenteditable', 'true').attr('id', _.uniqueId('title-'));
        content = (_ref = this.model.get('content')[WPML_DEFAULT_LANG]) != null ? _ref : this.model.get('content');
        return this.$el.html(_.stripslashes(content != null ? content : ''));
      };

      TitleView.prototype.onClose = function() {
        return this.editor.destroy();
      };

      TitleView.prototype.configureEditor = function(event) {
        var editor, element;
        editor = event.editor;
        element = editor.element;
        return editor.on("configLoaded", function() {
          editor.config.extraPlugins = 'confighelper';
          return editor.config.extraPlugins = 'justify';
        });
      };

      return TitleView;

    })(Marionette.ItemView);
  });
});
