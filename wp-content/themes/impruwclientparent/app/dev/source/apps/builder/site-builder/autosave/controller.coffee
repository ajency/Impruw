define ['app'], (App)->

	App.module 'SiteBuilderApp.AutoSave', (AutoSave, App, Backbone, Marionette, $, _)->

		$document = $(document)

		class AutoSaveLocal 

			constructor : ->
				@hasSupport = @checkLocalStorgeSupport()

			checkLocalStorgeSupport : ->
				test = Math.random().toString()
				result = false

				try 
					window.sessionStorage.setItem( 'wp-test', test )
					result = window.sessionStorage.getItem( 'wp-test' ) is test
					window.sessionStorage.removeItem( 'wp-test' )
				catch error 

				result


		class AutoSaveServer

			constructor : ->



		
		class AutoSaveAPI

			constructor : ->

				@$el = App.builderRegion.$el
				
				@lastTriggerSave = 0

				@local = new AutoSaveLocal
				@server = new AutoSaveServer

				console.log @local.hasSupport

				
				

			getPageJSON : ->
				json = getPageJson siteRegion

				json







		# get the json
		getPageJson = ($site)->
			_json = {}

			_.each ['header', 'page-content', 'footer'], (section, index)=>
				#if App.request "is:section:modified", section
				_json["#{section}-json"] = JSON.stringify getJson $site.find "#site-#{section}-region"

			_json

		# generate the JSON for the layout
		# loops through rows and nested columns and elements inside it
		getJson = ($element, arr = [])->

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
							elements: getJson $(column)

						ele.elements.push col
						return

				arr.push ele

			arr

		App.commands.setHandler "autosave-api", ->
			new AutoSaveAPI

