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
		radio 				: 'plugins/flatui-radio'
		checkbox			: 'plugins/flatui-checkbox'
		backboneform		: 'plugins/backbone.form'
		backbonesyphon 		: 'plugins/backbone.syphon'
		backbonerelational 	: 'plugins/backbone.relational'
		jqueryvalidate 		: 'plugins/jquery.validate'
		app 				: 'dashboard-app' 
	shim:
		underscore : 
			exports : '_'
		jquery : ['underscore']
		backbone : 
			deps : ['jquery','underscore']
			exports : 'Backbone'
		marionette : 
			deps : ['backbone']
			exports : 'Marionette'
		jqueryvalidate : ['jquery']
		backboneform : ['backbone']
		backbonesyphon : ['backbone']
		backbonerelational : ['backbone']
		jqueryspin : ['spin']
		bootstrap : ['jquery']
		radio : ['bootstrap']
		checkbox : ['bootstrap']
		app : ['plugins/plugin-loader','configs/config-loader']

	tpl :
		extension : '.tpl'

##
## Start with application
##
require [	'plugins/plugin-loader'
			'configs/config-loader'
			'app'
			'controllers/base-controller'
			'components/component-loader'
			'apps/apps-loader'], (plugins, configs, App)->

	App.start()
