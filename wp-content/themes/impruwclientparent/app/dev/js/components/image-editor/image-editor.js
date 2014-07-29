var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['app', 'marionette'], function(App, Marionette) {
  var ImageEditorView, InvalidMediaView, imageCropView;
  InvalidMediaView = (function(_super) {
    __extends(InvalidMediaView, _super);

    function InvalidMediaView() {
      return InvalidMediaView.__super__.constructor.apply(this, arguments);
    }

    InvalidMediaView.prototype.template = 'Invalid media argument passed';

    return InvalidMediaView;

  })(Marionette.ItemView);
  ImageEditorView = (function(_super) {
    __extends(ImageEditorView, _super);

    function ImageEditorView() {
      this._iasInit = __bind(this._iasInit, this);
      this._addConstraints = __bind(this._addConstraints, this);
      this.showImageEditor = __bind(this.showImageEditor, this);
      return ImageEditorView.__super__.constructor.apply(this, arguments);
    }

    ImageEditorView.prototype.className = 'wp_attachment_holder';

    ImageEditorView.prototype.template = '<p class="loading t-a-c">{{#polyglot}}Loading... Please wait...{{/polyglot}}</p>';

    ImageEditorView.prototype.initialize = function(options) {
      ImageEditorView.__super__.initialize.call(this, options);
      if (this.model._fetch) {
        return App.execute("when:fetched", [this.model], this.showImageEditor);
      } else {
        return this.listenTo(this, 'show', this.showImageEditor);
      }
    };

    ImageEditorView.prototype.back = function() {
      this.trigger("image:editing:cancelled");
      return this.close();
    };

    ImageEditorView.prototype.save = function() {
      return this.model.fetch();
    };

    ImageEditorView.prototype.refresh = function() {
      return this.model.fetch();
    };

    ImageEditorView.prototype.showImageEditor = function() {
      this.$el.attr('id', "image-editor-" + (this.model.get('id')));
      window.imageEdit.open(this.model.get('id'), this.model.get('nonces').edit, this);
      return _.delay(this._addConstraints, 400);
    };

    ImageEditorView.prototype._addConstraints = function() {
      var img, options;
      img = $("#image-preview-" + (this.model.get('id')));
      options = Marionette.getOption(this, 'options');
      options.onInit = this._iasInit;
      this.model.on('change', this.showImageEditor);
      return img.load(function() {
        return _.delay(function() {
          var iasOptions;
          iasOptions = window.imageEdit.iasapi.getOptions();
          iasOptions.parent.children().unbind('mousedown');
          _.defaults(options, iasOptions);
          $(img).imgAreaSelect({
            remove: true
          });
          return window.imageEdit.iasapi = $(img).imgAreaSelect(options);
        }, 200);
      });
    };

    ImageEditorView.prototype._iasInit = function(img) {
      var $img;
      $img = $(img);
      $img.next().css('position', 'absolute').nextAll('.imgareaselect-outer').css('position', 'absolute');
      return $('.imgedit-settings').hide();
    };

    ImageEditorView.prototype.onClose = function() {};

    return ImageEditorView;

  })(Marionette.ItemView);
  imageCropView = function(mediaId, options) {
    var imageEditorView, media;
    if (mediaId == null) {
      mediaId = 0;
    }
    if (options == null) {
      options = {};
    }
    if (mediaId === 0) {
      return new InvalidMediaView;
    }
    if (_.isObject(mediaId)) {
      media = mediaId;
    } else if (_.isNumber(parseInt(mediaId))) {
      media = App.request("get:media:by:id", mediaId);
    }
    imageEditorView = new ImageEditorView({
      model: media,
      options: options
    });
    return imageEditorView;
  };
  return App.reqres.setHandler("get:image:editor:view", imageCropView);
});
