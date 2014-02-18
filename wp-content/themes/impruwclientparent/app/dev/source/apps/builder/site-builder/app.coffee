define ['app'
		'apps/builder/site-builder/show/controller'
		'apps/builder/site-builder/element/controller'
		'apps/builder/site-builder/settings/controller'
		'apps/builder/site-builder/autosave/controller'
		'apps/builder/site-builder/elements-loader'], (App)->

	App.module 'SiteBuilderApp', (SiteBuilderApp, App, Backbone, Marionette, $, _)->

		#PUBLIC API
		API = 	
			# show the site builder
			show : ()->	
				@showController = new SiteBuilderApp.Show.Controller

			# add a new element to the builder region
			appendNewElement:(container, type, modelData)->
				new SiteBuilderApp.Element[type].Controller container,type, modelData

			# show settings box for a view
			showSettings :(model, x, y)->
				new SiteBuilderApp.Settings.Controller
												region 	: App.settingsRegion
												model 	: model
												

			# auto save function call
			autoSave:->
				autoSave = new SiteBuilderApp.AutoSave.Controller
				autoSave.autoSave()

			#fetchCurrentPageJSON
			fetchCurrentPageJSON:->
				pageId = App.request "get:current:editable:page"
				@showController.fetchCurrentPageJSON(pageId)


			# function to identify the dropped region
			getDroppedRegion:(sectionID)->

				switch sectionID
					when 'site-header-region' then 'header'
					when 'site-page-region' then 'page'
					when 'site-footer-region' then 'footer'
					else 'page'

		# listen to "element:dropped" event.
		App.vent.on "element:dropped",(container, type = '', modelData = {})->
			API.appendNewElement container, type, modelData

		
		# get the dropped region
		App.reqres.setHandler "get:dropped:region",(sectionID)->
			API.getDroppedRegion sectionID

		# listen to show:settings:popup command
		App.vent.on "show:settings:popup", (model, x,y )->
			API.showSettings model, x,y 

		App.commands.setHandler "auto:save", ->
			API.autoSave()

		App.commands.setHandler "fetch:current:page:json",()->
			API.fetchCurrentPageJSON()

		# Show all region on start
		SiteBuilderApp.on 'start', ->
			API.show()
		