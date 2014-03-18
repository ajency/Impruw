## The main dashboard App
define ['marionette'], (Marionette)->

	window.App = new Marionette.Application

	# Main app regions
	App.addRegions
		headerRegion 		: '#header-region'
		elementsBoxRegion 	: '#elements-box-region'
		builderWrapper 		: '#builder-region'
		settingsRegion 		: Marionette.Region.Settings.extend el : '#settings-region'
		loginRegion 		: Marionette.Region.Dialog.extend el : '#login-region'
		dialogRegion 		: Marionette.Region.Dialog.extend el : '#dialog-region'
		chooseThemeRegion	: '#choose-theme-region'


	# The default route for app
	App.rootRoute = ""

	# loginRoute in case session expires
	App.loginRoute = "login"

	App.on 'start',()->
		_.logAppMsg "Application Started...."

	# Reqres handler to return a default region. If a controller is not explicitly specified a
	# region it will trigger default region handler
	App.reqres.setHandler "default:region", ->
		App.builderRegion

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

	# Registers a controller instance
	App.commands.setHandler "register:builder:instance", (instance, id) ->
		App.registerElement instance, id

	# Unregisters a controller instance
	App.commands.setHandler "unregister:builder:instance", (instance, id) ->
		App.unregisterElement instance, id

	App.on "initialize:after", (options) ->

		# create required empty stores
		App.execute "create:media:store"
		App.execute "create:menu:store"
		App.execute "create:social:store"
		App.execute "create:slider:store"

		# create a global site model 
		site = App.request "get:site:profile"

		appState = App.request "get:current:appstate"
		App.startHistory()
		if appState.isLoggedIn()
			App.navigate(@rootRoute, trigger: true) unless @getCurrentRoute()
		else
			App.navigate(@loginRoute, trigger : true)

	App
