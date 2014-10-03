define ['app','jquery'], (App, $) ->

	AutoSaveHelper = 
		getPageJson : ()->

			if not App.builderRegion || not App.builderRegion.$el
				return false

			# error = false

			$site = App.builderRegion.$el

			_json = {}



			_.each ['header', 'page-content', 'footer'], (section, index)=>
				#if App.request "is:section:modified", section
				_json["#{section}-json"] = JSON.stringify AutoSaveHelper.getJson $site.find "#site-#{section}-region"
				
				# if _.isEmpty JSON.parse _json["#{section}-json"]
				# 	error = true

			# if error
			# 	return false

			_json

		# generate the JSON for the layout
		# loops through rows and nested columns and elements inside it
		getJson : ($element, arr = [])->

			# find all elements inside $element container
			elements = $element.children '.element-wrapper'

			_.each elements, (element, index)=>
				ele =
					element: $(element).find('form input[name="element"]').val()
					meta_id: parseInt $(element).find('form input[name="meta_id"]').val()

				if ele.element is 'Row'
					ele.draggable = $(element).children('form').find('input[name="draggable"]').val() is "true"
					ele.style = $(element).children('form').find('input[name="style"]').val()
					delete ele.meta_id
					ele.elements = []
					_.each $(element).children('.element-markup').children('.row').children('.column'), (column, index)=>
						className = $(column).attr 'data-class'
						col =
							position: index + 1
							element: 'Column'
							className: className
							elements: AutoSaveHelper.getJson $(column)

						ele.elements.push col
						return

				arr.push ele

			arr

	AutoSaveHelper