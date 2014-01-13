/**
 * configure require
 *
 * @param {type} param
 */
var _urlArg = "ver=" + (location.host === 'localhost' ? (new Date()).getTime() : JSVERSION); //to avoid file caching

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
        tpl             : 'lib/tpl',
        moment          : 'lib/moment.min',
        cookie          : 'lib/cookie.min',
        string          : 'lib/underscore.string.min',
        numerals        : 'lib/numerals.min',
        checkbox        : 'lib/flatui-checkbox',
        radio           : 'lib/flatui-radio',
        mustache        : 'lib/mustache',
        ckeditor        : 'lib/ckeditor',
        holder          : 'lib/holder',
        cssFx           : 'lib/cssFx',
        nestable        : 'lib/nestable',
        parsley         : 'lib/parsley',
        plupload        : 'lib/plupload.full.min',
        marionette      : 'lib/backbone.marionette.min',
        async           : 'lib/async',

        //routers
        builderrouter   : 'builder/routers/BuilderRouter',

        //elements
        builderelement  : 'builder/views/elements/BuilderElement',
        builderrow      : 'builder/views/elements/layout/BuilderRow',
        builderrowcolumn: 'builder/views/elements/layout/BuilderRowColumn',
        
        imageelement    : 'builder/views/elements/ImageElement',
        logoelement     : 'builder/views/elements/LogoElement',
        menuelement     : 'builder/views/elements/MenuElement',
        titleelement    : 'builder/views/elements/TitleElement',
        textelement     : 'builder/views/elements/TextElement',
        socialelement   : 'builder/views/elements/SocialElement',
        sliderelement   : 'builder/views/elements/SliderElement',
        imagewithtextelement: 'builder/views/elements/ImageWithTextElement',
        addresselement  : 'builder/views/elements/AddressElement',

        roomtitle       : 'builder/views/elements/rooms/RoomTitle',
        roomdescription : 'builder/views/elements/rooms/RoomDescription',
        roomfacilities  : 'builder/views/elements/rooms/RoomFacilities',
        roomgallery     : 'builder/views/elements/rooms/RoomGallery',

        //menu
        menumanager     : 'builder/views/modals/MenuManager',
        menumodel       : 'builder/models/MenuModel',
        menucollection  : 'builder/collections/MenuCollection',

        //media 
        mediamanager    : 'builder/views/modals/media/MediaManager',
        mediamodel      : 'builder/models/MediaModel',
        mediacollection : 'builder/collections/MediaCollection',
        mediasingle     : 'builder/views/modals/media/SingleMedia',

        //slider
        slidermanager   : 'builder/views/modals/SliderManager'

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
        'plupload': {
            deps : ['jqueryui'],
            exports : 'plupload'
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
        'ckeditor' : {
            exports : 'CKEDITOR'
        },
        'marionette' : {
            deps : ['backbone'],
            exports : 'Marionette'
        }
    }
});

function log(object){
    console.log(object);
}

/**
 * Returns the main application object instance
 * @return {[type]} [description]
 */
function getAppInstance(){

    return SiteBuilder;

}

/**
 * [templatesUri description]
 * @return {[type]} [description]
 */
function templatesUri(){
    return requirejs.s.contexts._.config.baseURL + ''
}

//editor mode
window.editorMode       = 'layout';
window.prevpopover      = null;
window.prevmouseover    = null;

//init the app
require(['backbone', 'marionette',
         'builderrouter'], function( Backbone, Marionette, Router) {

        $(document).ready(function(){   

            SiteBuilder = new Backbone.Marionette.Application();

            //set view manager for globally accessible views
            SiteBuilder.ViewManager = new Backbone.ChildViewContainer();

            SiteBuilder.addInitializer(function(options){
                new Router();
                Backbone.history.start();
            });

            SiteBuilder.start();
        });

});