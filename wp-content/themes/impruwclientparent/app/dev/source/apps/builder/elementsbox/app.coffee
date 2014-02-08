define ['app','apps/builder/elementsbox/show/controller'], (App)->

	App.module 'ElementsBoxApp', (ElementsBoxApp, App, Backbone, Marionette, $, _)->

		#PUBLIC API
		API = 
			show : ()->
				new ElementsBoxApp.Show.Controller
								region : App.elementsBoxRegion

			showFetchError:(resp)->
				new ElementsBoxApp.Show.ErrorController
								region : App.elementsBoxRegion

		ElementsBoxApp.on 'start', ->
			console.log "Elements module started"
			API.show()

		# listen to events
		App.vent.on "elementbox:collection:fetch:error",(resp) ->
			API.showFetchError(resp)
		