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

			modelEvents : 
				'change:row' : 'rowChanged'
				'change:column' : 'columnChanged'

			onShow :->
				@$el.find('.table-holder').html _.stripslashes @model.get 'content'
				@$el.find('table').resizableColumns()



			increaseCount : (evt)->
				evt.stopPropagation()
				$(evt.target).closest('.spinner').find('input').val parseInt($(evt.target).closest('.spinner').find('input').val(),10)+1
				@model.set 'column', $(evt.target).closest('.spinner').find('input').val() if $(evt.target).closest('.spinner').hasClass 'column-spinner'
				@model.set 'row', $(evt.target).closest('.spinner').find('input').val() if $(evt.target).closest('.spinner').hasClass 'row-spinner'


			decreaseCount : (evt)->
				evt.stopPropagation()
				$(evt.target).closest('.spinner').find('input').val parseInt($(evt.target).closest('.spinner').find('input').val(),10)-1
				@model.set 'column', $(evt.target).closest('.spinner').find('input').val() if $(evt.target).closest('.spinner').hasClass 'column-spinner'
				@model.set 'row', $(evt.target).closest('.spinner').find('input').val() if $(evt.target).closest('.spinner').hasClass 'row-spinner'


			rowChanged:(model,row)->
				if row > model.previous 'row'
					html = '<tr>'
					for ind in [1..model.get('column')]
						html += '<td><div>demo</div></td>'
					html += '</tr>'
					@$el.find('tbody').append html
				else
					# @todo : remove row

			columnChanged : (model,column)->
				if column > model.previous 'column'
					@$el.find('thead tr').append '<th><div>demo</div></th>'
					tableRows = @$el.find('tbody tr')
					_.each tableRows,(row,index)->
						$(row).append '<td><div>demo</div></td>'

					@$el.find('table').resizableColumns()
				else 
					# @todo : remove column


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
					console.log 'editor destroyed'
					@$el.find('td div, th div').attr('contenteditable', 'false').removeAttr 'id'
					# $(evt.target).closest('div').attr('contenteditable', 'false').removeAttr 'id'
				@$el.find('table').resizableColumns()






