define ['app'
		'apps/builder/site-builder/show/controller'
		'apps/builder/site-builder/element/controller'
		'apps/builder/site-builder/autosave/controller'
		'apps/builder/site-builder/elements-loader'], (App)->

	App.module 'SiteBuilderApp', (SiteBuilderApp, App, Backbone, Marionette, $, _)->

		SiteBuilderApp['header'] 		= false
		SiteBuilderApp['page-content'] 	= false
		SiteBuilderApp['footer'] 		= false

		#PUBLIC API
		API = 	
			# show the site builder
			show : ()->	
				@showController = new SiteBuilderApp.Show.Controller

			# add a new element to the builder region
			addNewElement:(container, type, modelData)->
				if SiteBuilderApp.Element[type]
					new SiteBuilderApp.Element[type].Controller 
												container 	: container
												modelData	: modelData

			# auto save function call
			autoSave:->
				autoSave = new SiteBuilderApp.AutoSave.Controller
				autoSave.autoSave()

			isSectionModified:(section)->
				SiteBuilderApp[section]

			sectionModified :(section)->
				SiteBuilderApp[section] = true

			resetSection : ->
				SiteBuilderApp['header'] 		= false
				SiteBuilderApp['page-content'] 	= false
				SiteBuilderApp['footer'] 		= false
			

		# listen to "element:dropped" event.
		App.reqres.setHandler "add:new:element",(container, type, modelData = {})->
			API.addNewElement container, type, modelData

		App.commands.setHandler "auto:save", ->
			API.autoSave()

		# check if the section is updated
		App.reqres.setHandler "is:section:modified",(section)->
			API.isSectionModified section

		# sets the modified flag for the section
		App.reqres.setHandler "section:modified",(section)->
			API.sectionModified section

		# Show all region on start
		SiteBuilderApp.on 'start', ->
			API.show()
		