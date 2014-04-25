define ['app'
		'apps/builder/site-builder/show/controller'
		'apps/builder/site-builder/element/controller'
		'apps/builder/site-builder/autosave/controller'
		'apps/builder/site-builder/elements-loader'], (App)->

	App.module 'SiteBuilderApp', (SiteBuilderApp, App, Backbone, Marionette, $, _)->

		window.S = SiteBuilderApp
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

				App.execute "mark:section:as:modified", container

				if SiteBuilderApp.Element[type]
					new SiteBuilderApp.Element[type].Controller 
												container 	: container
												modelData	: modelData

			# mark the container/section as modified
			markSectionAsModified:(container)->
				_.each ['header','page-content','footer'], (section, index)->
					if $(container) is $("#site-#{section}-region") or 
							$(container).closest("#site-#{section}-region").length > 0
						SiteBuilderApp[section] = true

			# auto save function call
			autoSave:(revision = false)->
				autoSave = new SiteBuilderApp.AutoSave.Controller
				autoSave.autoSave(revision)

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
		
		App.commands.setHandler "save:revision", ->
			API.autoSave true

		# check if the section is updated
		App.reqres.setHandler "is:section:modified",(section)->
			API.isSectionModified section

		# sets the modified flag for the section
		App.commands.setHandler "mark:section:as:modified",(container)->
			API.markSectionAsModified container

		App.commands.setHandler "reset:changed:sections", ->
			API.resetSection()

		# Show all region on start
		SiteBuilderApp.on 'start', ->
			API.show()
		