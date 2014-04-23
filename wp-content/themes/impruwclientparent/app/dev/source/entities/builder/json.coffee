define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.SiteBuilderJSON", (SiteBuilderJSON, App, Backbone, Marionette, $, _)->
			
			class PageJson extends Backbone.Model

				idAttribute : 'page_id'

				name : 'page-json'

				url:->
					pageId = @get 'page_id'
					revisionId = @get 'revision_id'
					"#{AJAXURL}?action=read-page-json&page_id=#{pageId}&revision_id=#{revisionId}"

				sync : (method, model, options)->

					params = 
						url : @url()
						type : "GET"
						dataType: "json"

					params = _.extend(params, options)

					xhr = Backbone.ajax params

					model._fetch = xhr

					xhr



			API = 
				getPageJSON:(pageId, revisionId)->
					json = new PageJson 
								
					json.set 
						page_id : parseInt pageId
						revision_id : parseInt revisionId

					json.fetch()								
					json

			# handlers
			App.reqres.setHandler "get:page:json", (pageId, revisionId)->
				console.log revisionId
				API.getPageJSON pageId, revisionId