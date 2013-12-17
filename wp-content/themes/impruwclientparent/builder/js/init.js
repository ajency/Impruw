/**
 * configure require
 *
 * @param {type} param
 */
var _urlArg = "ver=" + (location.host === 'localhost' ? (new Date()).getTime() : '1.0'); //to avoid file caching

require.config({
    urlArgs : _urlArg,
    baseUrl: THEMEURL + '/builder/js/',
    paths: {
        jquery          : 'lib/jquery.min',
        jqueryui        : 'lib/jquery.ui.min',
        bootstrap       : 'lib/bootstrap.min',
        bootstrapselect : 'lib/bootstrapselect',
        underscore      : 'lib/underscore.min',
        backbone        : 'lib/backbone.min',
        text            : 'lib/text',
        moment          : 'lib/moment.min',
        cookie          : 'lib/cookie.min',
        string          : 'lib/underscore.string.min',
        numerals        : 'lib/numerals.min',
        checkbox        : 'lib/flatui-checkbox',
        radio           : 'lib/flatui-radio',
        handlebars      : 'lib/handlebars',
        ckeditor        : 'lib/ckeditor',
        holder          : 'lib/holder',
        cssFx           : 'lib/cssFx'
    },
    waitSeconds: 15,
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'string' : {
            deps : ['underscore']
        },
        'moment' : {
            deps : ['jquery'],
            exports : 'moment'
        },
        'holder' : {
            deps : ['jquery'],
            exports : 'Holder'
        },
        'cssFx' : {
            deps : ['jquery'],
            exports : 'cssFx'
        },
        'jqueryui' : {
            deps : ['jquery']    
        },
        'bootstrap' : {
            deps : ['jquery']    
        },
        'bootstrapselect' : {
            deps : ['bootstrap']
        },
        'handlebars' : {
            deps: ['underscore', 'jquery'],    
            exports : 'Handlebars'
        },
        'ckeditor' : {
            exports : 'CKEDITOR'
        }
    }
});

function log(object){
    console.log(object);
}

//editor mode
window.editorMode       = 'layout';
window.prevpopover      = null;
window.prevmouseover    = null;

//init the app
require(['backbone',
         'builder/routers/BuilderRouter'], function( Backbone, Router) {

        $(document).ready(function(){   

            builder = new Router();
            Backbone.history.start();
            
        });

});