define(['builder/views/elements/BuilderElement', 'builder/views/elements/layout/BuilderRowColumn', 
        'text!builder/templates/elements/layout/BuilderRow.hbs', 'global'], 
    
		function(BuilderElement, BuilderRowColumn, template, global){

			var BuilderRow = BuilderElement.extend({

                //create a div element with class "row"
				className           : 'row',

				//define template for control
				template            : template,

				//set name for row. Will be used to generate unique ID for each control
				type                : 'row',
                
                //set height to be assigned to placeholder and helper
                placeHolderHeight   : 120, 
                
                // views
                columns             : [],
                
                //total columns
                totalColumns        : 2,
                
                
				//register events
				events : {
					'mouseenter'                        : 'rowMouseEnter',
                    'mouseleave'                        : 'rowMouseLeave',
                    'click > .aj-imp-delete-btn'        : 'destroyElement',
                    'click > .aj-imp-col-sel ul li a'   : 'adjustColumnsInRow' 
				},

                //used to identify drag direction(right / left)
                prevX : -1,
                
                /**
                 * Intialize the view.
                 * Set the parent for the view if passed.
                 * 
                 * @param {type} opt
                 * @returns {undefined}
                 */
                initialize : function(opt){
                    
                    _.bindAll(this, 'adjustColumnsInRow', 'generateBuilderMarkup', 'sortableColumns', 'addNewColumn',
                                    'columnCount', 'getColumns', 'getColumn', 'rowMouseEnter', 'rowMouseLeave', 'adjustColumnDimension',
                                    'allColumnsEmpty', 'emptyColumns', 'appendColumnResizer' , 'clearResizers', 'makeResizer');
                    
                    this.parent = opt.parent;
                    
                    this.$el.attr('data-placeholder-height',this.placeHolderHeight);
                    
                    this.on('adjust_column_dimension', this.adjustColumnDimension);
                    
                    this.id = this.type + '-' + global.generateRandomId();
                    
                    //set random ID for control
                    this.$el.attr('id' , this.id);
                    
                    //this.listenTo('column_removed', this.handleColumnRemoval);
                },
                
                /**
                 * Triggered when new controls are dropped into columns
                 * Once new controls are dropped in column the column heights can vary.
                 * This function get the column with maximum height and assign the same
                 * height to all of its siblings and trigger the height_changed event for
                 * each column so the column can handle its condition of new height.
                 * @returns {undefined}
                 */        
                adjustColumnDimension : function(){
                    
                    var height = [];
                    
                    this.$el.children('.column').css('min-height','10px');
                    
                    _.each(this.columns, function(column, index){
                        height.push(column.$el.height());
                    });
                    
                    var newHeight = _.max(height);
                    
                    newHeight = (newHeight == 0) ? 120 : newHeight;
                    
                    _.each(this.columns, function(column, index){
                        var prevHeight = column.$el.height();
                        column.$el.css('min-height',newHeight + 14);
                        column.trigger('height_changed', prevHeight, newHeight);
                    });
                    
                    this.sortableColumns();
                    
                    if(this.parent.type === 'column')
                        this.parent.parent.adjustColumnDimension();
                   
                },
                
                /**
                 * Checks if all the columns in a row are empty
                 * 
                 * @returns {Boolean}
                 */
                allColumnsEmpty : function(){
                    
                    var is = true;
                    
                    _.each(this.columns, function(column, index){
                        
                        if(!column.isEmpty())
                            is = false;
                    
                    });
                    
                    return is;
                    
                },        

               /**
                 * Generates the Control markup to drop 
                 * @returns {unresolved}
                 */
                generateBuilderMarkup : function(){
                    
                    var self = this;
                    
                    //calculate the column class
                    var colClass = 12 / self.totalColumns;
                    
                    //avoid object caching
                    this.columns = [];
                    
                    //append columns
                    _.each(_.range(this.totalColumns), function(){
                         
                         var column = new BuilderRowColumn({parent : self});  
                         column.render(colClass);
                         self.columns.push(column);
                         self.$el.append(column.$el);
                         
                    }); 

                    //this.appendColumnResizer();
                    
                    //append column edit popover + drag handle + delete button
                    this.$el.append(_.template(this.template));
                    
                    //set divder left
                    this.$el.children('.aj-imp-col-divider').css('left', (Math.ceil(100 / this.columns)) +'%');
                    this.$el.children('.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-divider,.aj-imp-col-sel').show();
                    return this.$el;
                },

                /**
                * Add column rrsizers to row depending on number of columns
                */
                appendColumnResizer : function(){

                    this.clearResizers();

                    //bail if only one column is present
                    if(this.columnCount() == 1)
                        return;

                    var self = this;

                    var template = '<div class="aj-imp-col-divider">\
                                        <p title="Move">\
                                            <span class="icon-uniF140"></span>\
                                        </p>\
                                    </div>';

                    var numberOfResizers = this.columnCount() - 1;   

                    var left = 100 / this.columnCount();

                    _.each(_.range(numberOfResizers), function(ele,index){

                        var resizer = $(template);
                        
                        resizer.attr('data-position',(index + 1));

                        resizer.css('left', (left * (index + 1)) + '%');
                        
                        self.$el.append(resizer);
                        
                        self.makeResizer(resizer);
                        
                    });           

                },

                /**
                * Make resizer
                */
                makeResizer : function(resizer){

                    var self = this;

                    var row = resizer.parent();

                    var snap = row.width();
                    
                    snap = snap / 12

                    resizer.draggable({
                        axis : 'x',
                        containment : row,
                        grid : [snap,0],
                        start : function(event, ui){
                            ui.helper.start = ui.originalPosition;
                        },
                        drag : function(event, ui) {
                            if(ui.position.left > ui.helper.start.left){
                                ui.helper.start = ui.position;
                                var position = $(event.target).attr('data-position');
                                self.resizeColumns('right',position);
                            }
                            else if(ui.position.left < ui.helper.start.left){
                                ui.helper.start = ui.position;
                                var position = $(event.target).attr('data-position');
                                self.resizeColumns('left',position);
                            }
                        }
                    });

                },

                /**
                *   
                */
                resizeColumns : function(direction, position){

                    var self = this;

                    //get columns to adjust width depending on position value.
                    //columns to adjust  = row.columns[postion - 1] and row.columns[position]
                    var columns  = [];

                    columns.push(this.columns[position - 1]);
                    
                    columns.push(this.columns[position]);
                    
                    var currentClassZero = columns[0].getCurrentClass();
                    
                    var currentClassOne  = columns[1].getCurrentClass();

                    //return if one column class is set to zero
                    if(currentClassZero - 1 === 0 || currentClassOne - 1 === 0)
                        return;
                    
                    switch(direction){

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
                clearResizers : function(){

                    this.$el.children('.aj-imp-col-divider').remove();

                },
                
                /**
                 * Devides the parent row into nmber of columns
                 * @returns {undefined}
                 */        
                adjustColumnsInRow : function(evt){
                    
                    evt.preventDefault();
                    
                    evt.stopPropagation();
                    
                    var requestedColumns = parseInt($(evt.target).text());
                    
                    //if same column count is clicked ignore
                    if(requestedColumns === this.columnCount())
                        return;
                    
                    var self = this;
                    
                    var colClass = 12 / requestedColumns;
                    
                    if(requestedColumns > this.columnCount()){
                        
                        var extraColumns = requestedColumns - this.columnCount();
                        
                        //adjust class of existing columns
                        _.each(this.columns, function(column, index){
                            
                            column.setColumnClass(colClass);

                        });
                        
                        _.each(_.range(extraColumns), function(){
                            
                            self.addNewColumn(colClass);
                        
                        });
                         
                    }
                    else if(requestedColumns < this.columnCount()){
                        
                        var emptyColumns = [];
                        
                        _.each(this.columns, function(column, index){
                            
                            if(column.isEmpty())
                                emptyColumns.push(column);
                            
                        });
                        
                        var emptyColsLen = emptyColumns.length;
                        //first check
                        if(emptyColsLen === 0 ){
                            alert("None of the columns are empty. Please delete elements inside columns to remove");
                            return;
                        }
                        
                        //check if current columns - requested columns > empty columns
                        if(this.columnCount() - requestedColumns > emptyColsLen){
                            alert("Unable to perform this action");
                            return;
                        }
                        
                        var colsToRemove = 0;
                        
                        //check if current columns - requested columns <= empty columns
                        if(this.columnCount() - requestedColumns <= emptyColsLen){
                           
                            colsToRemove = this.columnCount() - requestedColumns;
                          
                        }
                        else{
                            
                            colsToRemove = emptyColsLen - requestedColumns;
                            
                        }
                        
                        var nCols = [];
                        
                        //get indexes to remove
                        _.each(this.columns, function(column, index){

                            if(colsToRemove === 0 || !column.isEmpty()){
                                nCols.push(column);
                                return;
                            }

                            column.destroy();
                            colsToRemove--;

                        });
                        
                        this.columns = [];
                        this.columns = nCols;
                        
                        //adjust class of existing columns
                        _.each(this.columns, function(column, index){
                            
                            column.$el.removeAttr('class').attr('class','column col-sm-'+colClass);
                            column.setCurrentClass(colClass);
                        
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
                sortableColumns : function(){
                    
                    _.each(this.columns, function(column, index){
                        
                        //if(_.isFunction(column.makeColumnsSortable))
                            column.makeColumnsSortable();

                    }); 
                    
                },
                   
                
                /**
                 * Returns the column boject depending on col id
                 * @param {type} id
                 * @returns {undefined}
                 */
                getColumn : function(id){
                    
                    var column = false;
                    
                    _.each(this.getColumns(), function(col,index){
                        
                        if(col.id === id)
                            column = col;
                        
                    });
                    
                    return column;
                    
                },        
                
                /**
                 * Add a new column to Row
                 * 
                 * @returns {void}
                 */        
                addNewColumn : function(colClass){
                
                    var column = new BuilderRowColumn({parent : this});  
                    column.render(colClass);
                    column.setColumnClass(colClass);
                    this.columns.push(column);
                    this.$el.append(column.$el);
                    this.trigger('adjust_column_dimension');
                },
                
                /**
                 * Return the number of columns currently in the row
                 * 
                 * @returns {Int} Number of columns
                 */        
                columnCount : function(){
                    
                    return this.columns.length;
                    
                },
                
                /**
                 * Listen to mouse enter event
                 * @param {type} evt
                 * @returns void
                 */
                rowMouseEnter : function(evt){
                    
                    evt.stopPropagation();
                    
                    //remove hover style if row is a child of column
                    if(this.parent.type === 'column')
                        this.parent.parent.rowMouseLeave(evt);
                    
                    this.$el.css('border', '1px solid #ff7e00');
                    this.$el.children('.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-divider,.aj-imp-col-sel').show();
                },
                
                /**
                 * Listen to mouse leave event
                 * @param {type} evt
                 * @returns void
                 */        
                rowMouseLeave : function(evt){
                    
                    evt.stopPropagation();
                   
                    if(this.parent.type === 'column' && !evt.stop)
                        this.parent.parent.rowMouseEnter(evt);
                    
                    this.$el.css('border', '1px solid transparent');
                    this.$el.children('.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-divider,.aj-imp-col-sel').hide();
                },
                 
                /**
                 * 
                 * Return the columns for this row
                 * 
                 * @param {type} level
                 * @returns {undefined}
                 */        
                getColumns : function(){
                     return this.columns;  
                },
                        
                /**
                 * 
                 * Handle column Removal
                 * 
                 * @returns {undefined}
                 */        
                handleColumnRemoval : function(){
            
                },
                
                /**
                 * Loop through columns and empty it
                 * @returns {undefined}
                 */        
                emptyColumns : function(){
                    
                    _.each(this.getColumns(), function(column, index){
                        
                        column.makeEmpty();
                        
                    });
                    
                },
                        
                 /**
                 * Removes the element from the column
                 * @returns {undefined}
                 */        
                destroyElement : function(evt){
                    
                    evt.stopPropagation();
                    
                    if(!confirm("Are you sure?"))
                        return;

                    var self = this;
                    
                    if(this.parent.is('column')){
                       _.each(this.parent.elements, function(element, index){
                    
                            if(element.id === self.id){
                                self.parent.elements.splice(index,1);
                            }
                        
                        });
                        
                        //update the parent UI
                        this.parent.updateEmptyView();
                    }
                    
                    
                    this.emptyColumns();
                    
                    //finally remove itself
                    this.removeElement(evt);
                    
                }       
                
			});

			return BuilderRow;

		});