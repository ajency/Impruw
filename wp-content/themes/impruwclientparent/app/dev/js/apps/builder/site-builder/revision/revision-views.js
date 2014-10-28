var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'bootbox'], function(App, bootbox) {
  return App.module("SiteBuilderApp.Revision.Views", function(Views, App) {
    var RevisionSingleView;
    RevisionSingleView = (function(_super) {
      __extends(RevisionSingleView, _super);

      function RevisionSingleView() {
        return RevisionSingleView.__super__.constructor.apply(this, arguments);
      }

      RevisionSingleView.prototype.template = '<div class="ui-slider-segment {{backup_type}}-backup" {{#notFirst}}style="margin-left: {{segmentGap}};"{{/notFirst}} data-toggle="tooltip" data-container=".revision-container" data-placement="top" data-title="{{author}} - {{post_modified}}"></div>';

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

      RevisionView.prototype.template = '<div class="revision-container"> <h2 class="page-title">View Your Site History</h2> <p class="rev-desc">View the saved points in your site, and restore your page or entire site to that point from here.</p> <div class="revision-timeline"> <div id="slider" class="ui-slider"> </div> <a class="slider-button prev"><span class="bicon icon-uniF19C"></span></a> <a class="slider-button next"><span class="bicon icon-uniF19B"></span></a> </div> <div class="row timeline-actions"> <div class="col-sm-6 revision-info"> <div class="revision-by">Published virsion</div> <span class="time"></span> </div> <div class="col-sm-6 revision-actions"> <button class="btn btn-default btn-sm cancel-view-history">Cancel</button> <button class="btn btn-default btn-sm aj-imp-orange-btn restore-revision-btn">Restore to this Version</button> </div> </div> <div class="revision-view"> <div id="IframeWrapper" style="position: relative;"> <div id="iframeBlocker" style="position: absolute; top: 0; left: 0; width:100% "></div> <iframe src="{{SITEURL}}/{{site}}" style="width : 100%; height: 400px;"></iframe> </div> </div> </div>';

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
        data.site = _.slugify(this.collection.at(0).get('post_title'));
        return data;
      };

      RevisionView.prototype.events = {
        'click .cancel-view-history': function() {
          this.trigger("close:revision");
          return $('body').removeClass('no-scroll');
        },
        'click .restore-revision-btn': function() {
          var currentRevisionModel, index, siteBackupId, siteRestoreModel;
          if (this.currentRevisionId === 0) {
            return false;
          }
          currentRevisionModel = this.collection.get(this.currentRevisionId);
          index = _.indexOf(this.collection.toArray(), currentRevisionModel);
          siteRestoreModel = this.collection.find((function(_this) {
            return function(model) {
              if (_.indexOf(_this.collection.toArray(), model) < index) {
                return false;
              } else {
                if (model.get('backup_type') === 'site') {
                  return true;
                }
              }
              return false;
            };
          })(this));
          siteBackupId = 0;
          if (siteRestoreModel) {
            siteBackupId = siteRestoreModel.get('site_backup_id');
            if (siteRestoreModel.id === this.currentRevisionId) {
              this.currentRevisionId = 0;
            }
          }
          if (this.currentRevisionId || siteBackupId) {
            return this.trigger('restore:revision', {
              revId: this.currentRevisionId,
              siteBackupId: siteBackupId
            });
          }
        },
        'click .slider-button.next': function() {
          if (this.sliderValue === 0) {
            this.sliderValue = this.collection.size();
          } else if (this.sliderValue === this.collection.size()) {
            return;
          } else {
            this.sliderValue += 1;
          }
          return this.$slider.slider("value", this.sliderValue);
        },
        'click .slider-button.prev': function() {
          if (this.sliderValue === 0) {
            this.sliderValue = this.collection.size();
          } else if (this.sliderValue === 1) {
            return;
          } else {
            this.sliderValue -= 1;
          }
          return this.$slider.slider("value", this.sliderValue);
        }
      };

      RevisionView.prototype.initialize = function() {
        this.collection.comparator = 'ID';
        this.collection.sort();
        this.currentRevisionId = 0;
        return this.sliderValue = 0;
      };

      RevisionView.prototype.onShow = function() {
        this.$el.attr('id', 'revision-region');
        this.$el.show();
        $('body').addClass('no-scroll');
        this.$slider = this.$el.find('#slider');
        if (this.$slider.length > 0) {
          this.$slider.slider({
            min: 1,
            max: this.collection.size(),
            value: this.collection.size(),
            orientation: 'horizontal',
            range: false,
            change: (function(_this) {
              return function(event, ui) {
                var childView, model;
                _this.sliderValue = ui.value;
                model = _this.collection.at(ui.value - 1);
                _this.currentRevisionId = model.id;
                if (_this._checkIfThemeChange(_this.currentRevisionId)) {
                  bootbox.confirm("This backup uses a different theme. The page is viewed using the current theme. If restored to this point will cause the site to be restored to the nearest theme change", function(result) {
                    if (result) {
                      return _this.changeIframe(_this.currentRevisionId);
                    }
                  });
                } else {
                  _this.changeIframe(_this.currentRevisionId);
                }
                _this.$el.find('.ui-slider-segment').removeClass('active');
                childView = _this.children.findByModel(model);
                return childView.$el.addClass('active');
              };
            })(this)
          });
        }
        this.$el.find('.ui-slider-segment').tooltip();
        return this.$el.find('iframe').load(function() {
          this.style.height = this.contentWindow.document.body.offsetHeight + 10 + 'px';
          return $("#iframeBlocker").height(this.style.height);
        });
      };

      RevisionView.prototype._checkIfThemeChange = function(revisionId) {
        if (CURRENTTHEME !== _.slugify(this.collection.get(revisionId).get('page_theme'))) {
          return true;
        } else {
          return false;
        }
      };

      RevisionView.prototype.changeIframe = function(revisionId) {
        var currentRevisionModel, days, hours, milliseconds, minutes, seconds, timeElapsed;
        this.$el.find('iframe').attr('src', "" + SITEURL + "/?revision=" + revisionId);
        currentRevisionModel = this.collection.get(revisionId);
        this.$el.find('.revision-info .time').text(currentRevisionModel.get('post_date'));
        milliseconds = new Date() - (new Date(currentRevisionModel.get('post_date')));
        seconds = parseInt((milliseconds / 1000) % 60);
        minutes = parseInt((milliseconds / (1000 * 60)) % 60);
        hours = parseInt((milliseconds / (1000 * 60 * 60)) % 24);
        days = parseInt((milliseconds / (1000 * 60 * 60 * 24)) % 7);
        if (days > 1) {
          timeElapsed = "" + days + " days ago";
        } else if (days === 1) {
          timeElapsed = "1 day ago";
        } else if (hours > 1) {
          timeElapsed = "" + hours + " hours ago";
        } else if (hours === 1) {
          timeElapsed = "1 hour ago";
        } else if (minutes > 1) {
          timeElapsed = "" + minutes + " minutes ago";
        } else if (minutes === 1) {
          timeElapsed = "1 minute ago";
        } else if (seconds) {
          timeElapsed = "" + seconds + " seconds ago";
        }
        return this.$el.find('.revision-info .revision-by').text("Version by " + (currentRevisionModel.get('author')) + ", " + timeElapsed);
      };

      return RevisionView;

    })(Marionette.CompositeView);
  });
});
