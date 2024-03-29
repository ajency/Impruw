var __slice = [].slice;

define(['underscore', 'underscorestring'], function(_) {
  _.templateSettings = {
    evaluate: /\{\[([\s\S]+?)\]\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g
  };
  _.mixin(_.str.exports());
  return _.mixin({
    logAppMsg: function() {
      var msg;
      msg = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return _.each(arguments, function(l, index) {
        return console.log(l);
      });
    },
    logAppErr: function() {
      var msg;
      msg = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return _.each(arguments, function(l, index) {
        return console.log(l);
      });
    },
    idOrder: function(arr) {
      var newArray;
      newArray = [];
      _.each(arr, function(ele, index) {
        var i;
        i = ele.split('-');
        return newArray.push(parseInt(i[1]));
      });
      return newArray;
    },
    makeid: function() {
      var i, possible, text, _i;
      text = "";
      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (i = _i = 0; _i < 8; i = ++_i) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
    stripslashes: function(str) {
      if (!_.isString(str)) {
        return str;
      }
      return str.replace(/\\/g, '');
    }
  });
});
