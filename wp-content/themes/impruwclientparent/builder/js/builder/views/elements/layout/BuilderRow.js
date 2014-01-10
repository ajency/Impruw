define(['builderelement', 'builderrowcolumn', 'global'],

    function(BuilderElement, BuilderRowColumn, global) {

        var BuilderRow = BuilderElement.extend({

            elementType: 'BuilderRow',

            //create a div element with class "row"
            className: 'row',

            //set height to be assigned to placeholder and helper
            placeHolderHeight: 0,

            // views
            elements: [],

            //initial columns
            initialColumns: 2,

            //register events
            events: {
                'mouseenter'                        : 'elementMouseEnter',
                'mouseleave'                        : 'elementMouseLeave',
                'click > .aj-imp-delete-btn'        : 'destroyElement',
                'click > .aj-imp-col-sel ul li a'   : 'adjustColumnsInRow',
                'contextmenu'                       : 'showContextMenu'
            },

            /**
             * Intialize the view.
             * Set the parent for the view if passed.
             *
             * @param {type} opt
             * @returns {undefined}
             */
            initialize: function(options) {

                if (_.isUndefined(options.config)) {

                    this.generateDropMarkup();
                    this.id = this.type() + '-' + global.generateRandomId();
                    this.$el.attr('id', this.id);

                } else {

                    this.setProperties(options.config);

                }
                this.setContextMenu();
                this.setEditHandlers();
            },

            
            /**
             *
             * @returns {undefined}
             */
            generateJSON: function() {

                var self = this;

                var json = this.returnJSON();
                json.elements = [];

                if (self.getColumns().length > 0) {

                    var elements = [];

                    _.each(self.getColumns(), function(column, index) {

                        elements.push(column.generateJSON());

                    });

                    json.elements = elements;

                }

                return json;

            },

            /**
             * Takes and element from from array and generates the markup and append it to itself
             * @param {array} elements -
             * @param {int} index
             * @returns {void}
             */
            addElement: function(elements, index) {

                var element = elements[index];

                if (index >= elements.length || element.elementType !== 'BuilderRowColumn')
                    return;

                var self = this;

                var mod = 'builderrowcolumn';

                require([mod], function(Column) {

                    var column = new Column({
                        config: element,
                        parent: self
                    });

                    self.$el.append(column.render().$el);

                    self.elements = self.elements.concat([column]);

                    if (!_.isUndefined(element.elements) && element.elements.length > 0)
                        column.addElement(element.elements, 0);
                    else
                        column.addEmptyClass();

                    index++;

                    self.sortableColumns();

                    self.appendColumnResizer();

                    self.addElement(elements, index);

                });



            },

            /**
             * Triggered when new controls are dropped into columns
             * Once new controls are dropped in column the column heights can vary.
             * This function get the column with maximum height and assign the same
             * height to all of its siblings and trigger the height_changed event for
             * each column so the column can handle its condition of new height.
             * @returns {undefined}
             */
            adjustColumnDimension: function() {

                var height = [];

                this.$el.children('.column').css('min-height', '10px');

                _.each(this.elements, function(column, index) {

                    height.push(column.$el.height());

                });

                var newHeight = _.max(height);

                newHeight = (newHeight == 0) ? 120 : newHeight;

                _.each(this.elements, function(column, index) {

                    var prevHeight = column.$el.height();

                    column.$el.css('min-height', newHeight + 10);

                    column.trigger('height_changed', prevHeight, newHeight);

                });

                this.sortableColumns();
            },

            /**
             * Checks if all the columns in a row are empty
             *
             * @returns {Boolean}
             */
            allColumnsEmpty: function() {

                var is = true;

                _.each(this.elements, function(column, index) {

                    if (!column.isEmpty())
                        is = false;

                });

                return is;

            },

            /**
             * Generates the Control markup to drop
             * @returns {unresolved}
             */
            generateDropMarkup: function() {

                var self = this;

                //calculate the column class
                var colClass = 12 / self.initialColumns;

                //avoid object caching
                this.elements = [];

                //append columns
                _.each(_.range(this.initialColumns), _.bind(function() {

                    var column = new BuilderRowColumn({
                        parent: self,
                        colClass: colClass
                    });

                    column.render();
                    column.addEmptyClass();
                    
                    this.elements.push(column);
                    this.$el.append(column.$el);

                }, this));

                return this.$el;
            },

            /**
             * Sets the edit handler for the element
             * Identified by the editable property of the element
             * @returns {undefined}
             */
            setEditHandlers: function() {

                this.$el.append('<div class="aj-imp-delete-btn">\
                                            <span title="Delete">\
                                                &times;\
                                            </span>\
                                        </div>');

                if (this.isEditable()) {
                    this.$el.append('<div class="aj-imp-col-sel tooltip fade top in">\
                                            <div class="tooltip-arrow"></div>\
                                            <div class="tooltip-inner">\
                                                <label>Columns: </label>\
                                                <ul class="clearfix">\
                                                    <li><a href="#">1</a></li>\
                                                    <li  class="active"><a href="#">2</a></li>\
                                                    <li><a href="#">3</a></li>\
                                                    <li><a href="#">4</a></li>\
                                                    <li><a href="#">6</a></li>\
                                                    <li><a href="#">12</a></li>\
                                                </ul>\
                                            </div>\
                                        </div>');
                }

            },

            /**
             * Add column rrsizers to row depending on number of columns
             */
            appendColumnResizer: function() {

                this.clearResizers();

                //bail if only one column is present
                if (this.columnCount() == 1)
                    return;

                var self = this;

                var template = '<div class="aj-imp-col-divider">\
                                        <p title="Move">\
                                            <span class="icon-uniF140"></span>\
                                        </p>\
                                    </div>';

                var numberOfResizers = this.columnCount() - 1;

                _.each(_.range(numberOfResizers), function(ele, index) {

                    var column = self.getColumnAt(index + 1);

                    var left = column.$el.position().left;

                    var resizer = $(template);

                    resizer.attr('data-position', (index + 1));

                    resizer.css('left', left);

                    self.$el.append(resizer);

                    self.makeResizer(resizer);

                });

            },

            /**
             *  Returns the column object at specific index
             */
            getColumnAt: function(index) {

                if (index > this.columnCount())
                    return false;

                return this.elements[index];

            },

            /**
             * Make resizer
             */
            makeResizer: function(resizer) {

                var self = this;

                var row = resizer.parent();

                var snap = row.width();

                snap = snap / 12;

                resizer.draggable({
                    axis: 'x',
                    containment: row,
                    grid: [snap, 0],
                    start: function(event, ui) {

                        if (_.isUndefined(ui.helper.start))
                            ui.helper.start = ui.originalPosition;

                        self.$el.css('border', '1px solid transparent');

                        self.$el.children('.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-sel').hide();

                    },
                    stop: function(event, ui) {

                        ui.helper.start = ui.position;

                        self.$el.css('border', '1px solid #ff7e00');

                        self.$el.children('.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-sel').show();

                        //reset  resizers for all sub rows
                        _.each(self.getColumns(), function(column, index) {

                            var rows = column.getRowElements();

                            _.each(rows, function(row, index) {
                                row.appendColumnResizer();
                            });

                        });

                    },
                    drag: _.throttle(function(event, ui) {

                        var p = Math.round(ui.position.left);
                        var s = Math.round(ui.helper.start.left);

                        if (p > s) {

                            ui.helper.start = ui.position;

                            var position = $(event.target).attr('data-position');

                            self.resizeColumns('right', parseInt(position));

                        } else if (p < s) {

                            ui.helper.start = ui.position;

                            var position = $(event.target).attr('data-position');

                            self.resizeColumns('left', parseInt(position));

                        }
                    }, 500)
                });

            },

            /**
             * Resizes the column depending on drag direction
             * @param  {[type]} direction [description]
             * @param  {[type]} position  [description]
             * @return {[type]}           [description]
             */
            resizeColumns: function(direction, position) {

                var self = this;

                //get columns to adjust width depending on position value.
                //columns to adjust  = row.elements[postion - 1] and row.elements[position]
                var columns = [];

                columns.push(this.elements[position - 1]);

                columns.push(this.elements[position]);

                var currentClassZero = columns[0].getCurrentClass();

                var currentClassOne = columns[1].getCurrentClass();

                //return if one column class is set to zero
                if (currentClassZero - 1 === 0 || currentClassOne - 1 === 0)
                    return;

                switch (direction) {

                    case 'right':
                        currentClassZero++;
                        currentClassOne--;
                        break;

                    case 'left':
                        currentClassZero--;
                        currentClassOne++;
                        break;

                    default:
                        break;
                }

                columns[0].setColumnClass(currentClassZero);

                columns[1].setColumnClass(currentClassOne);

            },

            /**
             * Removes column resizers
             */
            clearResizers: function() {

                this.$el.children('.aj-imp-col-divider').remove();

            },

            /**
             * Devides the parent row into nmber of columns
             * @returns {undefined}
             */
            adjustColumnsInRow: function(evt) {

                evt.preventDefault();

                evt.stopPropagation();

                var requestedColumns = parseInt($(evt.target).text());

                //if same column count is clicked ignore
                if (requestedColumns === this.columnCount())
                    return;

                var self = this;

                var colClass = 12 / requestedColumns;

                if (requestedColumns > this.columnCount()) {

                    var extraColumns = requestedColumns - this.columnCount();

                    //adjust class of existing columns
                    _.each(this.elements, function(column, index) {
                        //column.$el.removeAttr('class').attr('class','column col-sm-'+colClass);
                        column.setColumnClass(colClass);

                    });

                    _.each(_.range(extraColumns), function() {

                        self.addNewColumn(colClass);

                    });

                } else if (requestedColumns < this.columnCount()) {

                    var emptyColumns = [];

                    _.each(this.elements, function(column, index) {

                        if (column.isEmpty())
                            emptyColumns.push(column);

                    });

                    var emptyColsLen = emptyColumns.length;
                    //first check
                    if (emptyColsLen === 0) {
                        alert("None of the columns are empty. Please delete elements inside columns to remove");
                        return;
                    }

                    //check if current columns - requested columns > empty columns
                    if (this.columnCount() - requestedColumns > emptyColsLen) {
                        alert("Unable to perform this action");
                        return;
                    }

                    var colsToRemove = 0;

                    //check if current columns - requested columns <= empty columns
                    if (this.columnCount() - requestedColumns <= emptyColsLen) {

                        colsToRemove = this.columnCount() - requestedColumns;

                    } else {

                        colsToRemove = emptyColsLen - requestedColumns;

                    }

                    var nCols = [];

                    //get indexes to remove
                    _.each(this.elements, function(column, index) {

                        if (colsToRemove === 0 || !column.isEmpty()) {
                            nCols.push(column);
                            return;
                        }

                        column.destroy();
                        colsToRemove--;

                    });

                    this.elements = [];
                    this.elements = nCols;

                    //adjust class of existing columns
                    _.each(this.elements, function(column, index) {

                        column.setColumnClass(colClass);

                    });
                }

                //set active column count
                $(evt.target).parent().addClass('active').siblings().removeClass('active');

                this.sortableColumns();

                this.appendColumnResizer();
            },

            /**
             * Make the columns sortable
             * @returns {undefined}
             */
            sortableColumns: function() {

                _.each(this.getColumns(), function(column, index) {

                    column.makeColumnsSortable();

                });

            },

            /**
             * Returns the column boject depending on col id
             * @param {type} id
             * @returns {undefined}
             */
            getColumn: function(id) {

                var column = false;

                _.each(this.getColumns(), function(col, index) {

                    if (col.get('id') === id)
                        column = col;

                });

                return column;

            },

            /**
             * Add a new column to Row
             *
             * @returns {void}
             */
            addNewColumn: function(colClass) {

                var column = new BuilderRowColumn({
                    parent: this,
                    colClass: colClass
                });
                column.render();
                column.setColumnClass(colClass);
                column.addEmptyClass();
                this.elements.push(column);
                this.$el.append(column.$el);
            },

            /**
             * Return the number of columns currently in the row
             *
             * @returns {Int} Number of columns
             */
            columnCount: function() {

                return this.elements.length;

            },

            /**
             * Listen to mouse enter event
             * @param {type} evt
             * @returns void
             */
            elementMouseEnter: function(evt) {

                evt.stopPropagation();

                var self = this;

                if (window.editorMode !== 'layout')
                    return;

                if (!_.isNull(window.prevmouseover))
                    window.prevmouseover.elementMouseLeave(evt);

                window.prevmouseover = this;

                this.$el.css('border', '1px solid #ff7e00');

                self.$el.children('.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-divider,.aj-imp-col-sel').stop().fadeIn();

            },

            /**
             * Listen to mouse leave event
             * @param {type} evt
             * @returns void
             */
            elementMouseLeave: function(evt) {

                evt.stopPropagation();

                var self = this;

                if (window.editorMode !== 'layout')
                    return;

                window.prevmouseover = null;

                this.$el.css('border', '1px solid transparent');

                //setTimeout(function(){
                self.$el.children('.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-divider,.aj-imp-col-sel').stop().hide();
                //},600);
            },

            /**
             *
             * Return the columns for this row
             *
             * @param {type} level
             * @returns {undefined}
             */
            getColumns: function() {

                return this.elements;
            },

            /**
             *
             * Handle column Removal
             *
             * @returns {undefined}
             */
            handleColumnRemoval: function() {

            },

            /**
             * Loop through columns and empty it
             * @returns {undefined}
             */
            emptyColumns: function() {

                _.each(this.getColumns(), function(column, index) {

                    column.makeEmpty();

                });

            },

            /**
             * Removes the element from the column
             * @returns {undefined}
             */
            destroyElement: function(evt) {

                evt.stopPropagation();

                evt.preventDefault();

                if (!confirm("Are you sure?"))
                    return;

                var parent = this.$el.parent();

                if(parent.hasClass('column')){
                    var parentId = $(parent).attr('id');
                    getAppInstance().vent.trigger('element-removed', this, parentId);
                }
                else{
                    var parentId = 'aj-imp-builder-drag-drop';
                    getAppInstance().vent.trigger('element-removed', this, parentId);

                }

                this.elementMouseLeave(evt);

                //finally remove itself
                this.removeElement();

            }

        });

        return BuilderRow;

    });