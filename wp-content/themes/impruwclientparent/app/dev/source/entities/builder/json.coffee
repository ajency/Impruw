define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.SiteBuilderJSON", (SiteBuilderJSON, App, Backbone, Marionette, $, _)->
			
			class PageJson extends Backbone.Model

				sync:(method, model, options = {}) ->
					_action 	= 'get-page-json'
					options.data =
							page_id	: model.get 'id'
							onlyPage: false

					xhr = Backbone.send _action,options
					model._fetch = xhr

				parse:(resp)->
					resp.data if resp.code is 'OK'


			API = 
				getPageJSON:(pageId)->
					
					json = new PageJson 
									id : parseInt pageId
					json.fetch()
					json

			# handlers
			App.reqres.setHandler "get:page:json", (pageId)->
				API.getPageJSON pageId