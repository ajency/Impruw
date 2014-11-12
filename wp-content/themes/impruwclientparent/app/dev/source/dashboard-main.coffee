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
      bootstrapswitch : 'bower_components/bootstrap-switch/dist/js/bootstrap-switch'
      additionalmethod : 'bower_components/jquery.validate/dist/additional-methods'
      timepicker : 'bower_components/jt.timepicker/jquery.timepicker.min'
      lightbox: 'bower_components/lightbox/js/lightbox.min'

      jpanelmenu : 'plugins/jquery.jpanelmenu.min'
      text : 'plugins/text'
      plupload : 'plugins/plupload.full'
      datepicker : 'plugins/datepicker'
      radiocheck : 'plugins/flatui-radiocheck'
      chart : 'plugins/chart'
      braintree : 'plugins/braintree'
      jqueryuii18n : 'plugins/jquery-ui-i18n'
      app : 'dashboard-app'
      
      # wordpress cropping js
      imageareaselect : '../../../../../wp-includes/js/imgareaselect/jquery.imgareaselect.min'
      imageedit : '../../../../../wp-admin/js/image-edit'
      json2 : '../../../../../wp-includes/js/json2'
      svgpainter : '../../../../../wp-admin/js/svg-painter'
      heartbeat : '../../../../../wp-includes/js/heartbeat'
      
   shim :
      # wordpress js
      imageedit : ['jquery','json2','imageareaselect']
      imageareaselect : ['jquery']
      svgpainter : ['jquery']

      jquery : ['underscore']
      jqueryui : ['jquery']
      backbone : ['jquery', 'underscore']
      marionette : ['backbone']
      polyglot :
         exports : 'Polyglot'
      plupload :
         deps : ['jquery']
         exports : 'plupload'
      'jquery.validate' : ['jquery']
      datepicker : ['jquery']
      jpanelmenu : ['jquery']
      minicolors : ['jquery']
      timepicker : ['jquery']
      braintree : ['jquery']
      additionalmethod : ['jquery', 'jquery.validate']
      underscorestring : ['underscore']
      backboneform : ['backbone']
      backbonesyphon : ['backbone']
      backboneassociations : ['backbone']
      isotope : ['jquery']
      lightbox: ['jquery']
      jqueryspin : ['spin']
      bootstrap : ['jquery']
      heartbeat : ['jquery']
      radiocheck : ['bootstrap']
      radio : ['bootstrap']
      checkbox : ['bootstrap']
      bootstrapselect : ['bootstrap']
      bootstrapswitch : ['bootstrap']
      jqueryuii18n : ['jquery' , 'jqueryui']
      app : ['plugins/dashboard-plugin-loader', 'configs/dashboard-config-loader']


## Start with application
require [  'plugins/dashboard-plugin-loader'
           'configs/dashboard-config-loader'
           'app'
           'entities/dashboard-entities-loader'
           'controllers/base-controller'
           'components/dashboard-component-loader'
           'apps/dashboard-apps-loader'], ( plugins, configs, App )->
   App.start()
