var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Publish', function(Publish, App, Backbone, Marionette, $, _) {
    window.SAVING = false;
    return Publish.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.publish = function() {
        var options, siteRegion, _page_id, _sectionJson;
        if (window.SAVING === true) {
          return;
        }
        siteRegion = App.builderRegion.$el;
        _sectionJson = this._getPageJson(siteRegion);
        if (!_.isObject(_sectionJson)) {
          throw new Error("invalid json...");
        }
        _page_id = App.request("get:original:editable:page");
        options = {
          type: 'POST',
          url: AJAXURL,
          data: {
            action: 'publish-page',
            page_id: _page_id,
            instance_id: App.instanceId
          }
        };
        options.data = _.defaults(options.data, _sectionJson);
        window.SAVING = true;
        return $.ajax(options).done(function(response) {
          if (response.success === true) {
            App.execute("update:revision:on:published", response.revision);
            return App.vent.trigger("page:published");
          } else if (response.success === false && response.new_instance) {
            return App.vent.trigger("new:instance:opened", response);
          } else {
            return App.vent.trigger("publish:failed", response.reason);
          }
        }).always(function(resp) {
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
            if (ele.element === 'Tabs') {
              ele.draggable = $(element).children('form').find('input[name="draggable"]').val() === "true";
              ele.style = $(element).children('form').find('input[name="style"]').val();
              ele.justified = $(element).children('form').find('input[name="justified"]').val();
              ele.meta_id = $(element).find('form input[name="meta_id"]').val();
              ele.elements = [];
              _.each($(element).children('.element-markup').children('.tab-container').children('.tab-content').children('.column'), function(column, index) {
                var col, id, tabName;
                id = $(column).attr('id');
                tabName = {};
                $(element).children('.element-markup').children('.tab-container').find("form[data-id=" + id + "] input").each(function(index, input) {
                  return tabName[$(input).prop('name')] = $(input).val();
                });
                col = {
                  position: index + 1,
                  element: 'TabPane',
                  tabName: tabName,
                  elements: _this._getJson($(column))
                };
                ele.elements.push(col);
              });
            }
            if (ele.element === 'Accordion') {
              ele.draggable = $(element).children('form').find('input[name="draggable"]').val() === "true";
              ele.style = $(element).children('form').find('input[name="style"]').val();
              ele.meta_id = $(element).find('form input[name="meta_id"]').val();
              ele.elements = [];
              _.each($(element).children('.element-markup').children('.accordion-container').children('.panel-group').children('.panel'), function(column, index) {
                var col, tabName;
                tabName = {};
                $(column).children('.panel-heading').find('form input').each(function(index, input) {
                  return tabName[$(input).prop('name')] = $(input).val();
                });
                col = {
                  position: index + 1,
                  element: 'AccordionTab',
                  tabName: tabName,
                  elements: _this._getJson($(column).children('.panel-collapse').children('.column'))
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
  });
});
