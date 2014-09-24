var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('SliderManager.EditSlider.SlidesList', function(SlidesList, App, Backbone, Marionette, $, _) {
    var NoSlidesView, SlideView, SlidesListController, SlidesListLayout, SlidesListView;
    SlidesListController = (function(_super) {
      __extends(SlidesListController, _super);

      function SlidesListController() {
        this.showSuccessMessage = __bind(this.showSuccessMessage, this);
        this.slideModelUpdated = __bind(this.slideModelUpdated, this);
        this.updateImageThumb = __bind(this.updateImageThumb, this);
        return SlidesListController.__super__.constructor.apply(this, arguments);
      }

      SlidesListController.prototype.initialize = function(opt) {
        var collection, layout, listView;
        collection = opt.collection;
        this.settingsModel = App.request("get:element:settings:options", 'Title');
        if (collection.length > 0) {
          this.sliderId = collection.at(0).get('slider_id');
        } else {
          collection.once("add", (function(_this) {
            return function(model) {
              return _this.sliderId = parseInt(model.get('slider_id'));
            };
          })(this));
        }
        this.layout = layout = this._getSlidesListLayout();
        this.listView = listView = this._getSlidesListView(collection);
        this.listenTo(listView, "itemview:slide:updated:with:data", function(iv, data) {
          var slide;
          slide = iv.model;
          slide.set(data);
          return slide.save(null, {
            wait: true,
            success: this.slideModelUpdated
          });
        });
        this.listenTo(listView, "itemview:remove:slide", function(iv, slide) {
          return slide.destroy({
            wait: true
          });
        });
        this.listenTo(listView, "itemview:edit:image", function(iv, imageId) {
          var editView, mediaId, ratio;
          mediaId = parseInt(iv.model.get('image_id'));
          ratio = App.currentImageRatio;
          editView = App.request("get:image:editor:view", mediaId, {
            aspectRatio: ratio
          });
          this.updateImageThumb(iv.model, editView.model);
          listView.triggerMethod("show:edit:image", editView);
          return listView.listenTo(editView, "image:editing:cancelled", function() {
            return listView.triggerMethod("image:editing:cancelled");
          });
        });
        this.listenTo(listView, "itemview:add:text", function(iv, imageId) {
          return App.execute('show:slide:text:layer', {
            region: layout.slidesListRegion,
            model: iv.model
          });
        });
        this.listenTo(layout.slidesListRegion, 'slide:layers:saved', function() {
          return layout.slidesListRegion.show(listView);
        });
        this.listenTo(layout, "show:add:new:slide", (function(_this) {
          return function() {
            return App.execute("show:add:new:slide", {
              region: layout.addSlideRegion,
              sliderId: _this.sliderId
            });
          };
        })(this));
        this.listenTo(layout.addSlideRegion, "region:closed new:slide:created", (function(_this) {
          return function(slide) {
            if (_.isObject(slide)) {
              collection.add(slide);
            }
            return layout.triggerMethod("show:add:slide");
          };
        })(this));
        this.listenTo(layout, "show", function() {
          return layout.slidesListRegion.show(listView);
        });
        this.listenTo(listView, "slides:order:updated", function(newOrder) {
          _.each(newOrder, function(slideId, index) {
            var slide;
            slide = collection.get(slideId);
            if (slide) {
              return slide.set('order', index + 1);
            }
          });
          return collection.saveOrder({
            success: this.showSuccessMessage
          });
        });
        return this.show(layout, {
          loading: true
        });
      };

      SlidesListController.prototype.updateImageThumb = function(slideModel, mediaModel) {
        return this.listenTo(mediaModel, 'change', function(model) {
          var fullSize, thumbSize, _ref, _ref1;
          fullSize = (_ref = model.get('sizes').large) != null ? _ref : model.get('sizes').full;
          thumbSize = (_ref1 = model.get('sizes').thumbnail) != null ? _ref1 : model.get('sizes').full;
          return slideModel.set({
            thumb_url: thumbSize.url,
            full_url: fullSize.url
          });
        });
      };

      SlidesListController.prototype._getSlidesListView = function(collection) {
        return new SlidesListView({
          collection: collection,
          settingsModel: this.settingsModel
        });
      };

      SlidesListController.prototype._getSlidesListLayout = function() {
        return new SlidesListLayout;
      };

      SlidesListController.prototype.slideModelUpdated = function() {};

      SlidesListController.prototype.showSuccessMessage = function() {
        return this.layout.triggerMethod("show:order:updated:msg");
      };

      return SlidesListController;

    })(AppController);
    SlideView = (function(_super) {
      __extends(SlideView, _super);

      function SlideView() {
        return SlideView.__super__.constructor.apply(this, arguments);
      }

      SlideView.prototype.tagName = 'div';

      SlideView.prototype.className = 'panel panel-default moveable';

      SlideView.prototype.template = '<div class="panel-heading"> <a class="accordion-toggle"> <div class="aj-imp-image-item row"> <div class="imgthumb col-sm-3"> <img src="{{thumb_url}}" class="img-responsive"> </div> <div class="imgname col-sm-7"> <div class="col-sm-12 "> <form action="" method="POST" role="form" class="form-horizontal" validate> <div class="form-group "> <label for="" class="control-label">{{#polyglot}}Caption Title{{/polyglot}}</label> <input  type="text" name="text" class="caption-title form-control" placeholder="{{#polyglot}}Caption Title{{/polyglot}}"/> </div> <div class="form-group caption-exist"> <label for="" class="control-label">{{#polyglot}}Caption Description{{/polyglot}}</label> <input  type="text" name="text" class="caption-description form-control" placeholder="{{#polyglot}}Caption Description{{/polyglot}}"/> </div> <div class="form-group caption-exist"> <label for="" class="control-label">{{#polyglot}}Caption Link{{/polyglot}}</label> <input  type="text" name="text" class="caption-link form-control" placeholder="{{#polyglot}}Caption Link{{/polyglot}}"/> </div> <div class="form-group caption-exist"> <label for="" class="control-label">{{#polyglot}}Caption Style{{/polyglot}}</label> <select name="style" class="form-control caption-style"> {{#captionStyles}} <option value="{{value}}">{{name}}</option> {{/captionStyles}} </select> </div> <div class="form-group caption-exist"> <label for="" class="control-label">{{#polyglot}}Caption Background{{/polyglot}}</label> <select name="background" class="form-control caption-background"> <option value="transparent-black">Transparent Black</option> <option value="transparent-white">Transparent White</option> </select> </div> <!--     <div class="form-group caption-exist"> <label for="" class="col-sm-4 control-label">{{#polyglot}}Text Animation{{/polyglot}}</label> <div class="col-sm-8"> <select name="animation"> <option value="tp-fade">Fade</option> <option value="sft">Short from Top</option> <option value="sfl">Short from Left</option> <option value="lft">Long from Top</option> <option value="lfl">Long from Left</option> </select> </div> </div> --> <div class="form-group caption-exist"> <label for="" class="control-label">{{#polyglot}}Position{{/polyglot}}</label> <div class="caption-position"> <input type="radio" name="position" value="left,top"> <label><span><span></span></span></label> <input type="radio" name="position" value="center,top"> <label><span><span></span></span></label> <input type="radio" name="position" value="right,top"> <label><span><span></span></span></label> <br> <input type="radio" name="position" value="left,center"> <label><span><span></span></span></label> <input type="radio" name="position" value="center,center"> <label><span><span></span></span></label> <input type="radio" name="position" value="right,center"> <label><span><span></span></span></label> <br> <input type="radio" name="position" value="left,bottom"> <label><span><span></span></span></label> <input type="radio" name="position" value="center,bottom"> <label><span><span></span></span></label> <input type="radio" name="position" value="right,bottom"> <label><span><span></span></span></label> </div> </div> <div class="form-group"> <button type="button"  class="btn btn-sm aj-imp-orange-btn save-slide-layer" >{{#polyglot}}Save{{/polyglot}}</button> <button type="button" class="btn btn-sm aj-imp-submit" id="cancel-slide-layer">{{#polyglot}}Cancel{{/polyglot}}</button> <a class="red-link delete-slide-layer" ><span class="glyphicon glyphicon-trash"></span>&nbsp;{{#polyglot}}Delete Caption{{/polyglot}}</a> </div> </form> </div> </div> <div class="imgactions col-sm-2"> <a href="#/edit-image" class="blue-link edit-image"> <span class="glyphicon glyphicon-edit"></span>{{#polyglot}}Edit Image{{/polyglot}}</a> <a class="red-link remove-slide" title="Delete Image"><span class="glyphicon glyphicon-trash"></span>&nbsp;{{#polyglot}}Delete Image{{/polyglot}}</a> </div> </div> </a> </div>';

      SlideView.prototype.mixinTemplateHelpers = function(data) {
        var captionStyles;
        data = SlideView.__super__.mixinTemplateHelpers.call(this, data);
        captionStyles = Marionette.getOption(this, 'settingsModel');
        data.captionStyles = [];
        _.each(captionStyles.get('styles'), function(style) {
          return data.captionStyles.push({
            name: style.name,
            value: _.slugify(style.name)
          });
        });
        return data;
      };

      SlideView.prototype.modelEvents = {
        'change:thumb_url change:full_url': 'render'
      };

      SlideView.prototype.events = {
        'click .remove-slide': function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (confirm(_.polyglot.t('Are you sure?'))) {
            return this.trigger("remove:slide", this.model);
          }
        },
        'click .edit-image': function(e) {
          e.preventDefault();
          return this.trigger("edit:image");
        },
        'change .caption-title ': function(e) {
          if ($(e.target).val() !== '') {
            return this.$el.find('.caption-exist').slideDown('fast');
          } else {
            this.$el.find('.caption-exist').hide();
            this.model.set('layers', []);
            this.model.save();
            return this.model.trigger('model:changed');
          }
        },
        'click .save-slide-layer': 'saveSlideLayer',
        'click .delete-slide-layer': function(e) {
          this.model.set('layers', []);
          this.model.save();
          this.model.trigger('model:changed');
          return this.setCaptionDefaults();
        }
      };

      SlideView.prototype.onRender = function() {
        return this.$el.attr('data-slide-id', this.model.get('id'));
      };

      SlideView.prototype.onShow = function() {
        this.$el.find('select').selectpicker();
        return this.setCaptionDefaults();
      };

      SlideView.prototype.setCaptionDefaults = function() {
        var caption, captionHtml;
        if (this.model.get('layers').length && this.model.get('layers')[0].text !== '') {
          caption = this.model.get('layers')[0];
          this.$el.find('.caption-exist').show();
          captionHtml = $.parseHTML(caption.text);
          this.$el.find('.caption-title').val($(captionHtml).first().find('a').first().html());
          this.$el.find('.caption-description').val($(captionHtml).last().html());
          this.$el.find('.caption-link').val($(captionHtml).first().find('a').first().attr('href'));
          this.$el.find('.caption-style').selectpicker('val', $(captionHtml).first().attr('class'));
          this.$el.find('.caption-background').selectpicker('val', caption.style);
          return this.$el.find("input[name='position'][value='" + caption.left + "," + caption.top + "']").prop('checked', true);
        } else {
          this.$el.find('.caption-exist').hide();
          this.$el.find('.caption-title').val('');
          this.$el.find('.caption-description').val('');
          this.$el.find('.caption-link').val('');
          return this.$el.find("input[name='position'][value='" + (this.layerDefault().left) + "," + (this.layerDefault().top) + "']").prop('checked', true);
        }
      };

      SlideView.prototype.saveSlideLayer = function(e) {
        var data, position;
        data = {};
        if (this.model.get('layers').length) {
          data = this.model.get('layers')[0];
        } else {
          data = this.layerDefault();
        }
        data.text = "<h3 class=" + (this.$el.find('.caption-style').val()) + "> <a href=" + (this.$el.find('.caption-link').val()) + "> " + (this.$el.find('.caption-title').val()) + " </a></h3> <div>" + (this.$el.find('.caption-description').val()) + "</div>";
        data.style = this.$el.find('.caption-background').val();
        position = this.$el.find('input[name="position"]:checked').val();
        position = position.split(',');
        data.left = position[0];
        data.top = position[1];
        this.model.set('layers', [data]);
        this.model.save();
        return this.model.trigger('model:changed');
      };

      SlideView.prototype.layerDefault = function() {
        return {
          align_hor: "left",
          align_vert: "top",
          alt: "",
          animation: "tp-fade",
          attrClasses: "",
          attrID: "",
          attrRel: "",
          attrTitle: "",
          corner_left: "nothing",
          corner_right: "nothing",
          easing: "Power3.easeInOut",
          endSpeedFinal: 300,
          endTimeFinal: 8700,
          endanimation: "auto",
          endeasing: "nothing",
          endspeed: 300,
          endsplit: "none",
          endsplitdelay: "10",
          endtime: "",
          height: -1,
          hiddenunder: false,
          left: 'center',
          link: "",
          link_open_in: "same",
          link_slide: "nothing",
          max_height: "auto",
          max_width: "auto",
          realEndTime: 9000,
          resizeme: true,
          scaleProportional: false,
          scaleX: "",
          scaleY: "",
          scrollunder_offset: "",
          serial: 0,
          speed: 300,
          split: "none",
          splitdelay: "10",
          style: "transparent-black",
          text: "Caption Text",
          time: 500,
          timeLast: 8500,
          top: 'center',
          type: "text",
          whitespace: "nowrap",
          width: -1
        };
      };

      return SlideView;

    })(Marionette.ItemView);
    NoSlidesView = (function(_super) {
      __extends(NoSlidesView, _super);

      function NoSlidesView() {
        return NoSlidesView.__super__.constructor.apply(this, arguments);
      }

      NoSlidesView.prototype.template = '<div class="alert">{{#polyglot}}No images found. Please add images.{{/polyglot}}</div>';

      return NoSlidesView;

    })(Marionette.ItemView);
    SlidesListView = (function(_super) {
      __extends(SlidesListView, _super);

      function SlidesListView() {
        this.slidesSorted = __bind(this.slidesSorted, this);
        return SlidesListView.__super__.constructor.apply(this, arguments);
      }

      SlidesListView.prototype.template = ' <div class="slides-list"> <div class="aj-imp-image-header row"> <div class="col-sm-3"> &nbsp; </div> <div class="col-sm-7"> {{#polyglot}}Slide Caption{{/polyglot}} </div> <div class="col-sm-2"> {{#polyglot}}Actions{{/polyglot}} </div> </div> <div class="panel-group" id="slides-accordion"></div> </div> <div id="edit-image-view" class="edit-image-view"></div>';

      SlidesListView.prototype.itemView = SlideView;

      SlidesListView.prototype.emptyView = NoSlidesView;

      SlidesListView.prototype.itemViewContainer = '#slides-accordion';

      SlidesListView.prototype.itemViewOptions = function() {
        return {
          settingsModel: Marionette.getOption(this, 'settingsModel')
        };
      };

      SlidesListView.prototype.onBeforeRender = function() {
        return this.collection.sort();
      };

      SlidesListView.prototype.onShow = function() {
        return this.$el.find('#slides-accordion').sortable({
          start: function(e, ui) {
            return ui.placeholder.height(ui.item.height());
          },
          update: this.slidesSorted
        });
      };

      SlidesListView.prototype.slidesSorted = function(evt, ui) {
        var newOrder, order;
        order = this.$el.find('#slides-accordion').sortable('toArray', {
          attribute: 'data-slide-id'
        });
        newOrder = _.map(order, function(o, i) {
          return parseInt(o);
        });
        return this.trigger("slides:order:updated", newOrder);
      };

      SlidesListView.prototype.onClose = function() {
        return this.$el.find('#slides-accordion').sortable('destroy');
      };

      SlidesListView.prototype.onShowEditImage = function(editView) {
        this.$el.find('.slides-list').hide();
        this.$el.find('.edit-image-view').html(editView.$el).show();
        $('.crop-help').show();
        return editView.triggerMethod('show');
      };

      SlidesListView.prototype.onImageEditingCancelled = function() {
        var self;
        self = this;
        this.$el.find('.edit-image-view').fadeOut('fast', function() {
          $(this).empty();
          return self.$el.find('.slides-list').show();
        });
        return $('.crop-help').hide();
      };

      return SlidesListView;

    })(Marionette.CompositeView);
    SlidesListLayout = (function(_super) {
      __extends(SlidesListLayout, _super);

      function SlidesListLayout() {
        return SlidesListLayout.__super__.constructor.apply(this, arguments);
      }

      SlidesListLayout.prototype.template = '<div class="row"> <div class="col-sm-8"> <div id="slides-list-region"></div> </div> <div class="col-sm-4"> <div class="alert alert-info crop-help"> <p><b>{{#polyglot}}Steps to fit your image edge to edge inside the slider{{/polyglot}}</b></p> <ul> <li>{{#polyglot}}Select the area to be cropped.{{/polyglot}}</li> <li>{{#polyglot}}Notice how initially the crop button is disabled. Crop is enabled once you have selected the image close to the aspect ratio of the slider.{{/polyglot}}</li> <li>{{#polyglot}}Your image dimensions are displayed in scale image area and the required dimensions are displayed under image crop area.{{/polyglot}}</li> <li>{{#polyglot}}As you increase the decrease your selection, the selection area height and width will also change.{{/polyglot}}</li> <li>{{#polyglot}}Once it reaches the maximum point for expected image width or height, you will not be able to increase the selection area anymore. If you want a larger image, we suggest you increase the width of the slider from sitebuilder for best results.{{/polyglot}}</li> <li>{{#polyglot}}When you are happy with your selection area to be cropped, click the crop button from the tool bar above.{{/polyglot}}</li> </ul> </div> <div id="slides-info"> {{#polyglot}}Click the button to select images to add to your slider. You can change the order of the images by dragging them up or down in the list to the left.{{/polyglot}} </div> <div class="aj-imp-block-button add-new-slide"> <button class="btn btn-default btn-hg"><span class="bicon icon-uniF10C"></span>&nbsp;&nbsp;{{#polyglot}}Add Image{{/polyglot}}</button> </div> </div> </div> <div id="add-slide-region"></div>';

      SlidesListLayout.prototype.events = {
        'click .add-new-slide': function() {
          this.$el.find('.add-new-slide').hide();
          return this.trigger("show:add:new:slide");
        }
      };

      SlidesListLayout.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Image Gallery'),
        modal_size: 'wide-modal'
      };

      SlidesListLayout.prototype.onShowAddSlide = function() {
        return this.$el.find('.add-new-slide').show();
      };

      SlidesListLayout.prototype.regions = {
        slidesListRegion: '#slides-list-region',
        addSlideRegion: '#add-slide-region'
      };

      SlidesListLayout.prototype.onShowOrderUpdatedMsg = function() {
        this.$el.find('.alert').remove();
        return this.$el.prepend("<div class=\"alert alert-success\">" + _.polyglot.t("Updated successfully") + "</div>");
      };

      return SlidesListLayout;

    })(Marionette.Layout);
    App.commands.setHandler('show:slides:list', function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new SlidesListController(opts);
    });
    return App.commands.setHandler("show:slides:manager", function(slidesCollection) {
      return new SlidesListController({
        region: App.dialogRegion,
        collection: slidesCollection
      });
    });
  });
});
