// Generated by CoffeeScript 1.6.3
(function() {
  require.config({
    urlArgs: '_urlArg',
    baseUrl: THEMEURL + '/builder/js/',
    paths: {
      jquery: 'lib/jquery.min',
      jqueryui: 'lib/jquery.ui.min',
      bootstrap: 'lib/bootstrap.min',
      bootstrapselect: 'lib/bootstrapselect',
      underscore: 'lib/underscore.min',
      backbone: 'lib/backbone.min',
      tpl: 'lib/tpl',
      moment: 'lib/moment.min',
      cookie: 'lib/cookie.min',
      string: 'lib/underscore.string.min',
      numerals: 'lib/numerals.min',
      checkbox: 'lib/flatui-checkbox',
      radio: 'lib/flatui-radio',
      mustache: 'lib/mustache',
      ckeditor: 'lib/ckeditor',
      holder: 'lib/holder',
      cssFx: 'lib/cssFx',
      nestable: 'lib/nestable',
      parsley: 'lib/parsley',
      plupload: 'lib/plupload.full.min',
      marionette: 'lib/backbone.marionette.min',
      async: 'lib/async',
      builderrouter: 'builder/routers/BuilderRouter',
      rooms: 'builder/models/Rooms',
      roomsview: 'builder/views/modals/roomsview',
      addpage: 'builder/views/modals/AddPageModal',
      builderelement: 'builder/views/elements/BuilderElement',
      builderrow: 'builder/views/elements/layout/BuilderRow',
      builderrowcolumn: 'builder/views/elements/layout/BuilderRowColumn',
      imageelement: 'builder/views/elements/ImageElement',
      logoelement: 'builder/views/elements/LogoElement',
      menuelement: 'builder/views/elements/MenuElement',
      titleelement: 'builder/views/elements/TitleElement',
      textelement: 'builder/views/elements/TextElement',
      socialelement: 'builder/views/elements/SocialElement',
      sliderelement: 'builder/views/elements/SliderElement',
      imagewithtextelement: 'builder/views/elements/ImageWithTextElement',
      addresselement: 'builder/views/elements/AddressElement',
      contactformelement: 'builder/views/elements/ContactFormElement',
      mapelement: 'builder/views/elements/MapElement',
      galleryelement: 'builder/views/elements/GalleryElement',
      roomtitle: 'builder/views/elements/rooms/RoomTitle',
      roomdescription: 'builder/views/elements/rooms/RoomDescription',
      roomfacilities: 'builder/views/elements/rooms/RoomFacilities',
      roomgallery: 'builder/views/elements/rooms/RoomGallery',
      roomlistelement: 'builder/views/elements/rooms/RoomListElement',
      roomtariff: 'builder/views/elements/rooms/RoomTariff',
      roomcarousel: 'builder/views/elements/rooms/RoomCarousel',
      menumanager: 'builder/views/modals/MenuManager',
      menumodel: 'builder/models/MenuModel',
      menucollection: 'builder/collections/MenuCollection',
      chooseroom: 'builder/views/modals/ChooseRoomModal',
      mediamanager: 'builder/views/modals/media/MediaManager',
      mediamodel: 'builder/models/MediaModel',
      mediacollection: 'builder/collections/MediaCollection',
      mediasingle: 'builder/views/modals/media/SingleMedia',
      slidermanager: 'builder/views/modals/SliderManager'
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
        deps: ['jqueryui'],
        exports: 'plupload'
      },
      'string': {
        deps: ['underscore']
      },
      'moment': {
        deps: ['jquery'],
        exports: 'moment'
      },
      'checkbox': {
        deps: ['bootstrap']
      },
      'radio': {
        deps: ['bootstrap']
      },
      'holder': {
        deps: ['jquery'],
        exports: 'Holder'
      },
      'cssFx': {
        deps: ['jquery'],
        exports: 'cssFx'
      },
      'jqueryui': {
        deps: ['jquery']
      },
      'bootstrap': {
        deps: ['jquery']
      },
      'bootstrapselect': {
        deps: ['bootstrap']
      },
      'ckeditor': {
        exports: 'CKEDITOR'
      },
      'marionette': {
        deps: ['backbone'],
        exports: 'Marionette'
      },
      'parsley': {
        deps: ['jquery']
      }
    }
  });

  window.log = function(object) {
    return console.log(object);
  };

  window.getAppInstance = function() {
    return window.SiteBuilder;
  };

  window.templatesUri = function() {
    return requirejs.s.contexts._.config.baseURL + '';
  };

  window.editorMode = 'layout';

  window.prevpopover = null;

  window.prevmouseover = null;

  window.fetchJSON = false;

  require(['jquery', 'global', 'backbone', 'marionette', 'builderrouter'], function($, global, Backbone, Marionette, Router) {
    Backbone.emulateHTTP = true;
    return $(document).ready(function() {
      window.SiteBuilder = new Backbone.Marionette.Application();
      window.SiteBuilder.ViewManager = new Backbone.ChildViewContainer();
      window.SiteBuilder.addInitializer(function(options) {
        new Router();
        return Backbone.history.start();
      });
      return window.SiteBuilder.start();
    });
  });

}).call(this);
