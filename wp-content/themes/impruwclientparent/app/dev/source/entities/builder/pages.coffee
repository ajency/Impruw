define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.Pages", (Pages, App, Backbone, Marionette, $, _)->

			# Page Model
			class Pages.PageModel extends Backbone.Model

				# defaults for 
				defaults :->
					post_title 	: ''

				name: 'page'


			# Page collection
			class Pages.PageCollection extends Backbone.Collection

				# model
				model : Pages.PageModel

				url : ->
					"#{AJAXURL}?action=get-pages"

				parse: (resp)->
					return resp.data if resp.code is 'OK'


				
			# PUBLIC API FOR ENitity
			API =
				getPagesCollection:->
					new Pages.PageCollection

				getPages: (param = {})->
					pages = App.request "get:collection", 'pagecollection'

					if not pages
						pages = new Pages.PageCollection
						App.request "set:collection", 'pagecollection',pages
						pages.fetch
								reset : true
								data  : param

					pages

				createNewPage:(data = {})->
					page = new Pages.PageModel data
					page

			# REQUEST HANDLERS
			App.reqres.setHandler "get:editable:pages", ->
				API.getPages()

			App.reqres.setHandler "create:page:model",(data)->
				API.createNewPage data

			App.reqres.setHandler "get:pages:collection", ->
				API.getPagesCollection()