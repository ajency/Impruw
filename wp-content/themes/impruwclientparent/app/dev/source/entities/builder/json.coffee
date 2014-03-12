define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.SiteBuilderJSON", (SiteBuilderJSON, App, Backbone, Marionette, $, _)->
			
			class PageJson extends Backbone.Model

				idAttribute : 'page_id'

				name : 'page-json'


			API = 
				getPageJSON:(pageId)->
					
					json = new PageJson 
									page_id : parseInt pageId
					json.fetch()
					json

			# handlers
			App.reqres.setHandler "get:page:json", (pageId)->
				API.getPageJSON pageId