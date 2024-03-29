var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('MediaManager', function(MediaManager, App, Backbone, Marionette, $, _) {
    var API, OuterLayout, ShowController;
    MediaManager.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'media-manager': 'show'
      };

      return Router;

    })(Marionette.AppRouter);
    ShowController = (function(_super) {
      __extends(ShowController, _super);

      function ShowController() {
        return ShowController.__super__.constructor.apply(this, arguments);
      }

      ShowController.prototype.initialize = function(opt) {
        var layout;
        if (opt == null) {
          opt = {};
        }
        this.choosedMedia = null;
        _.defaults(opt, {
          type: 'all'
        });
        this.layout = layout = this._getLayout();
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            App.execute("start:media:upload:app", {
              region: layout.uploadRegion
            });
            return App.execute("start:media:grid:app", {
              region: layout.gridRegion,
              type: opt.type
            });
          };
        })(this));
        this.show(this.layout);
        this.listenTo(this.layout.gridRegion, "media:element:selected", (function(_this) {
          return function(media) {
            return _this.choosedMedia = media;
          };
        })(this));
        this.listenTo(this.layout.uploadRegion, "media:upload:complete", (function(_this) {
          return function() {
            return App.execute("start:media:grid:app", {
              region: _this.layout.gridRegion
            });
          };
        })(this));
        return this.listenTo(this.layout, "media:selected", (function(_this) {
          return function() {
            if (!_.isNull(_this.choosedMedia)) {
              App.vent.trigger("media:manager:choosed:media", _this.choosedMedia);
              return _this.region.closeDialog();
            }
          };
        })(this));
      };

      ShowController.prototype.onClose = function() {
        return App.navigate('/');
      };

      ShowController.prototype._getLayout = function() {
        return new OuterLayout;
      };

      return ShowController;

    })(AppController);
    OuterLayout = (function(_super) {
      __extends(OuterLayout, _super);

      function OuterLayout() {
        return OuterLayout.__super__.constructor.apply(this, arguments);
      }

      OuterLayout.prototype.template = '<ul class="nav nav-tabs"> <li class="active all-media-tab"><a href="#all-media-region" data-toggle="tab">{{#polyglot}}Gallery{{/polyglot}}</a></li> <li class="upload-tab"><a href="#upload-region" data-toggle="tab">{{#polyglot}}Upload{{/polyglot}}</a></li> <!--li: a(href="#gallery-region" data-toggle="tab") Gallery--> </ul> <div class="tab-content clearfix"> <div id="all-media-region" class="tab-pane active"> <div id="grid-region"></div> <!--<div id="edit-media-region" class="col-md-3">--> <!--<div class="pick-image"><span class="glyphicon glyphicon-hand-left"></span>--> <!--<h4>{{#polyglot}}Select from library{{/polyglot}}</h4>--> <!--</div>--> <!--</div>--> </div> <div id="upload-region" class="tab-pane"></div> <div id="gallery-region" class="tab-pane"></div> </div> <div class="media-select"> <button class="btn btn-default media-manager-select"><span class="glyphicon glyphicon-ok"></span>&nbsp;{{#polyglot}}Select{{/polyglot}}</button> </div>';

      OuterLayout.prototype.regions = {
        uploadRegion: '#upload-region',
        gridRegion: '#grid-region',
        editMediaRegion: '#edit-media-region'
      };

      OuterLayout.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Media Manager'),
        modal_size: 'wide-modal'
      };

      OuterLayout.prototype.events = {
        'click button.media-manager-select': function() {
          return this.trigger("media:selected");
        }
      };

      OuterLayout.prototype.onClose = function() {
        return App.vent.trigger("stop:listening:to:media:manager");
      };

      return OuterLayout;

    })(Marionette.Layout);
    API = {
      show: function(opt) {
        if (opt == null) {
          opt = {};
        }
        _.defaults(opt, {
          region: App.dialogRegion,
          statApp: 'all-media'
        });
        return new ShowController(opt);
      },
      editMedia: function(model, region) {}
    };
    MediaManager.on("start", function() {
      return new MediaManager.Router({
        controller: API
      });
    });
    MediaManager.on("stop", function() {
      return App.vent.off("media:element:clicked");
    });
    return App.commands.setHandler('start:media:app', function(opt) {
      if (opt == null) {
        opt = {};
      }
      return API.show(opt);
    });
  });
});
