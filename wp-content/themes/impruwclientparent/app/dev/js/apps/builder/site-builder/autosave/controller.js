var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.AutoSave', function(AutoSave, App, Backbone, Marionette, $, _) {
    window.SAVING = false;
    AutoSave.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opt) {
        if (opt == null) {
          opt = {};
        }
      };

      Controller.prototype.autoSave = function() {
        var options, siteRegion, _page_id, _sectionJson;
        if (window.SAVING === true) {
          return;
        }
        siteRegion = App.builderRegion.$el;
        _sectionJson = this._getPageJson(siteRegion);
        if (!_.isObject(_sectionJson)) {
          throw new Error("invalid json...");
        }
        _page_id = App.request("get:current:editable:page");
        options = {
          type: 'POST',
          url: AJAXURL,
          data: {
            action: 'auto-save',
            page_id: _page_id
          }
        };
        options.data = _.defaults(options.data, _sectionJson);
        window.SAVING = true;
        return $.ajax(options).done(function(response) {
          return window.SAVING = false;
        }).fail(function(resp) {
          return window.SAVING = false;
        });
      };

      Controller.prototype._getPageJson = function($site) {
        var _json;
        _json = {};
        _.each(['header', 'page-content', 'footer'], (function(_this) {
          return function(section, index) {
            return _json["" + section + "-json"] = JSON.stringify(_this._getJson($site.find("#site-" + section + "-region")));
          };
        })(this));
        return _json;
      };

      Controller.prototype._getJson = function($element, arr) {
        var elements;
        if (arr == null) {
          arr = [];
        }
        elements = $element.children('.element-wrapper');
        _.each(elements, (function(_this) {
          return function(element, index) {
            var ele;
            ele = {
              element: $(element).find('form input[name="element"]').val(),
              meta_id: parseInt($(element).find('form input[name="meta_id"]').val())
            };
            if (ele.element === 'Row') {
              ele.draggable = $(element).children('form').find('input[name="draggable"]').val() === "true";
              ele.style = $(element).children('form').find('input[name="style"]').val();
              delete ele.meta_id;
              ele.elements = [];
              _.each($(element).children('.element-markup').children('.row').children('.column'), function(column, index) {
                var className, col;
                className = $(column).attr('data-class');
                col = {
                  position: index + 1,
                  element: 'Column',
                  className: className,
                  elements: _this._getJson($(column))
                };
                ele.elements.push(col);
              });
            }
            return arr.push(ele);
          };
        })(this));
        return arr;
      };

      return Controller;

    })(Marionette.Controller);
    return App.commands.setHandler("unused:element:added", function(metaId, _page_id) {
      return $.ajax({
        type: 'POST',
        url: AJAXURL,
        data: {
          action: 'remove-unused-element',
          page_id: _page_id,
          element_meta_id: metaId
        },
        success: function() {
          return console.log("element removed from unused list");
        }
      });
    });
  });
});
