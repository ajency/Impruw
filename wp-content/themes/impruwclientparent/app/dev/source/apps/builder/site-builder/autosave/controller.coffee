
define ['app'], (App)->

	App.module 'SiteBuilderApp.AutoSave', (AutoSave, App, Backbone, Marionette, $, _)->

		# Controller class for showing header resion
		class AutoSave.Controller extends Marionette.Controller

			# initialize the controller. Get all required entities and show the view
			initialize:(opt = {})->

			# autoSave
			autoSave:->

				siteRegion = App.builderRegion.$el.find '#aj-imp-builder-drag-drop'

				_json 	= @_getPageJson siteRegion

				if not _.isObject _json
					throw new Error "invalid json..."

				_page_id = App.request "get:current:editable:page"

				options = 
					type 	: 'POST'
					url  	: AJAXURL
					data 	:
						action 	: 'save-page-json'
						json 	: JSON.stringify _json
						page_id : _page_id
					

				$.ajax( options ).done (response)->
					console.log response
				.fail (resp)->
					console.log 'error'

			# get the json
			_getPageJson:($site)->
				json = 
					header 	: @_getJson $site.find '#site-header-region'
					page 	: @_getJson $site.find '#site-page-content-region'
					footer 	: @_getJson $site.find '#site-footer-region'

				json

			# get json for an element
			_getJson:($element, arr = [])->

				elements = $element.find '.element-wrapper'

				_.each elements, (element, index)->
					
					ele =
						type 	: $(element).find('form input[name="element_type"]').val()
						meta_id : $(element).find('form input[name="meta_id"]').val()

					arr.push ele
					return

				arr


	App.SiteBuilderApp.AutoSave.Controller		