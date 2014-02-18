define ['app','apps/builder/header/show/controller'], (App)->

	App.module 'HeaderApp', (HeaderApp, App, Backbone, Marionette, $, _)->

		#@startWithParent = false

		#PUBLIC API
		API = 
			# show the header region
			show : ()->
				new HeaderApp.Show.Controller
								region : App.headerRegion

			# get the currently editable page ID
			getCurrentPageId : ->
				$.cookie 'current-page-id'


		# return the current ediatble page ID
		App.reqres.setHandler "get:current:editable:page", ->
			API.getCurrentPageId()

		# show the region on start
		HeaderApp.on 'start', ->
			API.show()

		