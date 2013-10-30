define(['builder/views/elements/BuilderElement', 'builder/views/elements/layout/BuilderRowColumn', 'text!builder/templates/elements/layout/BuilderRow.hbs','global'], 
		function(BuilderElement, BuilderRowColumn, template, global){

			var BuilderRow = BuilderElement.extend({

                //create a div element with class "row"
				className : 'row',

				//define template for control
				template 	: template,

				//set name for row. Will be used to generate unique ID for each control
				type 		: 'row',
                
                // views
                columns     : [],
                
                //total columns
                totalColumns : 2,
                
                
				//register events
				events : {
					'mouseenter'                        : 'rowMouseEnter',
                    'mouseleave'                        : 'rowMouseLeave',
                    'click .aj-imp-delete-btn'          : 'removeElement',
                    'click .aj-imp-col-sel ul li a'     : 'adjustColumnsInRow' 
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
                    
                    _.bindAll(this, 'adjustColumnsInRow','generateBuilderMarkup','sortableColumns','handleColumnDrop',
                                    'addNewColumn','columnCount','getColumns','getColumn','rowMouseEnter','rowMouseLeave',
                                    'adjustColumnDimension');
                    
                    this.parent = opt.parent;
                    
                    this.on('adjust_column_dimension', this.adjustColumnDimension);
                    
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
                    _.each(this.columns, function(column, index){
                        height.push(column.$el.height());
                    });
                    
                    var newHeight = _.max(height);
                    
                    _.each(this.columns, function(column, index){
                        var prevHeight = column.$el.height();
                        column.$el.height(newHeight);
                        column.trigger('height_changed', prevHeight, newHeight);
                    });
                   
                },        

               /**
                 * Generates the Control markup to drop 
                 * @returns {unresolved}
                 */
                generateBuilderMarkup : function(){
                    
                    var self = this;
                    
                    this.id = this.type + '-' + global.generateRandomId();
                    //set random ID for control
                    this.$el.attr('id' , this.id);
                    
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
                    
                    //append column edit popover + drag handle + delete button
                    this.$el.append(_.template(this.template));
                    
                    //set divder left
                    this.$el.find('.aj-imp-col-divider').css('left', (Math.ceil(100 / this.columns)) +'%');
                    this.$el.find('.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-divider,.aj-imp-col-sel').show();
                    return this.$el;
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
                            column.$el.removeAttr('class').attr('class','column col-sm-'+colClass);
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
                            alert("None of the columns are empty. Please delete controls inside columns to remove columns");
                            return;
                        }
                        
                        //check if current columns - requested columns > empty columns
                        if(this.columnCount() - requestedColumns > emptyColsLen){
                            alert("Unable to perform this action");
                            return;
                        }
                        
                        //check if current columns - requested columns <= empty columns
                        if(this.columnCount() - requestedColumns <= emptyColsLen){
                            //
                            var colsToRemove = emptyColsLen -  requestedColumns;
                            
                            //get indexes to remove
                            _.each(this.columns, function(column, index){

                                if(colsToRemove === 0)
                                        return;

                                if(!column.isEmpty())
                                        return;

                                column.toRemove = true;
                                colsToRemove--;

                            });
                            
                        }
                        
                        var nCols = [];
                        // remove the columns
                        _.each(this.columns, function(column, index){
                            
                            if(column.toRemove === true)
                               column.destroy();
                            else
                                nCols.push(column);
                        });
                        
                        this.columns = [];
                        this.columns = nCols;
                        //this.trigger('columns_removed',emptyColumns);

                        //adjust class of existing columns
                        _.each(this.columns, function(column, index){
                            
                            column.$el.removeAttr('class').attr('class','column col-sm-'+colClass);
                        
                        }); 
                    }
                    
                    //set active column count
                    $(evt.target).parent().addClass('active').siblings().removeClass('active');
                    
                    this.sortableColumns();
                },
                
                /**
                 * Make the columns sortable
                 * @returns {undefined}
                 */        
                sortableColumns : function(){
                    
                    var self = this;
                    
                    this.$el.find('.column').sortable({
                                                        connectWith : '.column',
                                                        opacity     : .65,
                                                        items       : '> .control, .row',
                                                        handle      : '.aj-imp-drag-handle',
                                                        receive     : self.handleColumnDrop
                                                   });
                    
                },
                
                /**
                 * Check for column drop event
                 * @param {type} event
                 * @param {type} ui
                 * @returns {undefined}
                 */        
                handleColumnDrop : function(event, ui){
                    
                    //bail if helper is null
                    if(_.isNull(ui.helper))
                        return;
                    
                    //get the column object
                    var colID = $(event.target).attr('id');
                    var col = this.getColumn(colID);
                    
                    //check if col exists
                    if(col === false)
                        return;
                    
                    //get control to be dropped
                    var elementName = ui.helper.attr('data-element');
                    
                    ui.helper.remove();
                    
                    //pass control to column view to handle
                    col.handleElementDrop(elementName);
                    
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
                    if(this.parent.type === 'column')
                        this.parent.parent.rowMouseLeave(evt);
                    
                    this.$el.css('border', '1px solid transparent');
                    this.$el.find('.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-divider,.aj-imp-col-sel').hide();
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
            
                }
                
			});

			return BuilderRow;

		});