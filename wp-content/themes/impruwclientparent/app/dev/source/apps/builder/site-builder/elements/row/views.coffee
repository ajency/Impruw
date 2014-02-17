define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.Row.Views', (Views, App, Backbone, Marionette, $, _)->
		

		# Menu item view
		class Views.RowView extends Marionette.ItemView

			className : 'row'

			template : '<div data-class="6" class="col-md-6 column empty-column"></div>
						<div data-class="6" class="col-md-6 column empty-column"></div>'

			resizers : []

			onRender:()->
				@$el.find('.column').sortable 
										revert 		: 'invalid'
										items 		: '> .element-wrapper'
										connectWith : '.droppable-column,.column'
										#handle 		: '.aj-imp-drag-handle'
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
				@setColumnResizer()

			columnCount:()->
				@$el.children('.column').length

			getColumnAt:(index)->
				columns = @$el.children('.column')
				columns[index]

			clearResizers:()->
				for resizer in @resizers
					resizer.draggable('destroy')
					return

			# set column resizer
			setColumnResizer:()->
				
				@clearResizers()

				#bail if only one column is present
				if @columnCount() is 1
					return

				template = '<div class="aj-imp-col-divider">
								<p title="Move">
									<span class="icon-uniF140"></span>
								</p>
							</div>'

				numberOfResizers = this.columnCount() - 1

				_.each _.range(numberOfResizers),(ele, index)=>
					column = @getColumnAt(index + 1)
					left = $(column).position().left
					resizer = $(template)
					resizer.attr('data-position', (index + 1))
					resizer.css('left', left)
					@$el.append(resizer)
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

				@resizers.push resizer

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
						
				$(columns[0]).attr 'data-class',currentClassZero
				$(columns[1]).attr 'data-class',currentClassOne
				# add classes
				$(columns[0]).addClass "col-md-#{currentClassZero}"
				$(columns[1]).addClass "col-md-#{currentClassOne}"

	

