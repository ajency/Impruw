define ['app'
		'apps/builder/site-builder/show/controller'
		'apps/builder/site-builder/element/controller'
		'apps/builder/site-builder/autosave/controller'
		'apps/builder/site-builder/elements-loader'], (App)->

	App.module 'SiteBuilderApp', (SiteBuilderApp, App, Backbone, Marionette, $, _)->

		#PUBLIC API
		API = 	
			# show the site builder
			show : ()->	
				@showController = new SiteBuilderApp.Show.Controller

			# add a new element to the builder region
			addNewElement:(container, type, modelData)->
				console.log type
				new SiteBuilderApp.Element[type].Controller 
													container 	: container
													modelData	: modelData

			# auto save function call
			autoSave:->
				autoSave = new SiteBuilderApp.AutoSave.Controller
				autoSave.autoSave()

			

		# listen to "element:dropped" event.
		App.reqres.setHandler "add:new:element",(container, type, modelData = {})->
			API.addNewElement container, type, modelData

		App.commands.setHandler "auto:save", ->
			API.autoSave()

		# Show all region on start
		SiteBuilderApp.on 'start', ->
							API.show()
		