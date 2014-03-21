require.config({
  urlArgs: "ver=" + ((new Date()).getTime()),
  baseUrl: 'http://localhost/impruw/wp-content/themes/impruwclientparent/app/dev/js/',
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
    bootbox: 'plugins/bootbox.min',
    holder: 'plugins/holder',
    mustache: 'plugins/Mustache',
    bootstrapselect: 'plugins/bootstrapselect',
    underscorestring: 'plugins/underscore.string',
    radio: 'plugins/flatui-radio',
    cookie: 'plugins/cookie.min',
    checkbox: 'plugins/flatui-checkbox',
    ckeditor: 'plugins/ckeditor',
    backboneform: 'plugins/backbone.form',
    backbonesyphon: 'plugins/backbone.syphon',
    backboneassociations: 'plugins/backbone.associations',
    nestedsortable: 'plugins/nested.sortable',
    jqueryvalidate: 'plugins/jquery.validate',
    isotope: 'plugins/isotope',
    plupload: 'plugins/plupload.full',
    themepunch: 'plugins/themepunch.plugins.min',
    revslider: 'plugins/revolution.min',
    googlemap: 'https://maps.googleapis.com/maps/api/js?sensor=false',
    pluginloader: 'plugins/builder-plugin-loader',
    appsloader: 'apps/builder-apps-loader',
    configloader: 'configs/builder-config-loader',
    entitiesloader: 'entities/builder-entities-loader',
    componentloader: 'components/builder-component-loader',
    app: 'builder-app'
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
    googlemap: {
      exports: 'google'
    },
    holder: 'Holder',
    jqueryvalidate: ['jquery'],
    underscorestring: ['underscore'],
    backboneform: ['backbone'],
    backbonesyphon: ['backbone'],
    backbonerelational: ['backbone'],
    backboneassociations: ['backbone'],
    jqueryspin: ['spin'],
    bootstrap: ['jquery'],
    themepunch: ['jquery'],
    isotope: ['jquery'],
    revslider: ['themepunch'],
    plupload: {
      deps: ['jquery'],
      exports: 'plupload'
    },
    cookie: ['jquery'],
    nestedsortable: ['jqueryui'],
    radio: ['bootstrap'],
    checkbox: ['bootstrap'],
    bootstrapselect: ['bootstrap'],
    bootbox: {
      deps: ['bootstrap'],
      exports: 'bootbox'
    },
    app: ['pluginloader', 'configloader']
  },
  tpl: {
    extension: '.html'
  }
});

require(['pluginloader', 'configloader', 'app', 'entitiesloader', 'controllers/base-controller', 'controllers/builder-base-controller', 'componentloader', 'appsloader'], function(plugins, configs, App) {
  jQuery('#initial-loader').remove();
  return App.start();
});
