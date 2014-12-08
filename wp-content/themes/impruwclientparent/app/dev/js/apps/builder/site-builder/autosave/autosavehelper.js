define(['app', 'jquery'], function(App, $) {
  var AutoSaveHelper;
  AutoSaveHelper = {
    getPageJson: function() {
      var $site, _json;
      if (!App.builderRegion || !App.builderRegion.$el) {
        return false;
      }
      $site = App.builderRegion.$el;
      _json = {};
      _.each(['header', 'page-content', 'footer'], (function(_this) {
        return function(section, index) {
          return _json["" + section + "-json"] = JSON.stringify(AutoSaveHelper.getJson($site.find("#site-" + section + "-region")));
        };
      })(this));
      return _json;
    },
    getJson: function($element, arr) {
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
                elements: AutoSaveHelper.getJson($(column))
              };
              ele.elements.push(col);
            });
          }
          if (ele.element === 'Tabs') {
            ele.draggable = $(element).children('form').find('input[name="draggable"]').val() === "true";
            ele.style = $(element).children('form').find('input[name="style"]').val();
            ele.justified = $(element).children('form').find('input[name="justified"]').val();
            delete ele.meta_id;
            ele.elements = [];
            _.each($(element).children('.element-markup').children('.tab-container').children('.tab-content').children('.column'), function(column, index) {
              var col, tabName;
              tabName = $(column).attr('data-name');
              col = {
                position: index + 1,
                element: 'TabPane',
                tabName: tabName,
                elements: AutoSaveHelper.getJson($(column))
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
                elements: AutoSaveHelper.getJson($(column).children('.panel-collapse').children('.column'))
              };
              ele.elements.push(col);
            });
          }
          return arr.push(ele);
        };
      })(this));
      return arr;
    }
  };
  return AutoSaveHelper;
});
