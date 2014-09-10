define(['app'], function(App) {
  return App.module('SiteBuilderApp.AutoSave', function(AutoSave, App, Backbone, Marionette, $, _) {
    var $document, AutoSaveAPI, AutoSaveLocal, AutoSaveServer, getJson, getPageJson;
    $document = $(document);
    AutoSaveLocal = (function() {
      function AutoSaveLocal() {
        this.hasSupport = this.checkLocalStorgeSupport();
      }

      AutoSaveLocal.prototype.checkLocalStorgeSupport = function() {
        var error, result, test;
        test = Math.random().toString();
        result = false;
        try {
          window.sessionStorage.setItem('wp-test', test);
          result = window.sessionStorage.getItem('wp-test') === test;
          window.sessionStorage.removeItem('wp-test');
        } catch (_error) {
          error = _error;
        }
        return result;
      };

      return AutoSaveLocal;

    })();
    AutoSaveServer = (function() {
      function AutoSaveServer() {}

      return AutoSaveServer;

    })();
    AutoSaveAPI = (function() {
      function AutoSaveAPI() {
        this.$el = App.builderRegion.$el;
        this.lastTriggerSave = 0;
        this.local = new AutoSaveLocal;
        this.server = new AutoSaveServer;
        console.log(this.local.hasSupport);
      }

      AutoSaveAPI.prototype.getPageJSON = function() {
        var json;
        json = getPageJson(siteRegion);
        return json;
      };

      return AutoSaveAPI;

    })();
    getPageJson = function($site) {
      var _json;
      _json = {};
      _.each(['header', 'page-content', 'footer'], (function(_this) {
        return function(section, index) {
          return _json["" + section + "-json"] = JSON.stringify(getJson($site.find("#site-" + section + "-region")));
        };
      })(this));
      return _json;
    };
    getJson = function($element, arr) {
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
                elements: getJson($(column))
              };
              ele.elements.push(col);
            });
          }
          return arr.push(ele);
        };
      })(this));
      return arr;
    };
    return App.commands.setHandler("autosave-api", function() {
      return new AutoSaveAPI;
    });
  });
});
