define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.Row.Views', (Views, App, Backbone, Marionette, $, _)->
		

		# Menu item view
		class Views.RowView extends Marionette.ItemView

			className : 'row'

			template : '<div data-class="6" class="col-md-6 column empty-column"></div>
						<div data-class="6" class="col-md-6 column empty-column"></div>'

			onRender:()->
				@$el.children('.column').sortable 
										revert 		: 'invalid'
										items 		: '> .element-wrapper'
										connectWith : '.droppable-column,.column'
										handle 		: '.aj-imp-drag-handle'
										start: (e, ui)->
											ui.placeholder.height ui.item.height()
										helper 		: 'clone'
										opacity		: .65
										remove 		: (evt, ui)->
											if $(evt.target).children().length is 0
												$(evt.target).addClass 'empty-column'
										receive 	: (e,ui)->
											$(e.target).removeClass 'empty-column'
			onShow:()->		
				_.delay => 
					@setColumnResizer()
				,200

			# set new classes on style change
			onStyleChange : (newStyle, old)->
				console.log newStyle
				@$el.removeClass(old) if not _(old).isEmpty()
				@$el.addClass newStyle

			onColumnCountChanged:(columnCount)->
				@adjustColumnsInRow(columnCount)

			columnCount:()->
				@$el.children('.column').length

			getColumns:()->
				@$el.children('.column')

			getResizers:()->
				@$el.closest('.element-controls').find('.aj-imp-col-divider')

			getColumnAt:(index)->
				columns = @$el.children('.column')
				columns[index]

			clearResizers:()->
				for resizer in @getResizers()
					$(resizer).draggable 'destroy'
					return

			destroySortableColumns:->
				@$el.children('.column').sortable 'destroy'

			onClose:->
				@clearResizers()
				@destroySortableColumns()

			# set column resizer
			setColumnResizer:()->
				
				@clearResizers()

				#bail if only one column is present
				if @columnCount() is 1
					return

				template = '<div class="aj-imp-col-divider">
								<p title="Move">
									<span class="bicon icon-uniF140"></span>
								</p>
							</div>'

				numberOfResizers = this.columnCount() - 1

				_.each _.range(numberOfResizers),(ele, index)=>
					column = @getColumnAt(index + 1)
					left = $(column).position().left
					resizer = $(template)
					resizer.attr('data-position', (index + 1))
					resizer.css('left', left)
					console.log @$el.find('.element-controls')
					@$el.closest('.element-wrapper').find('.element-controls').append(resizer)
					@makeResizer resizer 


			makeResizer:(resizer) ->
				row = resizer.parent()
				snap = row.width()
				snap = snap / 12
				resizer.draggable
					axis: "x"
					containment: row
					grid: [ snap, 0 ]
					start: (event, ui)=>
						ui.helper.start = ui.originalPosition  if _.isUndefined(ui.helper.start)
					stop: (event, ui)=>
						ui.helper.start = ui.position
					drag: (event, ui)=>
						p = Math.round(ui.position.left)
						s = Math.round(ui.helper.start.left)
						if p > s
							ui.helper.start = ui.position
							position = $(event.target).attr("data-position")
							@resizeColumns "right", parseInt(position)
						else if p < s
							ui.helper.start = ui.position
							position = $(event.target).attr("data-position")
							@resizeColumns "left", parseInt(position)

				
			resizeColumns : (direction, position)->
				#get columns to adjust width depending on position value.
				#columns to adjust  = row.elements[postion - 1] and row.elements[position]
				columns = []
				columns.push @getColumnAt(position - 1)
				columns.push @getColumnAt(position)
				currentClassZero = parseInt $(columns[0]).attr 'data-class'
				currentClassOne  = parseInt $(columns[1]).attr 'data-class'

				#return if one column class is set to zero
				return  if currentClassZero - 1 is 0 or currentClassOne - 1 is 0

				#remove class
				$(columns[0]).removeClass "col-md-#{currentClassZero}"
				$(columns[1]).removeClass "col-md-#{currentClassOne}"

				switch direction
					when "right"
						currentClassZero++
						currentClassOne--
					when "left"
						currentClassZero--
						currentClassOne++
						
				$(columns[0]).attr('data-class',currentClassZero).addClass "col-md-#{currentClassZero}"
				$(columns[1]).attr('data-class',currentClassOne).addClass "col-md-#{currentClassOne}"

			# add new columns
			addNewColumn:(colClass)->
				template = _.template '<div data-class="{{cclass}}" class="col-md-{{cclass}} column empty-column"></div>', cclass : colClass
				@$el.append template					
				
			# adjust columns in row
			adjustColumnsInRow :(count)=>
				requestedColumns = count
				#if same column count is clicked ignore
				return  if requestedColumns is @columnCount()

				colClass = 12 / requestedColumns
				
				if requestedColumns > @columnCount()
					extraColumns = requestedColumns - @columnCount()
					#adjust class of existing columns
					_.each @getColumns(), (column, index)=>
						currentClass = $(column).attr 'data-class'
						$(column).removeClass("col-md-#{currentClass}").addClass("col-md-#{colClass}").attr 'data-class', colClass

					_.each _.range(extraColumns), =>
						@addNewColumn colClass

				else if requestedColumns < @columnCount()
					emptyColumns = []
					_.each @elements, (column, index) ->
						emptyColumns.push column  if column.isEmpty()

					emptyColsLen = emptyColumns.length
				
					#first check
					if emptyColsLen is 0
						alert "None of the columns are empty. Please delete elements inside columns to remove"
						return
				
					#check if current columns - requested columns > empty columns
					if @columnCount() - requestedColumns > emptyColsLen
						alert "Unable to perform this action"
						return
					
					colsToRemove = 0
				
					#check if current columns - requested columns <= empty columns
					if @columnCount() - requestedColumns <= emptyColsLen
						colsToRemove = @columnCount() - requestedColumns
					else
						colsToRemove = emptyColsLen - requestedColumns
					
					nCols = []
				
					#get indexes to remove
					_.each @elements, (column, index) ->
					if colsToRemove is 0 or not column.isEmpty()
						nCols.push column
						return
					column.destroy()
					colsToRemove--

					@elements = []
					@elements = nCols
				
					#adjust class of existing columns
					_.each @elements, (column, index) ->
						column.setColumnClass colClass

			  
				#set active column count
				$(evt.target).parent().addClass("active").siblings().removeClass "active"
				@sortableColumns()
				@appendColumnResizer()

	

