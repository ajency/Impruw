define ['app','bootbox'], (App,bootbox)->

    # Row views
    App.module 'SiteBuilderApp.Element.Row.Views', (Views, App, Backbone, Marionette, $, _)->
        class ColumnView extends Marionette.ItemView
            className: 'column empty-column'
            tagName: 'div'
            template: ''
            onShow: ->
                @$el.attr 'data-position', @model.get 'position'
                @$el.addClass("col-md-#{@model.get 'className'}").attr 'data-class', @model.get 'className'
                @$el.sortable
                    revert: 'invalid'
                    items: '> .element-wrapper'
                    connectWith: '.droppable-column, .droppable-column .column'
                    handle: '.aj-imp-drag-handle'
                    start: (e, ui)->
#                        ui.placeholder.height ui.item.height()
                        window.dragging = true
                        return
                    stop: (e, ui)->
                        window.dragging = false
                        return
                    helper: @_getHelper
                    opacity: .65
                    placeholder: "ui-sortable-placeholder builder-sortable-placeholder"
                    out : (evt,ui)=>
                        @$el.closest('.row').closest('.element-wrapper').removeClass('hover-class')

                        window.dragging = false
                        return
                    over : ()=>
                        _.delay =>
                            @$el.closest('.row').closest('.element-wrapper').addClass('hover-class')
                        ,100
                        window.dragging = true
                        return
                    remove: (evt, ui)=>
                        @$el.trigger "element:moved", $(evt.target)
                        if $(evt.target).children().length is 0
                            $(evt.target).addClass 'empty-column'
                    update: (e, ui)=>
                        # @$el.trigger "element:moved", $(e.target)
                        if ui.item.find('form').find('input[name="element"]').val() is 'Row'
                            ui.item.children('.element-markup').children().trigger 'row:is:moved',
                                ui.item.children('.element-markup').children().prop 'id'
                        $(e.target).removeClass 'empty-column'


            onClose: ->
                @$el.sortable('destroy') if @$el.hasClass 'ui-sortable'

            _getHelper : (evt,original)=>

                left = $(original).width()/2
                @$el.sortable( "option", "cursorAt", { left: 50, top: 25 } );

                "<div class='element-helper'></div>"



        # Menu item view
        class Views.RowView extends Marionette.CollectionView

            className: 'row'

            template: ''

            itemView: ColumnView

            initialize: (opt = {})->
                @collection = new Backbone.Collection
                if opt.model.get('elements').length is 0
                    for i in [1, 2]
                        @collection.add
                            position: i
                            element: 'Column'
                            className: 6
                            elements: []
                else
                    for column in opt.model.get('elements')
                        col = _.clone column
                        delete col.elements
                        @collection.add col

            onShow: ()->
                @$el.closest('.element-wrapper').on 'click',@_addFocusClass
                   

                @$el.attr 'id', _.uniqueId 'row-'
                _.delay =>
                    @setColumnResizer()
                , 400

                @$el.on 'row:is:moved',(evt,id)=>

                    if @$el.attr('id') is id
                        console.log "#{id} is moved"
                        @setColumnResizer()
                  
                @$el.find('.column').on "class:changed",(e)=>
                    e.stopPropagation()
                    @$el.find('.row').trigger "adjust:resizer"

                @$el.on "adjust:resizer",(e)=>
                    e.stopPropagation()
                    @setColumnResizer()

            _addFocusClass : (e)->
                e.stopPropagation()
                $('.element-wrapper').removeClass('focus-class')
                $(e.target).closest('.element-wrapper').addClass('focus-class')

            # set new classes on style change
            onStyleChanged: (newStyle, old)->
                @$el.removeClass(old) if not _(old).isEmpty()
                @$el.addClass newStyle
                @setColumnResizer()

            onColumnCountChanged: (columnCount)->
                @adjustColumnsInRow(columnCount)

            columnCount: ()->
                @$el.children('.column').length

            getColumns: ()->
                @$el.children('.column')

            getResizers: ()->
                @$el.closest('.element-wrapper').find('.element-controls > .aj-imp-col-divider')

            getColumnAt: (index)->
                columns = @$el.children('.column')
                columns[index]

            clearResizers: ()->
                for resizer in @getResizers()
                    if $(resizer).hasClass 'ui-draggable'
                        $(resizer).draggable('destroy')
                        $(resizer).remove()

            destroySortableColumns: ->
                @$el.children('.column').sortable 'destroy'

            onClose: ->
                @clearResizers()
                @destroySortableColumns()
                @$el.closest('.element-wrapper').off 'click',@_addFocusClass

            # set column resizer
            setColumnResizer: ()->
                @clearResizers()

                #bail if only one column is present
                if @columnCount() is 1
                    return

                template = '<div class="aj-imp-col-divider">
                								<p title="'+_.polyglot.t('Move')+'">
                									<span class="bicon icon-uniF140"></span>
                								</p>
                							</div>'

                numberOfResizers = this.columnCount() - 1

                _.each _.range(numberOfResizers), (ele, index)=>
                    column = @getColumnAt(index + 1)
                    left = $(column).position().left
                    resizer = $(template)
                    resizer.attr('data-position', (index + 1))
                    resizer.css 'left', left
                    if not _.isUndefined $(column).closest('.element-wrapper').closest('.column')[0]
                        resizer.css 'left', left+8
                    @$el.closest('.element-wrapper').children('.element-controls').append resizer
                    @makeResizer resizer

                @setColumnResizerContainment()



            makeResizer: (resizer) ->
                row = resizer.parent().next().children('.row')
                snap = row.width()
                snap = snap / 12

                self = @
                dragResizer = _.throttle (event, ui)=>
                    p = Math.round(ui.position.left)
                    s = Math.round(ui.helper.start.left)
                    if p > s
                        ui.helper.start = ui.position
                        position = $(event.target).attr("data-position")
                        self.resizeColumns "right", parseInt(position)
                    else if p < s
                        ui.helper.start = ui.position
                        position = $(event.target).attr("data-position")
                        self.resizeColumns "left", parseInt(position)
                , 0

                resizer.draggable
                    axis: "x"
                    containment: row
                    grid: [ snap, 0 ]
                    start: (event, ui)=>
                        ui.helper.start = ui.originalPosition  if _.isUndefined(ui.helper.start)
                    stop: (event, ui)=>
                        ui.helper.start = ui.position
                        @setColumnResizerContainment()
                    drag: dragResizer



            resizeColumns: (direction, position)->
                #get columns to adjust width depending on position value.
                #columns to adjust  = row.elements[postion - 1] and row.elements[position]
                columns = []
                columns.push @getColumnAt(position - 1)
                columns.push @getColumnAt(position)
                currentClassZero = parseInt $(columns[0]).attr 'data-class'
                currentClassOne = parseInt $(columns[1]).attr 'data-class'

                #return if one column class is set to zero
                return  if currentClassZero is 0 or currentClassOne is 0


                switch direction
                    when "right"
                        newClassZero = currentClassZero + 1
                        newClassOne = currentClassOne - 1
                    when "left"
                        newClassZero = currentClassZero - 1
                        newClassOne = currentClassOne + 1

                return  if newClassZero is 0 or newClassOne is 0

                #remove class
                $(columns[0]).removeClass "col-md-#{currentClassZero}"
                $(columns[1]).removeClass "col-md-#{currentClassOne}"


                $(columns[0]).attr('data-class', newClassZero).addClass "col-md-#{newClassZero}"
                $(columns[1]).attr('data-class', newClassOne).addClass "col-md-#{newClassOne}"

                $(columns[0]).trigger "class:changed"
                $(columns[1]).trigger "class:changed"


            # setting the containment for resizer
            setColumnResizerContainment: ->
                resizers = @$el.closest('.element-wrapper').children('.element-controls').find('.aj-imp-col-divider')

                _.each resizers, (resizer)=>
                    width = @$el.width()
                    left = @$el.offset().left + width / 18

                    if typeof $(resizer).prev('.aj-imp-col-divider').position() isnt 'undefined'
                        left = @$el.offset().left + parseFloat($(resizer).prev('.aj-imp-col-divider').css('left')) + width / 18

                    right = @$el.offset().left + width - width / 18

                    if typeof $(resizer).next('.aj-imp-col-divider').position() isnt 'undefined'
                        right = @$el.offset().left + parseFloat($(resizer).next('.aj-imp-col-divider').css('left')) - width / 18

                    $(resizer).draggable "option", "containment", [left, 0 , right , 0]




            # add new columns
            addNewColumn: (colClass, position)->
                @collection.add
                    position: position
                    element: 'Column'
                    className: parseInt colClass
                    elements: []


            removeColumn: ($column)->
                #clear sortable
                _position = parseInt $column.attr 'data-position'
                column = @collection.findWhere position: _position
                @collection.remove column

            # adjust columns in row
            adjustColumnsInRow: (count)=>
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

                    count = @columnCount()
                    for i in _.range(extraColumns)
                        @addNewColumn colClass, (count + i + 1)


                else if requestedColumns < @columnCount()
                    emptyColumns = []
                    _.each @getColumns(), (column, index) ->
                        emptyColumns.push $(column) if $(column).isEmptyColumn()

                    emptyColsLen = emptyColumns.length

                    #first check
                    if emptyColsLen is 0
                        bootbox.alert "<h4 class='delete-message'>" + _.polyglot.t("None of the columns are empty. Please delete elements inside columns to remove") + "</h4>"
                        @model.set 'columncount',@columnCount()
                        @model.trigger 'column:count:setting:change',@columnCount()
                        return

                    #check if current columns - requested columns > empty columns
                    if @columnCount() - requestedColumns > emptyColsLen
                        bootbox.alert "<h4 class='delete-message'>" + _.polyglot.t("Unable to perform this action") + "</h4>"
                        @model.set 'columncount',@columnCount()
                        @model.trigger 'column:count:setting:change',@columnCount()
                        return

                    colsToRemove = 0

                    #check if current columns - requested columns <= empty columns
                    if @columnCount() - requestedColumns <= emptyColsLen
                        colsToRemove = @columnCount() - requestedColumns
                    else
                        colsToRemove = emptyColsLen - requestedColumns

                    nCols = []

                    #get columns to remove and reverse the array
                    cols = @getColumns().toArray().reverse()

                    _.each cols, (column, index)=>
                        if colsToRemove is 0 or not $(column).isEmptyColumn()
                            return
                        @removeColumn $(column)
                        colsToRemove--

                    #adjust class of existing columns
                    _.each @getColumns(), (column, index) ->
                        currentClass = $(column).attr 'data-class'
                        $(column).removeClass("col-md-#{currentClass}").addClass("col-md-#{colClass}").attr 'data-class', colClass

                @setColumnResizer()


