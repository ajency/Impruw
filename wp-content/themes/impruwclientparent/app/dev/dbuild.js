({
    baseUrl: './js',
    name: 'plugins/almond',
    include: 'dashboard-main',
    exclude: ['ckeditor'],
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
        chart: 'plugins/chart',
        isotope: 'plugins/isotope',
        radio: 'plugins/flatui-radio',
        checkbox: 'plugins/flatui-checkbox',
        backboneform: 'plugins/backbone.form',
        backbonesyphon: 'plugins/backbone.syphon',
        backboneassociations: 'plugins/backbone.associations',
        jqueryvalidate: 'plugins/jquery.validate',
        polyglot: 'plugins/polyglot',
        lightbox : 'plugins/lightbox',
        app: 'dashboard-app',
        jpanelmenu: 'plugins/jquery.jpanelmenu.min',
        bootstrapswitch: 'plugins/bootstrap-switch',
        entitiesloader: 'entities/dashboard-entities-loader',
        scrollsections: 'plugins/ajency.scrolldots',
        minicolors: 'plugins/jquery.minicolors.min',
        additionalmethod: 'plugins/validate.additional.methods',
        timepicker: 'plugins/jquery.timepicker.min',
        ckeditor: 'plugins/ckeditor',
        imageareaselect: '../../../../../../wp-includes/js/imgareaselect/jquery.imgareaselect.min',
        imageedit: '../../../../../../wp-admin/js/image-edit',
        json2: '../../../../../../wp-includes/js/json2',
        svgpainter: '../../../../../../wp-admin/js/svg-painter'
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
        nvd3: {
            deps: ['d3'],
            exports: 'nv'
        },
        jqueryvalidate: ['jquery'],
        jpanelmenu: ['jquery'],
        minicolors: ['jquery'],
        additionalmethod: ['jquery', 'jqueryvalidate'],
        timepicker: ['jquery'],
        underscorestring: ['underscore'],
        backboneform: ['backbone'],
        backbonesyphon: ['backbone'],
        backboneassociations: ['backbone'],
        jqueryspin: ['spin'],
        bootstrap: ['jquery'],
        isotope: ['jquery'],
        radio: ['bootstrap'],
        checkbox: ['bootstrap'],
        bootstrapselect: ['bootstrap'],
        bootstrapswitch: ['bootstrap'],
        app: ['plugins/dashboard-plugin-loader', 'configs/dashboard-config-loader']
    }
})
