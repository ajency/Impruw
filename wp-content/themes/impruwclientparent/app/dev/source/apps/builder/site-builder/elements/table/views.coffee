define ['app'], (App)->

	# Row views
	App.module 'SiteBuilderApp.Element.Table.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.TableView extends Marionette.ItemView

			className : 'imp-table'

			template : '<div class="table-settings-bar">
						 <div class="form-inline">
							<div class="control-group">
								<label for="spinner-01">Columns: </label>
							  	<div class="input-group spinner column-spinner">
									<input type="text" class="form-control" value="{{column}}">
									<div class="input-group-btn-vertical">
										<button class="btn btn-default"><i class="glyphicon glyphicon-chevron-up"></i></button>
										<button class="btn btn-default"><i class="glyphicon glyphicon-chevron-down"></i></button>
									</div>
								</div>
							</div>
							<div class="control-group">
								<label for="spinner-02">Rows: </label>
							  	<div class="input-group spinner row-spinner">
									<input type="text" class="form-control" value="{{row}}">
									<div class="input-group-btn-vertical">
										<button class="btn btn-default"><i class="glyphicon glyphicon-chevron-up"></i></button>
										<button class="btn btn-default"><i class="glyphicon glyphicon-chevron-down"></i></button>
									</div>
								</div>
							</div>
							<div class="control-group">
								<label for="style">Style: </label>
							  	<select id="style">
							  		<option value="1">Style 1</option>
							  		<option value="2">Style 2</option>
							  	</select>
							</div>
						</div>
					</div>
					<div class="table-holder"></div>'
			# itemContainer : 'tbody'

			ui:
				editableData: 'table td div'
				editableHead : 'table th div'

			events : 
				'dblclick @ui.editableData,@ui.editableHead' : 'showEditor'
				# 'blur @ui.editableData,@ui.editableHead' : 'destroyEditor'
				'click .cke_editable' : (e)->
					e.stopPropagation()
				'click .table-holder' : 'destroyEditor'

				'click .spinner .btn:first-of-type' : 'increaseCount'
				'click .spinner .btn:last-of-type' : 'decreaseCount'


				'column:resize:stop.rc table' : 'saveTableMarkup'



			onShow :->
				@$el.find('.table-holder').html _.stripslashes @model.get 'content'
				@$el.find('table').resizableColumns()
				@$el.find('select').selectpicker()


			increaseCount : (evt)->
				evt.stopPropagation()
				$(evt.target).closest('.spinner').find('input').val parseInt($(evt.target).closest('.spinner').find('input').val(),10)+1
				@columnChanged parseInt $(evt.target).closest('.spinner').find('input').val() if $(evt.target).closest('.spinner').hasClass 'column-spinner'
				@rowChanged parseInt $(evt.target).closest('.spinner').find('input').val() if $(evt.target).closest('.spinner').hasClass 'row-spinner'


			decreaseCount : (evt)->
				evt.stopPropagation()
				$(evt.target).closest('.spinner').find('input').val parseInt($(evt.target).closest('.spinner').find('input').val(),10)-1
				@columnChanged parseInt $(evt.target).closest('.spinner').find('input').val() if $(evt.target).closest('.spinner').hasClass 'column-spinner'
				@rowChanged parseInt $(evt.target).closest('.spinner').find('input').val() if $(evt.target).closest('.spinner').hasClass 'row-spinner'


			rowChanged:(row)->
				if row > @model.get 'row'
					@model.set 'row', row
					html = '<tr>'
					for index in [1..@model.get('column')]
						html += '<td><div>demo</div></td>'
					html += '</tr>'
					@$el.find('tbody').append html
				else
					if confirm 'Removing a ROW might cause a loss of data.
					 	Do you want to continue?'
					 	@model.set 'row', row
					 	@$el.find('tbody tr:last-of-type').remove()
					else 
					 	# model.set 'row', row+1
						@$el.find('.row-spinner input').val @model.get 'row'
				@saveTableMarkup()

			columnChanged : (column)->
				if column > @model.get 'column'
					@model.set 'column',column
					@$el.find('thead tr').append '<th><div>demo</div></th>'
					tableRows = @$el.find('tbody tr')
					_.each tableRows,(row,index)->
						$(row).append '<td><div>demo</div></td>'

					@$el.find('table').resizableColumns('destroy')
					@$el.find('table').resizableColumns()
				else 
					if confirm 'Removing a COLUMN might cause a loss of data.
					 	Do you want to continue?'
					 	@model.set 'column',column
					 	@$el.find('thead tr th:last-of-type').remove()
					 	tableRows = @$el.find('tbody tr td:last-of-type').remove()
					else
						# model.set 'column', column+1
						# console.log column+1
						@$el.find('.column-spinner input').val @model.get 'column'

				@saveTableMarkup()




			showEditor :(evt)->
				evt.stopPropagation()
				if @editor
					@editor.destroy()
				
				console.log 'showEditor'
				id = _.uniqueId 'text-'
				$(evt.target).closest('div').attr('contenteditable', 'true').attr 'id', id
				@editor = CKEDITOR.inline document.getElementById id
				# @editor.setData _.stripslashes @model.get 'content'

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
				@trigger 'save:table',@$el.find('.table-holder').html()




