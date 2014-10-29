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

      RevisionSingleView.prototype.template = '<div class="ui-slider-segment {{backup_type}}-backup {{theme_slug}}" {{#notFirst}}style="margin-left: {{segmentGap}};"{{/notFirst}} data-toggle="tooltip" title="{{author}} - {{date}} ,   Theme : {{page_theme}}"></div>';

      RevisionSingleView.prototype.mixinTemplateHelpers = function(data) {
        var dateGMT;
        data = RevisionSingleView.__super__.mixinTemplateHelpers.call(this, data);
        data.notFirst = Marionette.getOption(this, 'notFirst');
        data.segmentGap = Marionette.getOption(this, 'segmentGap');
        data.theme_slug = _.slugify(data.page_theme);
        dateGMT = new Date(data.post_date + ' UTC ');
        data.date = dateGMT.toLocaleString();
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

      RevisionView.prototype.template = '<div class="revision-container"> <h2 class="page-title">View Your Site History</h2> <p class="rev-desc">View the saved points in your site, and restore your page or entire site to that point from here.</p> <div class="revision-timeline"> <div id="slider" class="ui-slider"></div> </div> <div class="row timeline-actions"> <div class="col-sm-6 revision-info"> <div class="revision-by">Published Version</div> <span class="time"></span> <div class="revision-theme"></div> </div> <div class="col-sm-6 revision-actions"> <button class="btn btn-default btn-sm cancel-view-history">Cancel</button> <button class="btn btn-default btn-sm aj-imp-orange-btn restore-revision-btn">Restore to this Version</button> </div> </div> <div class="revision-view"> <div id="IframeWrapper" style="position: relative;"> <div id="iframeBlocker" style="position: absolute; top: 0; left: 0; width:100% "></div> <iframe src="{{SITEURL}}/{{site}}" style="width : 100%; height: 400px;" scrolling="no" seamless="seamless"></iframe> </div> </div> </div>';

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
          var index, siteBackupId, siteRestoreModel;
          if (!this.currentRevisionModel) {
            return false;
          }
          index = _.indexOf(this.collection.toArray(), this.currentRevisionModel);
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
            if (siteRestoreModel.id === this.currentRevisionModel.id) {
              this.currentRevisionModel.id = 0;
            }
          }
          if (this.currentRevisionModel.id || siteBackupId) {
            return this.trigger('restore:revision', {
              revId: this.currentRevisionModel.id,
              siteBackupId: siteBackupId
            });
          }
        }
      };

      RevisionView.prototype.initialize = function() {
        this.collection.comparator = 'ID';
        this.collection.sort();
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
                var childView;
                _this.currentRevisionModel = _this.collection.at(ui.value - 1);
                if (_this._checkIfThemeChange()) {
                  bootbox.confirm("This backup uses a different theme. The page is viewed using the current theme. If restored to this point will cause the site to be restored to the nearest theme change", function(result) {
                    if (result) {
                      _this.changeIframe();
                      return _this.sliderValue = ui.value;
                    } else {
                      if (_this.sliderValue) {
                        return _this.$slider.slider("value", _this.sliderValue);
                      }
                    }
                  });
                } else {
                  _this.sliderValue = ui.value;
                  _this.changeIframe();
                }
                _this.$el.find('.ui-slider-segment').removeClass('active');
                childView = _this.children.findByModel(_this.currentRevisionModel);
                return childView.$el.addClass('active');
              };
            })(this)
          });
        }
        this.$el.find('.ui-slider-segment').tooltip({
          placement: "top",
          container: ".revision-container"
        });
        return this.$el.find('iframe').load(function() {
          console.log('iframe load');
          this.style.height = this.contentWindow.document.body.offsetHeight + 10 + 'px';
          return $("#iframeBlocker").height(this.style.height);
        });
      };

      RevisionView.prototype._checkIfThemeChange = function() {
        if (CURRENTTHEME !== _.slugify(this.currentRevisionModel.get('page_theme'))) {
          return true;
        } else {
          return false;
        }
      };

      RevisionView.prototype.changeIframe = function() {
        var dateGMT, timeElapsed;
        this.$el.find('iframe').attr('src', "" + SITEURL + "/?revision=" + this.currentRevisionModel.id);
        dateGMT = new Date(this.currentRevisionModel.get('post_date') + ' UTC ');
        this.$el.find('.revision-info .time').text(dateGMT.toLocaleString());
        timeElapsed = moment(dateGMT).fromNow();
        this.$el.find('.revision-info .revision-by').text("Version by " + (this.currentRevisionModel.get('author')) + ", " + timeElapsed);
        return this.$el.find('.revision-info .revision-theme').text("Theme : " + (this.currentRevisionModel.get('page_theme')));
      };

      return RevisionView;

    })(Marionette.CompositeView);
  });
});
