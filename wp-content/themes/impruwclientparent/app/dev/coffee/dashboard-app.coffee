##
## The main dashboard App
##

define ['marionette'], (Marionette)->

	App = new Marionette.Application

	App.addRegions
		leftRegion 		: '#aj-imp-left'
		rightRegion 	: '#aj-imp-right'
		footerRegion 	: '#footer-section'

	App.rootRoute = ""

	App.addInitializer ()->
		App.module('LeftNav').start()

	App.on 'start',()->
		_.logAppMsg "Application Started...."

	App.addInitializer (options)->
		App.LeftNav.start()

	App.reqres.setHandler "default:region", ->
		App.rightRegion

	App.commands.setHandler "when:fetched", (entities, callback) ->
		xhrs = _.chain([entities]).flatten().pluck("_fetch").value()

		console.log entities

		$.when(xhrs...).done ->
			callback()

	App.commands.setHandler "register:instance", (instance, id) ->
		App.register instance, id
	
	App.commands.setHandler "unregister:instance", (instance, id) ->
		App.unregister instance, id

	App.on "initialize:after", (options) ->
		App.startHistory()
		App.navigate(@rootRoute, trigger: true) unless @getCurrentRoute()

	App