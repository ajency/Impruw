# The main builder app entry point
# <ul>
# <li>-this file sets the requirejs configurations </li>
# <li>-load all JS files</li>
# </ul>
require.config

   urlArgs : "ver=#{(new Date()).getTime()}"

   baseUrl : 'http://localhost/impruw/wp-content/themes/impruwclientparent/app/dev/js/'

   paths :
      jquery : 'bower_components/jquery/dist/jquery'
      jqueryui : 'bower_components/jqueryui/jquery-ui.min'
      underscore : 'bower_components/underscore/underscore'
      backbone : 'bower_components/backbone/backbone'
      marionette : 'bower_components/backbone.marionette/lib/backbone.marionette'
      spin : 'bower_components/spin.js/spin'
      jqueryspin : 'bower_components/spin/javascripts/jquery.spin'
      bootstrap : 'bower_components/bootstrap/dist/js/bootstrap'
      mustache : 'bower_components/mustache/mustache'
      moment : 'bower_components/moment/moment'
      bootstrapselect : 'bower_components/bootstrap-select/dist/js/bootstrap-select'
      underscorestring : 'bower_components/underscore.string/dist/underscore.string.min'
      backbonesyphon : 'bower_components/backbone.syphon/lib/amd/backbone.syphon'
      'jquery.validate' : 'bower_components/jquery.validate/dist/jquery.validate'
      isotope : 'bower_components/isotope/dist/isotope.pkgd'
      imgLiquid : 'bower_components/imgLiquid/js/imgLiquid'
      polyglot : 'bower_components/polyglot/build/polyglot'
      minicolors : 'bower_components/jquery-minicolors/jquery.minicolors.min'
      resizablecolumns : 'bower_components/jquery-resizable-columns/dist/jquery.resizableColumns.min'
      drilldown : 'bower_components/jquery-drilldown/jquery.drilldown.min'
      cookie : 'bower_components/jquery.cookie/jquery.cookie'
      
      tpl : 'plugins/tpl'
      text : 'plugins/text'
      bootbox : 'plugins/bootbox.min'
      radiocheck : 'plugins/flatui-radiocheck'
      radio : 'plugins/flatui-radio'
      checkbox : 'plugins/flatui-checkbox'
      ckeditor : 'plugins/ckeditor'
      nestedsortable : 'plugins/nested.sortable'
      plupload : 'plugins/plupload.full'
      themepunch : 'plugins/themepunch.plugins.min'
      revslider : 'plugins/revolution.min'
      tabslideout : 'plugins/jquery.tabSlideOut.v1.3'
      jqueryuii18n : 'plugins/jquery-ui-i18n'
      
      pluginloader : 'plugins/builder-plugin-loader'
      appsloader : 'apps/builder-apps-loader'
      configloader : 'configs/builder-config-loader'
      entitiesloader : 'entities/builder-entities-loader'
      componentloader : 'components/builder-component-loader'
      app : 'builder-app'
      
      # wordpress cropping js
      imageareaselect : '../../../../../wp-includes/js/imgareaselect/jquery.imgareaselect.min'
      imageedit : '../../../../../wp-admin/js/image-edit'
      json2 : '../../../../../wp-includes/js/json2'
      svgpainter : '../../../../../wp-admin/js/svg-painter'
      heartbeat : '../../../../../wp-includes/js/heartbeat'
      

   shim :
      imageedit : ['jquery','json2','imageareaselect']
      imageareaselect : ['jquery']
      svgpainter : ['jquery']

      jquery : ['underscore']
      jqueryui : ['jquery']
      drilldown : ['jquery']
      moment : ['jquery']
      backbone : ['jquery', 'underscore']
      marionette : ['backbone']
      polyglot :
         exports : 'Polyglot'
      'jquery.validate' : ['jquery']
      underscorestring : ['underscore']
      backbonesyphon : ['backbone']
      jqueryspin : ['jquery']
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
      radiocheck : ['bootstrap']
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
