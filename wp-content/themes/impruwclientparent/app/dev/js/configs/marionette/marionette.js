var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette', 'mustache', 'underscore'], function(Marionette, Mustache, _) {
  _.extend(Marionette.Application.prototype, {
    navigate: function(route, options) {
      if (options == null) {
        options = {};
      }
      return Backbone.history.navigate(route, options);
    },
    getCurrentRoute: function() {
      var frag;
      frag = Backbone.history.fragment;
      if (_.isEmpty(frag)) {
        return null;
      } else {
        return frag;
      }
    },
    startHistory: function() {
      if (Backbone.history) {
        return Backbone.history.start();
      }
    },
    register: function(instance, id) {
      if (this._registry == null) {
        this._registry = {};
      }
      return this._registry[id] = instance;
    },
    unregister: function(instance, id) {
      return delete this._registry[id];
    },
    resetRegistry: function() {
      var controller, key, msg, oldCount, _ref;
      oldCount = this.getRegistrySize();
      _ref = this._registry;
      for (key in _ref) {
        controller = _ref[key];
        controller.region.close();
      }
      msg = "There were " + oldCount + " controllers in the registry, there are now " + (this.getRegistrySize());
      if (this.getRegistrySize() > 0) {
        return console.warn(msg, this._registry);
      } else {
        return console.log(msg);
      }
    },
    getRegistrySize: function() {
      return _.size(this._registry);
    },
    registerElement: function(instance, id) {
      if (this._elementRegistry == null) {
        this._elementRegistry = {};
      }
      return this._elementRegistry[id] = instance;
    },
    unregisterElement: function(instance, id) {
      return delete this._elementRegistry[id];
    },
    resetElementRegistry: function() {
      var controller, key, msg, oldCount, _ref;
      oldCount = this.getElementRegistrySize();
      _ref = this._elementRegistry;
      for (key in _ref) {
        controller = _ref[key];
        controller.layout.close();
      }
      msg = "There were " + oldCount + " controllers in the registry, there are now " + (this.getElementRegistrySize());
      if (this.getElementRegistrySize() > 0) {
        return console.warn(msg, this._elementRegistry);
      } else {
        return console.log(msg);
      }
    },
    getElementRegistrySize: function() {
      return _.size(this._elementRegistry);
    }
  });
  _.extend(Marionette.Region.prototype, {
    hide: function() {
      return this.$el.hide();
    },
    unhide: function() {
      return this.$el.show();
    }
  });
  Marionette.Renderer.render = function(template, data) {
    if (!template) {
      template = '';
    }
    if (typeof template === "function") {
      template = template();
    }
    return Mustache.to_html(template, data);
  };
  Marionette.View.prototype.mixinTemplateHelpers = function(target) {
    var templateHelpers;
    target = target || {};
    target.polyglot = function() {
      return function(argument, renderer) {
        return renderer(_.polyglot.t(argument));
      };
    };
    templateHelpers = Marionette.getOption(this, "templateHelpers");
    if (_.isFunction(templateHelpers)) {
      templateHelpers = templateHelpers.call(this);
    }
    return _.extend(target, templateHelpers);
  };
  Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
    var err, msg, template;
    template = templateId;
    if (!template || template.length === 0) {
      msg = "Could not find template: '" + templateId + "'";
      err = new Error(msg);
      err.name = "NoTemplateError";
      throw err;
    }
    return template;
  };
  Marionette._ctrl = {};
  Marionette.run = function(options) {
    var CtrlClass;
    CtrlClass = Marionette._ctrl[options['ctrl']];
    return new CtrlClass({
      region: options['region'],
      options: options['args']
    });
  };
  return Marionette.FormView = (function(_super) {
    __extends(FormView, _super);

    function FormView() {
      return FormView.__super__.constructor.apply(this, arguments);
    }

    FormView.prototype.tagName = 'form';

    FormView.prototype.className = 'form-horizontal';

    FormView.prototype.onShow = function() {
      return this.$el.validate();
    };

    return FormView;

  })(Marionette.ItemView);
});
