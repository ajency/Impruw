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

      TitleView.prototype.tagName = 'div';

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
        CKEDITOR.on('instanceCreated', this.configureEditor);
        this.editor = CKEDITOR.inline(document.getElementById(this.$el.attr('id')));
        this.editor.on('changedTitleStyle', (function(_this) {
          return function(evt) {
            return _this.model.set('style', evt.data.style);
          };
        })(this));
        this.editor.on('titleStylesInitDone', (function(_this) {
          return function() {
            return _this.editor.fire('initStylesList', {
              style: _this.model.get('style'),
              styles: settingsModel.get('styles')
            });
          };
        })(this));
        html = this.$el.html();
        this.editor.setData(html);
        return this.editor.config.placeholder = 'Click here to enter Title';
      };

      TitleView.prototype.onShow = function() {
        var content, settingsModel, _ref;
        settingsModel = Marionette.getOption(this, 'settingsModel');
        this.$el.attr('contenteditable', 'true').attr('id', _.uniqueId('title-'));
        content = (_ref = this.model.get('content')[WPML_DEFAULT_LANG]) != null ? _ref : this.model.get('content');
        return this.$el.html(_.stripslashes(content != null ? content : ''));
      };

      TitleView.prototype.onClose = function() {
        if (this.editor) {
          return this.editor.destroy();
        }
      };

      TitleView.prototype.configureEditor = function(event) {
        var editor, element;
        editor = event.editor;
        element = editor.element;
        if (element.getAttribute('id') === this.$el.attr('id')) {
          return editor.on('configLoaded', function() {
            editor.config.extraPlugins = 'titlestyles';
            return editor.config.stylesSet = "" + CURRENTTHEME + "_title_styles";
          });
        }
      };

      return TitleView;

    })(Marionette.ItemView);
  });
});
