define ['app'
		'text!apps/builder/site-builder/elements/table/templates/table.html'
		'apps/builder/site-builder/elements/table/views'		
		'apps/builder/site-builder/elements/table/settings/controller'
],(App,tableTemplate, tableTemplateNb)->
	App.module 'SiteBuilderApp.Element.Table', (Table, App, Backbone, Marionette, $, _)->

		# menu controller
		class Table.Controller extends App.SiteBuilderApp.Element.Controller

			initialize : (options)->
				_.defaults options.modelData,
					element: 'Table'
					content	: 
						'en' : tableTemplate
						'nb' : tableTemplate
					row : 3
					column : 3

				super(options)

			bindEvents: ->
				# start listening to model events
				#@listenTo @layout.model, "change:content", @renderElement
				super()

			_getTableView: ->
				new Table.Views.TableView
					model: @layout.model
					# collection : @rowCollection

			tableOnStyleChange:(originalMarkup,referenceMarkup) ->
				console.log 'table style has changed'

				html_table = '<div>'+originalMarkup+'</div>'

				$content = $(html_table)

				if($(referenceMarkup).hasClass('style-1'))
					$content.find('table').addClass 'style-1'
				else
					$content.find('table').removeClass 'style-1'

				if($(referenceMarkup).hasClass('style-2'))
					$content.find('table').addClass 'style-2'
				else
					$content.find('table').removeClass 'style-2'

				if($(referenceMarkup).hasClass('table-striped'))
					$content.find('table').addClass 'table-striped'
				else
					$content.find('table').removeClass 'table-striped'	

				if($(referenceMarkup).hasClass('table-bordered'))
					$content.find('table').addClass 'table-bordered'
				else
					$content.find('table').removeClass 'table-bordered'

				modified_language_table_html = $content.html()
				# console.log modified_language_table_html
				modified_language_table_html

				

			tableOnColumnChange:(originalMarkup,referenceMarkup)->
				console.log 'table column changed'
				referenceColumnCount = $(referenceMarkup).find('thead th').length
				console.log referenceColumnCount
				currentColumnCount = $(originalMarkup).find('thead th').length
				console.log currentColumnCount
				currentRowCount = $(originalMarkup).find('tbody tr').length
				console.log currentRowCount

				html_table = '<div>'+originalMarkup+'</div>'

				$content = $(html_table)

				modified_language_table_html = ''

				if currentColumnCount is referenceColumnCount
					console.log  'No change in column count for both tables'
					modified_language_table_html = originalMarkup
				else if currentColumnCount < referenceColumnCount
                	console.log  'Current table has less columns'
                	while currentColumnCount < referenceColumnCount
                		$content.find('thead tr').append '<th><div>demo</div></th>'
                		tableRows = $content.find('tbody tr')
                		_.each tableRows,(row,index)->
                			$(row).append '<td><div>demo</div></td>'

                		# Get widths from reference table and assign them to the theads of translated tables
                		referenceTableHead = $(referenceMarkup).find('thead th')
                		thWidthArray = new Array()

                		_.each referenceTableHead,(column,index)->
                			thwidth = $(column).css('width')
                			thWidthArray.push thwidth

                		# console.log thWidthArray

                		tableHeadColumns = $content.find('thead th')
                		_.each tableHeadColumns,(column,index)->
                			$(column).css('width', thWidthArray[index])

                		modified_language_table_html = $content.html()
                		# console.log modified_language_table_html
                		currentColumnCount++
                else
                	console.log  'Current table has more columns'
                	while currentColumnCount > referenceColumnCount
                		$content.find('thead tr th:last-of-type').remove()
                		tableRows = $content.find('tbody tr td:last-of-type').remove()
                		
                		# Get widths from reference table and assign them to the theads of translated tables
                		referenceTableHead = $(referenceMarkup).find('thead th')
                		thWidthArray = new Array()

                		_.each referenceTableHead,(column,index)->
                			thwidth = $(column).css('width')
                			thWidthArray.push thwidth

                		# console.log thWidthArray

                		tableHeadColumns = $content.find('thead th')
                		_.each tableHeadColumns,(column,index)->
                			$(column).css('width', thWidthArray[index])

                		modified_language_table_html = $content.html()
                		# console.log modified_language_table_html
                		currentColumnCount--

                # console.log modified_language_table_html
                return modified_language_table_html


			tableOnRowChange: (originalMarkup,referenceMarkup)->
				console.log 'table row changed'
				referenceRowCount = $(referenceMarkup).find('tbody tr').length
				console.log referenceRowCount
				currentRowCount = $(originalMarkup).find('tbody tr').length
				console.log currentRowCount
				currentColumnCount = $(originalMarkup).find('thead th').length
				console.log currentColumnCount

				html_table = '<div>'+originalMarkup+'</div>'

				$content = $(html_table)

				modified_language_table_html = ''

				# Add reference rows for current columns
				if currentRowCount is referenceRowCount
					console.log  'No change is row count for both tables'
					modified_language_table_html = originalMarkup
				else if currentRowCount < referenceRowCount
                	console.log  'Current table has less rows'
                	# Add additonal rows to current table
                	while currentRowCount < referenceRowCount
                		html = '<tr>'
                		for index in [1..currentColumnCount]
                        	html += '<td><div>DEMO</div></td>'
                        html += '</tr>'
                        # console.log 'index-'+currentRowCount
                        # console.log html

                        $rowHtml = $(html)
                        $content.find("tbody").append $rowHtml
                        modified_language_table_html =  $content.html()
                        # console.log 'modified table'
                        # console.log modified_language_table_html
                		currentRowCount++
                else
                	console.log  'Current table has more rows'
                	while currentRowCount > referenceRowCount
                		$content.find('tbody tr:last-of-type').remove()
                		modified_language_table_html =  $content.html()
                		# console.log modified_language_table_html
                		currentRowCount--

                # console.log modified_language_table_html
                return modified_language_table_html


			_getTranslatedHtml:(originalMarkup, referenceMarkup)->
				console.log 'Get translated markup for table'
				originalMarkup = _.stripslashes originalMarkup
				referenceMarkup = _.stripslashes referenceMarkup

				# Check if number of rows has changed
				modifiedTranslatedMarkup = @tableOnRowChange(originalMarkup,referenceMarkup)

				console.log 'Aftr checking row chngs'
				console.log modifiedTranslatedMarkup
				
				# Check if number of columns has changed
				modifiedTranslatedMarkup = @tableOnColumnChange(modifiedTranslatedMarkup,referenceMarkup)

				console.log 'Aftr checking column chngs'
				console.log modifiedTranslatedMarkup
				
				# Check if style has changed
				modifiedTranslatedMarkup = @tableOnStyleChange(modifiedTranslatedMarkup,referenceMarkup)

				console.log 'Aftr checking styles'
				console.log modifiedTranslatedMarkup

				finalTranslatedMarkup = referenceMarkup

			# setup templates for the element
			renderElement: ()=>
				@removeSpinner()
				# @rowCollection = new Backbone.Collection

				# @rowCollection.set @layout.model.get('content')['data']

				# console.log @rowCollection
				@view = @_getTableView()

				# listen to "text:element:blur" event
				# this will pass the current html for the text element.
				# set it to the model. If it is a different markup it will
				# change the model changed property to true
				# save the new markup if the model is changed
				@listenTo @view, "save:table", (tableHolder) =>
					html = $(tableHolder).clone()
					$(html).find('.rc-handle-container').remove()
					$(html).find('.ui-resizable-handle').remove()
					$(html).find('td div, th div').removeAllAttr()

					original_data =  @layout.model.get('content')

					if _.isObject original_data
	                  	data = original_data
	               	else
	                  	data = {}
	                  	data['en'] = original_data

	                data[WPML_DEFAULT_LANG] = $(html).html()

	                languageLen = LANGUAGES.length

	                i=0
	                while i < 1
	                	allLanguages = LANGUAGES[i]
	                	languageCode = allLanguages.code
	                	languageCode = 'en'
	                	translatedTableHtml = @_getTranslatedHtml(data[languageCode],data[WPML_DEFAULT_LANG])
	                	i++

	                # stripslash each html content and save in json
	                newdata = {}
	                Object.getOwnPropertyNames(data).forEach (val, idx, array) ->
	                	newdata[val] = _.stripslashes data[val]

	                @layout.model.set 'content', newdata
	                @layout.model.save()
				
				@layout.elementRegion.show @view





