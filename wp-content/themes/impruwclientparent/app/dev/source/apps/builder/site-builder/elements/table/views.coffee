define ['app','bootbox'], (App,bootbox)->

	# Row views
	App.module 'SiteBuilderApp.Element.Table.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.TableView extends Marionette.ItemView

			className : 'imp-table'

			template : '<div class="table-holder"></div>'

			ui:
				editableData: 'table td '
				editableHead : 'table th '

			events : 
				'click @ui.editableData,@ui.editableHead' : 'showEditor'
				'click .cke_editable' : (e)->
					e.stopPropagation()

				'blur .cke_editable' : 'saveTableMarkup'

				'click a': (e)->
					e.preventDefault()

				'click .table-holder' : 'destroyEditor'


				'column:resize:stop.rc table' : 'saveTableMarkup'


			modelEvents :
				'change:row' : 'rowChanged'
				'change:column' : 'columnChanged'
				'change:bordered' : 'changeBordered'
				'change:striped' : 'changeStriped'
				'change:style' : 'changeStyle'



			onShow :->
				tablecontent = @model.get('content')[WPML_DEFAULT_LANG] ? @model.get('content')
				@$el.find('.table-holder').html _.stripslashes tablecontent
				# @$el.find('#checkbox-bordered').prop 'checked', true if @$el.find('table').hasClass 'table-bordered'
				# @$el.find('#checkbox-striped').prop 'checked', true if @$el.find('table').hasClass 'table-striped'
				# @$el.find('#table-style').val @model.get 'style' 
				@$el.find('table').resizableColumns()
				@$el.parent().css 'padding-bottom', '7px'
				@$el.find('.table-responsive').height @$el.find('.table-responsive').height()
				@$el.find('.table-holder').height( @$el.find('.table-responsive').height() + 15 )
				@setResizable()
				# @$el.find('select').selectpicker()
				# @$el.find('[data-toggle="checkbox"]').radiocheck() 


			setResizable : ->
				@$el.find('.table-holder').resizable
					handles : 's'
					# create : (event,ui)=>
					# 	console.log ui
						# ui.size.height = @$el.find('.table-responsive').height() + 15
					resize : (event,ui)=>
						@$el.find('.table-responsive').height(ui.size.height - 15)

					start : (event,ui)=>
						@$el.find('.table-holder').resizable "option", "maxHeight", @$el.find('table').height()+17

					stop : (event,ui)=>
						@saveTableMarkup()	

			rowChanged:(model,rows)->
				currentRows = @$el.find('tbody tr').length 

				if currentRows is rows
					return

				else if currentRows < rows
					while currentRows isnt rows
						html = '<tr>'
						for index in [1..model.get('column')]
							html += '<td><div>demo</div></td>'
						html += '</tr>'
						@$el.find('tbody').append html
						@saveTableMarkup()
						currentRows++
				else
					bootbox.confirm _.polyglot.t('Removing a ROW might cause a loss of data.
						Do you want to continue?'),(result)=>
						if result
							while currentRows isnt rows
								@$el.find('tbody tr:last-of-type').remove()
								@saveTableMarkup()
								if @$el.find('table').height() <  @$el.find('.table-responsive').height()
									@$el.find('.table-responsive').height @$el.find('table').height()+2
									@$el.find('.table-holder').height @$el.find('.table-responsive').height()+15
								currentRows--
						else 
							model.set 'row', currentRows 
				

			columnChanged : (model,columns)->
				currentColumns = @$el.find('thead th').length 

				if currentColumns is columns
					return

				else if currentColumns < columns
					while currentColumns isnt columns
						@$el.find('thead tr').append '<th><div>demo</div></th>'
						tableRows = @$el.find('tbody tr')
						_.each tableRows,(row,index)->
							$(row).append '<td><div>demo</div></td>'

						@$el.find('table').resizableColumns('destroy')
						@$el.find('table').resizableColumns()
						@saveTableMarkup()
						currentColumns++
				else 
					bootbox.confirm _.polyglot.t('Removing a COLUMN might cause a loss of data.
						Do you want to continue?'),(result)=>
						if result
							while currentColumns isnt columns
								@$el.find('thead tr th:last-of-type').remove()
								tableRows = @$el.find('tbody tr td:last-of-type').remove()
								@$el.find('table').resizableColumns('destroy')
								@$el.find('table').resizableColumns()
								@saveTableMarkup()
								currentColumns--
						else
							model.set 'column', currentColumns 
							# console.log column+1


				




			showEditor :(evt)->
				evt.stopPropagation()
				if @editor
					@editor.destroy()
					@$el.find('td div, th div').removeAttr('contenteditable').removeAttr('style').removeAttr 'id'

					@saveTableMarkup()	
				
				console.log 'showEditor'
				id = _.uniqueId 'text-'
				$(evt.target).closest('td,th').find('div').attr('contenteditable', 'true').attr 'id', id
				CKEDITOR.on 'instanceCreated', @configureEditor
				@editor = CKEDITOR.inline document.getElementById id
				@editor.config.placeholder = 'Click to enter text.'
				$(evt.target).closest('td,th').find('div').trigger 'blur'
				_.delay =>
					$(evt.target).closest('td,th').find('div').trigger 'focus'
				,200
				# @editor.setData _.stripslashes @model.get 'content'

			configureEditor : (event) =>
				editor = event.editor
				element = editor.element

				if element.getAttribute('id') is @$el.attr 'id'
					editor.on 'configLoaded', ->
						editor.config.placeholder = 'Enter Data'

			destroyEditor :(evt)=>
				evt.stopPropagation()

				if @editor
					@editor.destroy()
					@editor = null
					console.log 'editor destroyed'
					@$el.find('td div, th div').removeAttr('contenteditable').removeAttr('style').removeAttr 'id'
					# $(evt.target).closest('div').attr('contenteditable', 'false').removeAttr 'id'
					@$el.find('table').resizableColumns('destroy')
					@$el.find('table').resizableColumns()
					@saveTableMarkup()				

			saveTableMarkup:->
				console.log 'save table'
				@trigger 'save:table',@$el.find('.table-holder')


			changeBordered : (model,bordered)->
				if bordered
					@$el.find('table').addClass 'table-bordered'

				else
					@$el.find('table').removeClass 'table-bordered'

				@saveTableMarkup()


			changeStriped :(model,striped)->
				if striped
					@$el.find('table').addClass 'table-striped'

				else
					@$el.find('table').removeClass 'table-striped'

				@saveTableMarkup()

			changeStyle : (model,style)->
				@$el.find('table').removeClass('style-1 style-2').addClass style

				@saveTableMarkup()

			onClose : ->
				@$el.find('table').resizableColumns('destroy')