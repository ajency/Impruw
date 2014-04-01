define ['app','apps/builder/header/show/controller'], (App)->

	App.module 'HeaderApp', (HeaderApp, App, Backbone, Marionette, $, _)->

		headerController = null

		#PUBLIC API
		API = 
			# show the header region
			show : ()->
				headerController = new HeaderApp.Show.Controller
											region : App.headerRegion

			# get the currently editable page ID
			getCurrentPageId : ->
				page_id = if isNaN($.cookie('current-page-id')) then headerController.setHomePage() else $.cookie('current-page-id') 
				page_id

				$.cookie('current-page-id')

			getCurrentPageName:->
				headerController.getCurrentPageName()

		# return the current ediatble page ID
		App.reqres.setHandler "get:current:editable:page", ->
			API.getCurrentPageId()

		App.reqres.setHandler "get:current:editable:page:name", ->
			API.getCurrentPageName()

		# show the region on start
		HeaderApp.on 'start', ->
			API.show()

		