# The main builder app entry point
# <ul>
# <li>-this file sets the requirejs configurations </li> 
# <li>-load all JS files</li>
# </ul>
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
		jqueryspin  		: 'plugins/jquery.spin'
		bootstrap   		: 'plugins/bootstrap'
		bootstrapselect 	: 'plugins/bootstrapselect'
		radio 				: 'plugins/flatui-radio'
		checkbox			: 'plugins/flatui-checkbox'
		backboneform		: 'plugins/backbone.form'
		backbonesyphon 		: 'plugins/backbone.syphon'
		backbonerelational 	: 'plugins/backbone.relational'
		jqueryvalidate 		: 'plugins/jquery.validate'
		polyglot 			: 'plugins/polyglot'
		googlemap 			: 'https://maps.googleapis.com/maps/api/js?sensor=false'
		pluginloader		: 'plugins/builder-plugin-loader'
		appsloader 			: 'apps/builder-apps-loader'
		configloader 		: 'configs/builder-config-loader'
		entitiesloader		: 'entities/builder-entities-loader'
		componentloader 	: 'components/builder-component-loader'
		app 				: 'builder-app' 
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
		google :
			exports : 'google'
		jqueryvalidate 		: ['jquery']
		backboneform 		: ['backbone']
		backbonesyphon 		: ['backbone']
		backbonerelational 	: ['backbone']
		jqueryspin 			: ['spin']
		bootstrap 			: ['jquery']
		radio 				: ['bootstrap']
		checkbox 			: ['bootstrap']
		bootstrapselect		: ['bootstrap']
		app 				: ['pluginloader','configloader']

	tpl :
		extension : '.html'


## Start with application
require [	'pluginloader'
			'configloader'
			'app'
			'entitiesloader'
			'controllers/base-controller'
			'controllers/builder-base-controller'
			'componentloader'
			'appsloader'], (plugins, configs, App)->

	App.start()
