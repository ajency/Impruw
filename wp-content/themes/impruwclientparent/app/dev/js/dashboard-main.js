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
    moment: 'plugins/moment',
    jqueryspin: 'plugins/jquery.spin',
    bootstrap: 'plugins/bootstrap',
    bootbox: 'plugins/bootbox.min',
    bootstrapselect: 'plugins/bootstrapselect',
    underscorestring: 'plugins/underscore.string',
    mustache: 'plugins/Mustache',
    plupload: 'plugins/plupload.full',
    datepicker: 'plugins/datepicker',
    isotope: 'plugins/isotope',
    lightbox: 'plugins/lightbox',
    radiocheck: 'plugins/flatui-radiocheck',
    radio: 'plugins/flatui-radio',
    checkbox: 'plugins/flatui-checkbox',
    backboneform: 'plugins/backbone.form',
    backbonesyphon: 'plugins/backbone.syphon',
    backboneassociations: 'plugins/backbone.associations',
    jqueryvalidate: 'plugins/jquery.validate',
    polyglot: 'plugins/polyglot',
    chart: 'plugins/chart',
    app: 'dashboard-app',
    bootstrapswitch: 'plugins/bootstrap-switch',
    jpanelmenu: 'plugins/jquery.jpanelmenu.min',
    scrollsections: 'plugins/ajency.scrolldots',
    minicolors: 'plugins/jquery.minicolors.min',
    additionalmethod: 'plugins/validate.additional.methods',
    timepicker: 'plugins/jquery.timepicker.min',
    braintree: 'plugins/braintree',
    imageareaselect: '../../../../../wp-includes/js/imgareaselect/jquery.imgareaselect.min',
    imageedit: '../../../../../wp-admin/js/image-edit',
    json2: '../../../../../wp-includes/js/json2',
    svgpainter: '../../../../../wp-admin/js/svg-painter',
    heartbeat: '../../../../../wp-includes/js/heartbeat',
    jqueryuii18n: 'plugins/jquery-ui-i18n'
  },
  shim: {
    imageedit: ['jquery', 'json2', 'imageareaselect'],
    imageareaselect: ['jquery'],
    svgpainter: ['jquery'],
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
    jqueryvalidate: ['jquery'],
    datepicker: ['jquery'],
    scrollsections: ['jquery'],
    jpanelmenu: ['jquery'],
    minicolors: ['jquery'],
    timepicker: ['jquery'],
    braintree: ['jquery'],
    additionalmethod: ['jquery', 'jqueryvalidate'],
    underscorestring: ['underscore'],
    backboneform: ['backbone'],
    backbonesyphon: ['backbone'],
    backboneassociations: ['backbone'],
    isotope: ['jquery'],
    lightbox: ['jquery'],
    jqueryspin: ['spin'],
    bootstrap: ['jquery'],
    bootbox: {
      deps: ['bootstrap'],
      exports: 'bootbox'
    },
    heartbeat: ['jquery'],
    radiocheck: ['bootstrap'],
    radio: ['bootstrap'],
    checkbox: ['bootstrap'],
    bootstrapselect: ['bootstrap'],
    bootstrapswitch: ['bootstrap'],
    jqueryuii18n: ['jquery', 'jqueryui'],
    app: ['plugins/dashboard-plugin-loader', 'configs/dashboard-config-loader']
  }
});

require(['plugins/dashboard-plugin-loader', 'configs/dashboard-config-loader', 'app', 'entities/dashboard-entities-loader', 'controllers/base-controller', 'components/dashboard-component-loader', 'apps/dashboard-apps-loader'], function(plugins, configs, App) {
  return App.start();
});
