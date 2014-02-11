define ['app'
		'apps/builder/site-builder/show/controller'
		'apps/builder/site-builder/element/controller'], (App)->

	App.module 'SiteBuilderApp', (SiteBuilderApp, App, Backbone, Marionette, $, _)->

		#PUBLIC API
		API = 
			show : ()->
				new SiteBuilderApp.Show.Controller

			appendNewElement:(evt, ui)->
				new SiteBuilderApp.Element.Controller
													evt : evt
													ui  : ui

			getDroppedRegion:(sectionID)->

				switch sectionID
					when 'site-header-region' then 'header'
					when 'site-page-region' then 'page'
					when 'site-footer-region' then 'footer'
					else 'page'


		App.vent.on "element:dropped",(evt, ui)->
			API.appendNewElement evt, ui


		App.reqres.setHandler "get:dropped:region",(sectionID)->
			API.getDroppedRegion sectionID

		# Show all region on start
		SiteBuilderApp.on 'start', ->
			API.show()

		