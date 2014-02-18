
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

				console.log json

				json

			# generate the JSON for the layout
			# loops through rows and nested columns and elements inside it
			_getJson:($element, arr = [])->

				# find all elements inside $element container
				elements = $element.children '.element-wrapper'

				_.each elements, (element, index)=>
					
					ele =
						element : $(element).find('form input[name="element"]').val()
						meta_id : parseInt $(element).find('form input[name="meta_id"]').val()

					if ele.type is 'Row'
						delete ele.meta_id
						ele.elements = []
						_.each $(element).find('.column'), (column, index)=>
							className = $(column).attr 'data-class'
							col = {}
							col.type = 'Column'
							col.className = "col-md-#{className}"
							col.elements = @_getJson $(column)
							ele.elements.push col 
							return

					arr.push ele
					
				arr


	App.SiteBuilderApp.AutoSave.Controller		