define ['app'
		'apps/builder/site-builder/show/controller'
		'apps/builder/site-builder/element/controller'
		'apps/builder/site-builder/settings/controller'], (App)->

	App.module 'SiteBuilderApp', (SiteBuilderApp, App, Backbone, Marionette, $, _)->

		#PUBLIC API
		API = 	
			# show the site builder
			show : ()->	
				new SiteBuilderApp.Show.Controller

			# add a new element to the builder region
			appendNewElement:(evt, ui)->
				new SiteBuilderApp.Element.Controller
													evt : evt
													ui  : ui

			# show settings box for a view
			showSettings :(model, x, y)->
				new SiteBuilderApp.Settings.Controller
												region 	: App.settingsRegion
												model  	: model
												x		: x
												y 		: y
			
			# deletes the element model
			# view is automatically wired up to listen to destroy event of
			# associated model and clear itself
			deleteElement: (model)->
				model.destroy()

			# function to identify the dropped region
			getDroppedRegion:(sectionID)->

				switch sectionID
					when 'site-header-region' then 'header'
					when 'site-page-region' then 'page'
					when 'site-footer-region' then 'footer'
					else 'page'

		# listen to "element:dropped" event.
		App.vent.on "element:dropped",(evt, ui)->
			API.appendNewElement evt, ui

		# get the dropped region
		App.reqres.setHandler "get:dropped:region",(sectionID)->
			API.getDroppedRegion sectionID

		# listen to show:settings:popup command
		App.vent.on "show:settings:popup", (model, x, y)->
			API.showSettings model, x, y

		App.vent.on "delete:element", (model)->
			if confirm("Are you sure?")
				API.deleteElement model


		# Show all region on start
		SiteBuilderApp.on 'start', ->
			API.show()

		