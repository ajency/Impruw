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
      this.showImageEditor = __bind(this.showImageEditor, this);
      return ImageEditorView.__super__.constructor.apply(this, arguments);
    }

    ImageEditorView.prototype.className = 'wp_attachment_holder';

    ImageEditorView.prototype.template = 'loading... Please wait';

    ImageEditorView.prototype.initialize = function(options) {
      ImageEditorView.__super__.initialize.call(this, options);
      return App.execute("when:fetched", [this.model], this.showImageEditor);
    };

    ImageEditorView.prototype.showImageEditor = function() {
      this.$el.attr('id', "image-editor-" + (this.model.get('id')));
      return window.imageEdit.open(this.model.get('id'), this.model.get('nonces').edit, this);
    };

    return ImageEditorView;

  })(Marionette.ItemView);
  imageCropView = function(mediaId) {
    var imageEditorView, media;
    if (mediaId == null) {
      mediaId = 0;
    }
    if (mediaId === 0) {
      return new InvalidMediaView;
    }
    if (_.isNumber(parseInt(mediaInt))) {
      media = App.request("get:media:by:id", mediaId);
    } else if (_.isObject(mediaId)) {
      media = mediaId;
    }
    imageEditorView = new ImageEditorView({
      model: media
    });
    return imageEditorView;
  };
  return App.reqres.setHandler("get:image:crop:view", imageCropView);
});
