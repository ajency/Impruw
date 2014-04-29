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
    moment: 'plugins/moment',
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
  }
});

require(['pluginloader', 'configloader', 'app', 'entitiesloader', 'controllers/base-controller', 'controllers/builder-base-controller', 'componentloader', 'appsloader'], function(plugins, configs, App) {
  App.start();
  return $(window).load(function() {
    var $closed_menu_opacity, $fl_menu, $fl_menu_label, $fl_menu_menu, $float_easing, $float_speed, $menu_fade_speed, FloatMenu, menuPosition;
    $float_speed = 1500;
    $float_easing = "easeOutQuint";
    $menu_fade_speed = 500;
    $closed_menu_opacity = 0.75;
    $fl_menu = $("#fl_menu");
    $fl_menu_menu = $("#fl_menu .menu");
    $fl_menu_label = $("#fl_menu .label");
    menuPosition = $("#fl_menu").position().top;
    $(window).load(function() {
      menuPosition = $("#fl_menu").position().top;
      FloatMenu();
      return $fl_menu.hover(function() {
        $fl_menu_label.fadeTo($menu_fade_speed, 1);
        return $fl_menu_menu.fadeIn($menu_fade_speed);
      }, function() {
        $fl_menu_label.fadeTo($menu_fade_speed, $closed_menu_opacity);
        return $fl_menu_menu.fadeOut($menu_fade_speed);
      });
    });
    $(window).scroll(function() {
      return FloatMenu();
    });
    return FloatMenu = function() {
      var newPosition, scrollAmount;
      scrollAmount = $(document).scrollTop();
      newPosition = menuPosition + scrollAmount;
      if ($(window).height() < $fl_menu.height() + $fl_menu_menu.height()) {
        return $fl_menu.css("top", menuPosition);
      } else {
        return $fl_menu.stop().animate({
          top: newPosition
        }, $float_speed, $float_easing);
      }
    };
  });
});
