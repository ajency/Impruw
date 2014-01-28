##
## The main dashboard App
##
define ['marionette'], (Marionette)->

	window.App = new Marionette.Application
	
	# Main app regions
	App.addRegions
		leftRegion 		: '#aj-imp-left'
		rightRegion 	: '#aj-imp-right'
		footerRegion 	: '#footer-section'
		dialogRegion 	: Marionette.Region.Dialog.extend el : '#dialog-region'
		loginRegion 	: Marionette.Region.Dialog.extend el : '#login-region'

	# The default route for app
	App.rootRoute = ""

	# loginRoute in case session expires
	App.loginRoute = "login"

	App.on 'start',()->
		_.logAppMsg "Application Started...."

	# Reqres handler to return a default region. If a controller is not explicitly specified a 
	# region it will trigger default region handler
	App.reqres.setHandler "default:region", ->
		App.rightRegion

	# App command to handle async request and action to be performed after that
	# entities are the the dependencies which trigger a fetch to server.
	App.commands.setHandler "when:fetched", (entities, callback) ->
		
		xhrs = _.chain([entities]).flatten().pluck("_fetch").value()

		$.when(xhrs...).done ->
			callback()

	# Registers a controller instance
	App.commands.setHandler "register:instance", (instance, id) ->
		App.register instance, id
	
	# Unregisters a controller instance
	App.commands.setHandler "unregister:instance", (instance, id) ->
		App.unregister instance, id

	App.on "initialize:after", (options) ->

		appState = App.request "get:current:appstate"
		
		App.startHistory()

		if appState.isLoggedIn()
			App.navigate(@rootRoute, trigger: true) unless @getCurrentRoute()
		else
			App.navigate(@loginRoute, trigger : true)
			
	App