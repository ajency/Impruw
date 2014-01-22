require.config 
	
	urlArgs : "ver=#{(new Date()).getTime()}"
	
	baseUrl : 'http://localhost/impruw/wp-content/themes/impruwclientparent/app/dev/js/'
	
	paths:
		jquery 		: 'plugins/jquery'
		underscore	: 'plugins/underscore'
		backbone    : 'plugins/backbone'
		marionette  : 'plugins/backbone.marionette'
	shim:
		underscore : 
			exports : '_'
		backbone : 
			deps : ['jquery','underscore']
			exports : 'Backbone'
		marionette : 
			deps : ['backbone']
			exports : 'Marionette'

##
## Start with application
##
require ['plugins/plugin-loader','configs/config-loader','dashboard-app','apps/apps-loader'], (plugins, configs, app)->

	app.start()
