var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/site-profile/edit/views', 'entities/site'], function(App, AppController) {
  return App.module('SiteProfileApp.Edit', function(Edit, App, Backbone, Marionette, $, _) {
    return Edit.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.siteProfileSuccess = __bind(this.siteProfileSuccess, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        return this.siteProfile = App.request("get:site:model");
      };

      Controller.prototype.showSiteProfile = function() {
        this.view = this.getMainView(this.siteProfile);
        App.vent.trigger("set:active:menu", 'site-profile');
        this.show(this.view, {
          loading: true
        });
        this.listenTo(this.view, "save:site:profile", this.saveSiteProfile);
        this.listenTo(this.view, "show:media:manager", (function(_this) {
          return function(ele) {
            App.execute('start:media:app', {
              type: ele
            });
            _this.listenTo(App.vent, "media:manager:choosed:media", function(media) {
              if (ele === 'logo') {
                _this.view.triggerMethod("set:logo", media);
              } else if (ele === 'favicon') {
                _this.view.triggerMethod('set:favicon', media);
              }
              return _this.stopListening(App.vent, "media:manager:choosed:media");
            });
            return _this.listenTo(App.vent, "stop:listening:to:media:manager", function() {
              return _this.stopListening(App.vent, "media:manager:choosed:media");
            });
          };
        })(this));
        return this.listenTo(this.view, "update:domain:mapping:name", this.addDomainNameForMapping);
      };

      Controller.prototype.saveSiteProfile = function(data) {
        this.siteProfile.set(data);
        return this.siteProfile.save(null, {
          wait: true,
          onlyChanged: true,
          success: this.siteProfileSuccess
        });
      };

      Controller.prototype.getMainView = function(model) {
        return new Edit.View.MainView({
          model: model
        });
      };

      Controller.prototype.siteProfileSuccess = function() {
        return this.view.triggerMethod("site:profile:added");
      };

      Controller.prototype.addDomainNameForMapping = function(domainName) {
        var options;
        options = {
          method: 'POST',
          url: AJAXURL,
          data: {
            'name': domainName,
            'action': 'update-domain-name'
          }
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            if (response.code === "OK") {
              window.DOMAIN_NAME = domainName;
              return _this.view.triggerMethod("domain:update", "Domain added succesfully");
            } else {
              return _this.view.triggerMethod("domain:update", response.msg);
            }
          };
        })(this));
      };

      return Controller;

    })(AppController);
  });
});
