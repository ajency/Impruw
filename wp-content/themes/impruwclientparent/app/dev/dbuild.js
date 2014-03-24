({
  baseUrl: './js',
  name: 'plugins/almond',
  include : 'dashboard-main',
  //optimize: 'none',
  wrap: false,
  out: '../production/dashboard-main.js',
  paths: {
    jquery: 'plugins/jquery',
    jqueryui: 'plugins/jquery.ui',
    underscore: 'plugins/underscore',
    backbone: 'plugins/backbone',
    marionette: 'plugins/backbone.marionette',
    tpl: 'plugins/tpl',
    text: 'plugins/text',
    spin: 'plugins/spin',
    jqueryspin: 'plugins/jquery.spin',
    bootstrap: 'plugins/bootstrap',
    moment: 'plugins/moment',
    bootstrapselect: 'plugins/bootstrapselect',
    underscorestring: 'plugins/underscore.string',
    mustache: 'plugins/Mustache',
    plupload: 'plugins/plupload.full',
    d3: 'plugins/d3.v3',
    nvd3: 'plugins/nv.d3',
    radio: 'plugins/flatui-radio',
    checkbox: 'plugins/flatui-checkbox',
    backboneform: 'plugins/backbone.form',
    backbonesyphon: 'plugins/backbone.syphon',
    backboneassociations: 'plugins/backbone.associations',
    jqueryvalidate: 'plugins/jquery.validate',
    polyglot: 'plugins/polyglot',
    app: 'dashboard-app',
    bootstrapswitch: 'plugins/bootstrap-switch',
    entitiesloader: 'entities/dashboard-entities-loader'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    jquery: ['underscore'],
    jqueryui: ['jquery'],
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    marionette: {
      deps: ['backbone'],
      exports: 'Marionette'
    },
    polyglot: {
      exports: 'Polyglot'
    },
    plupload: {
      deps: ['jquery'],
      exports: 'plupload'
    },
    nvd3: {
      deps: ['d3'],
      exports: 'nv'
    },
    jqueryvalidate: ['jquery'],
    underscorestring: ['underscore'],
    backboneform: ['backbone'],
    backbonesyphon: ['backbone'],
    backboneassociations: ['backbone'],
    jqueryspin: ['spin'],
    bootstrap: ['jquery'],
    radio: ['bootstrap'],
    checkbox: ['bootstrap'],
    bootstrapselect: ['bootstrap'],
    bootstrapswitch: ['bootstrap'],
    app: ['plugins/plugin-loader', 'configs/config-loader']
  },
})
