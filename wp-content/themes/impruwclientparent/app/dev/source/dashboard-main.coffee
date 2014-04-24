require.config 
	
	urlArgs : "ver=#{(new Date()).getTime()}"
	
	baseUrl : 'http://localhost/impruw/wp-content/themes/impruwclientparent/app/dev/js/'
	
	paths:
		jquery 				: 'plugins/jquery'
		jqueryui 			: 'plugins/jquery.ui'
		underscore			: 'plugins/underscore'
		backbone    		: 'plugins/backbone'
		marionette  		: 'plugins/backbone.marionette'
		tpl 				: 'plugins/tpl'
		text 				: 'plugins/text'
		spin 				: 'plugins/spin'
		moment 				: 'plugins/moment'
		jqueryspin  		: 'plugins/jquery.spin'
		bootstrap   		: 'plugins/bootstrap'
		bootstrapselect 	: 'plugins/bootstrapselect'
		underscorestring 	: 'plugins/underscore.string'
		mustache			: 'plugins/Mustache'
		plupload			: 'plugins/plupload.full'
		d3					: 'plugins/d3.v3'
		nvd3 				: 'plugins/nv.d3'
		datepicker 			: 'plugins/datepicker'
		isotope 			: 'plugins/isotope'
		radio 				: 'plugins/flatui-radio'
		checkbox			: 'plugins/flatui-checkbox'
		backboneform		: 'plugins/backbone.form'
		backbonesyphon 		: 'plugins/backbone.syphon'
		backboneassociations: 'plugins/backbone.associations'
		jqueryvalidate 		: 'plugins/jquery.validate'
		polyglot 			: 'plugins/polyglot'
		chart 				: 'plugins/chart'
		app 				: 'dashboard-app' 
		bootstrapswitch 	: 'plugins/bootstrap-switch'
		entitiesloader		: 'entities/dashboard-entities-loader'
		jpanelmenu			: 'plugins/jquery.jpanelmenu.min'
		scrollsections		: 'plugins/ajency.scrolldots'
		minicolors			: 'plugins/jquery.minicolors.min'
		additionalmethod	: 'plugins/validate.additional.methods'
		timepicker			: 'plugins/jquery.timepicker.min'

	shim:
		underscore: 
			exports : '_'
		jquery 		: ['underscore']
		jqueryui 	: ['jquery']
		backbone: 
			deps 	: ['jquery','underscore']
			exports : 'Backbone'
		marionette : 
			deps 	: ['backbone']
			exports : 'Marionette'
		polyglot : 
			exports : 'Polyglot'
		plupload			: 
			deps : ['jquery']
			exports : 'plupload'
		nvd3:	
			deps : ['d3']
			exports : 'nv'
		jqueryvalidate 		: ['jquery']
		datepicker 			: ['jquery']
		scrollsections		: ['jquery']
		jpanelmenu 			: ['jquery']
		minicolors			: ['jquery']
		timepicker			: ['jquery']
		additionalmethod	: ['jquery','jqueryvalidate']
		underscorestring 	: ['underscore']
		backboneform 		: ['backbone']
		backbonesyphon 		: ['backbone']
		backboneassociations: ['backbone']
		isotope				: ['jquery']
		jqueryspin 			: ['spin']
		bootstrap 			: ['jquery']
		radio 				: ['bootstrap']
		checkbox 			: ['bootstrap']
		bootstrapselect		: ['bootstrap']
		bootstrapswitch		: ['bootstrap']
		app 				: ['plugins/plugin-loader','configs/config-loader']


## Start with application
require [	'plugins/plugin-loader'
			'configs/config-loader'
			'app'
			'entitiesloader'
			'entities/appstate'
			'controllers/base-controller'
			'components/component-loader'
			'apps/apps-loader'], (plugins, configs, App)->

	App.start()
