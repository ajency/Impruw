require.config 
	
	urlArgs : "ver=#{(new Date()).getTime()}"
	
	baseUrl : 'http://localhost/impruw/wp-content/themes/impruwclientparent/app/dev/js/'
	
	paths:
		jquery 				: 'plugins/jquery'
		underscore			: 'plugins/underscore'
		backbone    		: 'plugins/backbone'
		marionette  		: 'plugins/backbone.marionette'
		tpl 				: 'plugins/tpl'
		text 				: 'plugins/text'
		spin 				: 'plugins/spin'
		jqueryspin  		: 'plugins/jquery.spin'
		bootstrap   		: 'plugins/bootstrap'
		bootstrapselect 	: 'plugins/bootstrapselect'
		underscorestring 	: 'plugins/underscore.string'
		mustache			: 'plugins/Mustache'
		plupload			: 'plugins/plupload.full'
		d3					: 'plugins/d3.v3'
		nvd3 				: 'plugins/nv.d3'
		radio 				: 'plugins/flatui-radio'
		checkbox			: 'plugins/flatui-checkbox'
		backboneform		: 'plugins/backbone.form'
		backbonesyphon 		: 'plugins/backbone.syphon'
		backbonerelational 	: 'plugins/backbone.relational'
		jqueryvalidate 		: 'plugins/jquery.validate'
		polyglot 			: 'plugins/polyglot'
		app 				: 'dashboard-app' 
	shim:
		underscore: 
			exports : '_'
		jquery 				: ['underscore']
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
		d3:
			deps : []
			exports : 'd3'
		nvd3:	
			deps : ['d3']
			exports : 'nv'

		jqueryvalidate 		: ['jquery']
		underscorestring 	: ['underscore']
		backboneform 		: ['backbone']
		backbonesyphon 		: ['backbone']
		backbonerelational 	: ['backbone']
		jqueryspin 			: ['spin']
		bootstrap 			: ['jquery']
		radio 				: ['bootstrap']
		checkbox 			: ['bootstrap']
		bootstrapselect		: ['bootstrap']
		app 				: ['plugins/plugin-loader','configs/config-loader']

	tpl :
		extension : '.html'

## Start with application
require [	'plugins/plugin-loader'
			'configs/config-loader'
			'app'
			'entities/appstate'
			'controllers/base-controller'
			'components/component-loader'
			'apps/apps-loader'], (plugins, configs, App)->

	App.start()
