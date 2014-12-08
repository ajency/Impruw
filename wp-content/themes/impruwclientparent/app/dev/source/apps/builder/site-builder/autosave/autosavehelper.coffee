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

				if ele.element is 'Tabs'
					ele.draggable = $(element).children('form').find('input[name="draggable"]').val() is "true"
					ele.style = $(element).children('form').find('input[name="style"]').val()
					ele.justified = $(element).children('form').find('input[name="justified"]').val()
					ele.meta_id = $(element).find('form input[name="meta_id"]').val()
					ele.elements = []
					_.each $(element).children('.element-markup').children('.tab-container').children('.tab-content').children('.column'), (column, index)=>
						id = $(column).attr('id')
						tabName = {}
						$(element).children('.element-markup').children('.tab-container').find("form[data-id=#{id}] input").each (index,input)->
							tabName[$(input).prop('name')] = $(input).val()
						# className = $(column).attr 'data-class'
						col =
							position: index + 1
							element: 'TabPane'
							tabName : tabName
							# className: className
							elements: AutoSaveHelper.getJson $(column)

						ele.elements.push col
						return

				if ele.element is 'Accordion'
					ele.draggable = $(element).children('form').find('input[name="draggable"]').val() is "true"
					ele.style = $(element).children('form').find('input[name="style"]').val()
					ele.meta_id = $(element).find('form input[name="meta_id"]').val()
					ele.elements = []
					_.each $(element).children('.element-markup').children('.accordion-container').children('.panel-group').children('.panel'), (column, index)=>
						# tabName = $(column).children('.panel-heading').find('a span').text()
						tabName = {}
						$(column).children('.panel-heading').find('form input').each (index,input)->
							tabName[$(input).prop('name')] = $(input).val()
						# className = $(column).attr 'data-class'
						col =
							position: index + 1
							element: 'AccordionTab'
							tabName : tabName
							# className: className
							elements: AutoSaveHelper.getJson $(column).children('.panel-collapse').children('.column')

						ele.elements.push col
						return

				arr.push ele

			arr

	AutoSaveHelper