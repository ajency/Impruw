var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module("SiteBuilderApp.Revision.Views", function(Views, App) {
    var RevisionSingleView;
    RevisionSingleView = (function(_super) {
      __extends(RevisionSingleView, _super);

      function RevisionSingleView() {
        return RevisionSingleView.__super__.constructor.apply(this, arguments);
      }

      RevisionSingleView.prototype.template = '<div class="ui-slider-segment {{backup_type}}-backup" {{#notFirst}}style="margin-left: {{segmentGap}};"{{/notFirst}} data-toggle="tooltip" data-placement="top" title="{{author}} - {{post_modified}}"></div>';

      RevisionSingleView.prototype.mixinTemplateHelpers = function(data) {
        data = RevisionSingleView.__super__.mixinTemplateHelpers.call(this, data);
        data.notFirst = Marionette.getOption(this, 'notFirst');
        data.segmentGap = Marionette.getOption(this, 'segmentGap');
        return data;
      };

      RevisionSingleView.prototype.onRender = function() {
        this.$el = this.$el.children();
        this.$el.unwrap();
        return this.setElement(this.$el);
      };

      return RevisionSingleView;

    })(Marionette.ItemView);
    return Views.RevisionView = (function(_super) {
      __extends(RevisionView, _super);

      function RevisionView() {
        return RevisionView.__super__.constructor.apply(this, arguments);
      }

      RevisionView.prototype.template = '<div class="revision-container"> <h2 class="page-title">View Your Site History</h2> <p class="rev-desc">View the saved points in your site, and restore your page or entire site to that point from here.</p> <div class="revision-timeline"> <div id="slider" class="ui-slider"> </div> <a class="slider-button prev"><span class="bicon icon-uniF19C"></span></a> <a class="slider-button next"><span class="bicon icon-uniF19B"></span></a> </div> <div class="row timeline-actions"> <div class="col-sm-6 revision-info"> Version by Admin, 5 minutes ago <span class="time">15th Oct 2014 @ 13:41:21</span> </div> <div class="col-sm-6 revision-actions"> <button class="btn btn-sm cancel-view-history">Cancel</button> <button class="btn btn-sm aj-imp-orange-btn restore-revision-btn">Restore to this Version</button> </div> </div> <div class="revision-view row"> <div class="col-sm-12"> <iframe src="{{SITEURL}}" style="width : 100%; height: 400px;"></iframe> </div> </div> </div>';

      RevisionView.prototype.itemViewContainer = '#slider';

      RevisionView.prototype.itemView = RevisionSingleView;

      RevisionView.prototype.itemViewOptions = function(model, index) {
        var gap, notFirst, size;
        size = this.collection.size();
        gap = 100 / (size - 1) + "%";
        notFirst = index ? true : false;
        return {
          notFirst: notFirst,
          segmentGap: gap
        };
      };

      RevisionView.prototype.mixinTemplateHelpers = function(data) {
        data = RevisionView.__super__.mixinTemplateHelpers.call(this, data);
        data.SITEURL = SITEURL;
        return data;
      };

      RevisionView.prototype.events = {
        'click .cancel-view-history': function() {
          return this.trigger("close:revision");
        },
        'click .restore-revision-btn': function() {
          if (this.currentRevisionId) {
            return this.trigger('restore:revision', this.currentRevisionId);
          }
        }
      };

      RevisionView.prototype.initialize = function() {
        this.collection.comparator = 'ID';
        this.collection.sort();
        return this.currentRevisionId = 0;
      };

      RevisionView.prototype.onShow = function() {
        var $slider, lastRevision;
        this.$el.attr('id', 'revision-region');
        this.$el.show();
        $slider = this.$el.find('#slider');
        if ($slider.length > 0) {
          $slider.slider({
            min: 1,
            max: this.collection.size(),
            value: this.collection.size(),
            orientation: 'horizontal',
            range: false,
            change: (function(_this) {
              return function(event, ui) {
                var model;
                model = _this.collection.at(ui.value - 1);
                _this.currentRevisionId = model.id;
                return _this.$el.find('iframe').attr('src', "" + SITEURL + "/?revision=" + _this.currentRevisionId);
              };
            })(this)
          });
        }
        this.$el.find('.ui-slider-segment').tooltip();
        lastRevision = _.last(this.collection.toArray());
        this.currentRevisionId = lastRevision.id;
        return this.$el.find('iframe').attr('src', "" + SITEURL + "/?revision=" + this.currentRevisionId);
      };

      return RevisionView;

    })(Marionette.CompositeView);
  });
});
