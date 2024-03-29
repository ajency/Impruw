var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'plupload'], function(App, plupload, uploadTpl) {
  return App.module('Media.Upload.Views', function(Views, App) {
    return Views.UploadView = (function(_super) {
      __extends(UploadView, _super);

      function UploadView() {
        return UploadView.__super__.constructor.apply(this, arguments);
      }

      UploadView.prototype.template = '<div class="aj-imp-upload-media"><span class="bicon icon-uniF10C"></span> <div id="choosefiles" class="aj-imp-upload-message"><span class="glyphicon glyphicon-cloud-upload"></span> {{#polyglot}}Upload Images{{/polyglot}} </div> <span class="small-text">{{#polyglot}}Upload Multiple Images{{/polyglot}}</span> <div class="clear"></div> <br/> <div class="progress-text"></div> <div id="progress" style="width: 30%; margin: 0px auto; display: none;" class="progress progress-striped active"> <div role="progressbar" class="progress-bar  progress-bar-info"></div> <span class="sr-only">{{#polyglot}}0% Complete{{/polyglot}} </span> </div> </div>';

      UploadView.prototype.onShow = function() {
        this.uploaded = 0;
        this.uploader = new plupload.Uploader({
          runtimes: "gears,html5,flash,silverlight,browserplus",
          file_data_name: "async-upload",
          multiple_queues: true,
          browse_button: "choosefiles",
          multipart: true,
          urlstream_upload: true,
          max_file_size: "10mb",
          url: UPLOADURL,
          flash_swf_url: SITEURL + "/wp-includes/js/plupload/plupload.flash.swf",
          silverlight_xap_url: SITEURL + "/wp-includes/js/plupload/plupload.silverlight.xap",
          filters: [
            {
              title: "Image files",
              extensions: "jpg,gif,png,ico"
            }
          ],
          multipart_params: {
            action: "upload-attachment",
            _wpnonce: _WPNONCE
          }
        });
        this.uploader.init();
        this.uploader.bind("FilesAdded", (function(_this) {
          return function(up, files) {
            _this.uploader.start();
            return _this.$el.find("#progress").show();
          };
        })(this));
        this.uploader.bind("UploadProgress", (function(_this) {
          return function(up, file) {
            var current, total;
            total = up.total.uploaded + up.total.queued - _this.uploaded;
            current = up.total.uploaded + 1 - _this.uploaded;
            _this.$el.find(".progress-bar").css('transition-duration', '0.6s');
            _this.$el.find(".progress-text").html("Uploading <span>" + current + "</span> of <span>" + total + "</span>");
            return _this.$el.find(".progress-bar").css("width", file.percent + "%");
          };
        })(this));
        this.uploader.bind('UploadFile', (function(_this) {
          return function(up, file) {
            _this.$el.find(".progress-bar").css('transition-duration', '0.01s');
            return _this.$el.find(".progress-bar").css("width", file.percent + "%");
          };
        })(this));
        this.uploader.bind("Error", (function(_this) {
          return function(up, err) {
            return up.refresh();
          };
        })(this));
        this.uploader.bind("FileUploaded", (function(_this) {
          return function(up, file, response) {
            response = JSON.parse(response.response);
            if (up.total.queued === 0) {
              return App.execute("new:media:added", response.data, true);
            } else {
              return App.execute("new:media:added", response.data);
            }
          };
        })(this));
        return this.uploader.bind("UploadComplete", (function(_this) {
          return function(up, file) {
            _this.uploaded = up.total.uploaded;
            _this.$el.find(".progress-text").text('');
            _this.$el.find("#progress").hide();
            return _this.trigger("upload:complete");
          };
        })(this));
      };

      UploadView.prototype.onClose = function() {
        return this.uploader.destroy();
      };

      return UploadView;

    })(Marionette.ItemView);
  });
});
