# The main builder app entry point
# <ul>
# <li>-this file sets the requirejs configurations </li>
# <li>-load all JS files</li>
# </ul>
require.config

   urlArgs : "ver=#{(new Date()).getTime()}"

   baseUrl : 'http://localhost/impruw/wp-content/themes/impruwclientparent/app/dev/js/'

   paths :
      jquery : 'plugins/jquery'
      jqueryui : 'plugins/jquery.ui'
      underscore : 'plugins/underscore'
      backbone : 'plugins/backbone'
      marionette : 'plugins/backbone.marionette'
      tpl : 'plugins/tpl'
      text : 'plugins/text'
      spin : 'plugins/spin'
      jqueryspin : 'plugins/jquery.spin'
      bootstrap : 'plugins/bootstrap'
      bootbox : 'plugins/bootbox.min'
      holder : 'plugins/holder'
      mustache : 'plugins/Mustache'
      moment : 'plugins/moment'
      bootstrapselect : 'plugins/bootstrapselect'
      underscorestring : 'plugins/underscore.string'
      radio : 'plugins/flatui-radio'
      cookie : 'plugins/cookie.min'
      checkbox : 'plugins/flatui-checkbox'
      ckeditor : 'plugins/ckeditor'
      backboneform : 'plugins/backbone.form'
      backbonesyphon : 'plugins/backbone.syphon'
      backboneassociations : 'plugins/backbone.associations'
      nestedsortable : 'plugins/nested.sortable'
      jqueryvalidate : 'plugins/jquery.validate'
      isotope : 'plugins/isotope'
      plupload : 'plugins/plupload.full'
      polyglot : 'plugins/polyglot'
      themepunch : 'plugins/themepunch.plugins.min'
      imgLiquid : 'plugins/bower_components/imgLiquid/js/imgLiquid'
      revslider : 'plugins/revolution.min'
      googlemap : 'https://maps.googleapis.com/maps/api/js?sensor=false'
      pluginloader : 'plugins/builder-plugin-loader'
      appsloader : 'apps/builder-apps-loader'
      configloader : 'configs/builder-config-loader'
      entitiesloader : 'entities/builder-entities-loader'
      componentloader : 'components/builder-component-loader'
      app : 'builder-app'
      minicolors : 'plugins/jquery.minicolors.min'
      drilldown : 'plugins/jquery.drilldown.min'
      resizablecolumns : 'plugins/jquery.resizableColumns.min'
      tabslideout : 'plugins/jquery.tabSlideOut.v1.3'
      #flippant: 'plugins/flippant.min'

      # wordpress cropping js
      imageareaselect : '../../../../../wp-includes/js/imgareaselect/jquery.imgareaselect.min'
      imageedit : '../../../../../wp-admin/js/image-edit'
      json2 : '../../../../../wp-includes/js/json2'
      svgpainter : '../../../../../wp-admin/js/svg-painter'
      heartbeat : '../../../../../wp-includes/js/heartbeat'
      jqueryuii18n : 'plugins/jquery-ui-i18n'

   shim :
      imageedit : ['jquery','json2','imageareaselect']
      imageareaselect : ['jquery']
      svgpainter : ['jquery']
      
      underscore :
         exports : '_'
      jquery : ['underscore']
      jqueryui : ['jquery']
      backbone :
         deps : ['jquery', 'underscore']
         exports : 'Backbone'
      marionette :
         deps : ['backbone']
         exports : 'Marionette'
      polyglot :
         exports : 'Polyglot'
      jqueryvalidate : ['jquery']
      underscorestring : ['underscore']
      backbonesyphon : ['backbone']
      backboneassociations : ['backbone']
      jqueryspin : ['spin']
      bootstrap : ['jquery']
      themepunch : ['jquery']
      isotope : ['jquery']
      minicolors : ['jquery']
      revslider : ['themepunch']
      imgLiquid : ['jquery']
      heartbeat : ['jquery']
      plupload :
         deps : ['jquery']
         exports : 'plupload'
      cookie : ['jquery']
      nestedsortable : ['jqueryui']
      radio : ['bootstrap']
      checkbox : ['bootstrap']
      bootstrapselect : ['bootstrap']
      bootbox :
         deps : ['bootstrap']
         exports : 'bootbox'
      tabslideout : ['jquery']
      resizablecolumns : ['jquery']
      jqueryuii18n : ['jquery' , 'jqueryui']
      app : ['pluginloader', 'configloader']


## Start with application
require [   'pluginloader'
            'configloader'
            'app'
            'entitiesloader'
            'controllers/base-controller'
            'controllers/builder-base-controller'
            'componentloader'
            'appsloader'], ( plugins, configs, App )->
   App.start()
