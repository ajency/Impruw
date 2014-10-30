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

      RevisionSingleView.prototype.template = '<div class="ui-slider-segment {{backup_type}}-backup {{theme_slug}}" {{#notFirst}}style="padding-left: {{segmentGap}};"{{/notFirst}}><span class="marker" data-toggle="tooltip" title="{{author}} - {{date}} ,   Theme : {{page_theme}}"></span></div>';

      RevisionSingleView.prototype.mixinTemplateHelpers = function(data) {
        var dateGMT;
        data = RevisionSingleView.__super__.mixinTemplateHelpers.call(this, data);
        data.notFirst = Marionette.getOption(this, 'notFirst');
        data.segmentGap = Marionette.getOption(this, 'segmentGap');
        data.theme_slug = _.slugify(data.page_theme);
        data.post_date = data.post_date.replace(/-/g, '/');
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

      RevisionView.prototype.template = '<div class="revision-container"> <h2 class="page-title">View Your Site History</h2> <div style="text-align : center;">Page name : {{post_title}}</div> <div style="text-align : center;">Number of revisions : {{size}}</div> <p class="rev-desc">View the saved points in your site, and restore your page or entire site to that point from here.</p> <div class="revision-timeline"> <div id="slider" class="ui-slider"></div> </div> <div class="row timeline-actions"> <div class="col-sm-6 revision-info"> <div class="revision-by">Published Version</div> <div class="revision-theme"></div> </div> <div class="col-sm-6 revision-actions"> <button class="btn btn-default btn-sm cancel-view-history">Cancel</button> <button class="btn btn-default btn-sm aj-imp-orange-btn restore-revision-btn hidden">Restore to this Version</button> </div> </div> <div class="revision-view"> <div id="IframeWrapper" style="position: relative;"> <div id="iframeBlocker" style="position: absolute; top: 0; left: 0; width:100% "></div> <iframe src="{{SITEURL}}/{{site}}/?no_header=true" style="width : 100%; height: 400px;" scrolling="no" seamless="seamless"></iframe> </div> </div> </div>';

      RevisionView.prototype.itemViewContainer = '#slider';

      RevisionView.prototype.itemView = RevisionSingleView;

      RevisionView.prototype.itemViewOptions = function(model, index) {
        var notFirst, size;
        size = this.collection.size() + 1;
        this.gap = 100 / (size - 1) + "%";
        notFirst = index ? true : false;
        return {
          notFirst: notFirst,
          segmentGap: this.gap
        };
      };

      RevisionView.prototype.mixinTemplateHelpers = function(data) {
        data = RevisionView.__super__.mixinTemplateHelpers.call(this, data);
        data.SITEURL = SITEURL;
        data.site = _.slugify(this.collection.at(0).get('post_title'));
        data.post_title = this.collection.at(0).get('post_title');
        data.size = this.collection.size();
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
        return this.collection.sort();
      };

      RevisionView.prototype.onShow = function() {
        this.$el.attr('id', 'revision-region');
        this.$el.find('#slider').append("<div class='ui-slider-segment page-backup " + CURRENTTHEME + "' style='padding-left: " + this.gap + ";'><span class='marker' data-toggle='tooltip' title='Published Version'></span></div>");
        this.$el.show();
        $('body').addClass('no-scroll');
        this.$slider = this.$el.find('#slider');
        if (this.$slider.length > 0) {
          this.$slider.slider({
            min: 1,
            max: this.collection.size() + 1,
            value: this.collection.size() + 1,
            orientation: 'horizontal',
            range: false,
            change: (function(_this) {
              return function(event, ui) {
                var childView, max;
                max = _this.$slider.slider("option", "max");
                if (ui.value === max) {
                  _this.changeIframeToPublished();
                  _this.$el.find('.ui-slider-segment').removeClass('active');
                  _this.$el.find('.ui-slider-segment').last().addClass('active');
                  return;
                }
                _this.currentRevisionModel = _this.collection.at(ui.value - 1);
                if (_this._checkIfThemeChange()) {
                  bootbox.alert(" You had used a different theme here. If you restore to this point, the theme will be applied across all the pages in the website. You may lose your current layout, although you can recover the lost elements from our unused elements toolbox on the site builder");
                }
                _this.changeIframe();
                _this.$el.find('.ui-slider-segment').removeClass('active');
                childView = _this.children.findByModel(_this.currentRevisionModel);
                childView.$el.addClass('active');
                return _this.$el.find('.restore-revision-btn').removeClass('hidden');
              };
            })(this)
          });
        }
        _.delay((function(_this) {
          return function() {
            return _this.$el.find('#slider .marker').tooltip({
              placement: "top",
              container: ".revision-container"
            });
          };
        })(this), 1000);
        this.$el.find('iframe').load(function() {
          this.style.height = this.contentWindow.document.body.offsetHeight + 10 + 'px';
          return $("#iframeBlocker").height(this.style.height);
        });
        return this.trigger('after:show');
      };

      RevisionView.prototype._checkIfThemeChange = function() {
        if (CURRENTTHEME !== _.slugify(this.currentRevisionModel.get('page_theme'))) {
          return true;
        } else {
          return false;
        }
      };

      RevisionView.prototype.changeIframeToPublished = function() {
        this.$el.find('iframe').attr('src', "" + SITEURL + "/" + (_.slugify(this.collection.at(0).get('post_title'))) + "/?no_header=true");
        this.$el.find('.revision-info .revision-by').text("Published Version");
        this.$el.find('.revision-info .revision-theme').text("Theme : " + CURRENTTHEME);
        return this.$el.find('.restore-revision-btn').addClass('hidden');
      };

      RevisionView.prototype.changeIframe = function() {
        var dateGMT, timeElapsed;
        this.$el.find('iframe').attr('src', "" + SITEURL + "/?revision=" + this.currentRevisionModel.id + "&no_header=true");
        dateGMT = new Date(this.currentRevisionModel.get('post_date').replace(/-/g, '/') + ' UTC ');
        timeElapsed = moment(dateGMT).fromNow();
        this.$el.find('.revision-info .revision-by').text("Revision at " + timeElapsed);
        return this.$el.find('.revision-info .revision-theme').text("Theme : " + (this.currentRevisionModel.get('page_theme')));
      };

      RevisionView.prototype.onShowRevisionWithId = function(revisionId) {
        var index, model;
        if (revisionId === 0) {
          return this.$slider.slider("value", this.$slider.slider("option", "max"));
        } else {
          model = this.collection.get(revisionId);
          index = _.indexOf(this.collection.toArray(), model);
          return this.$slider.slider("value", index + 1);
        }
      };

      return RevisionView;

    })(Marionette.CompositeView);
  });
});
