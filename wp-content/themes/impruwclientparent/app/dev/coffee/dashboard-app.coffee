##
## The main dashboard app
##

define ['marionette'], (Marionette)->

	app = new Marionette.Application

	app.addRegions
		leftRegion 		: '#aj-imp-left'
		rightRegion 	: '#aj-imp-right'
		footerRegion 	: '#footer-section'

	app.rootRoute = "dashboard"

	app.addInitializer ()->
		app.module('LeftNav').start()

	app.on 'start',()->
		_.logAppMsg "Application Started...."

	app.reqres.setHandler "default:region", ->
		app.rightSection

	app.commands.setHandler "register:instance", (instance, id) ->
		app.register instance, id
	
	app.commands.setHandler "unregister:instance", (instance, id) ->
		app.unregister instance, id

	app.on "initialize:after", (options) ->
		app.startHistory()
		app.navigate(@rootRoute, trigger: true) unless @getCurrentRoute()

	app