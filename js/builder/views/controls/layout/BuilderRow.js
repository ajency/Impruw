define(['builder/views/controls/BuilderControl', 'builder/views/controls/layout/BuilderRowColumn', 'text!builder/templates/controls/layout/BuilderRow.hbs','global'], 
		function(BuilderControl, BuilderRowColumn, template, global){

			var BuilderRow = BuilderControl.extend({

                //create a div element with class "row"
				className : 'row',

				//define template for control
				template 	: template,

				//set name for row. Will be used to generate unique ID for each control
				type 		: 'row',
                
                //columns views
                columns     : [],
                
                //total columns
                totalColumns : 2,
                
                mouseOnControl : false,

				//register events
				events : {
					'mouseover'                         : 'rowMouseOver',
                    'mouseleave'                        : 'rowMouseLeave',
                    'click .aj-imp-delete-btn'          : 'removeControl',
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
                                    'addNewColumn','columnCount','getColumns','getColumn');
                    
                    this.parent = opt.parent;
                    
                    //this.listenTo('column_removed', this.handleColumnRemoval);
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
                    
                    log("Clicked");
                    
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
                        log(this.columns);
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
                    
                    //get the column object
                    var colID = $(event.target).attr('id');
                    var col = this.getColumn(colID);
                    
                    //check if col exists
                    if(col === false)
                        return;
                    
                    //get control to be dropped
                    var controlName = ui.helper.attr('data-control');
                    
                    //pass control to column view to handle
                    col.handleControlDrop(controlName);
                    
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
                    this.trigger('new_column_added',column);
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
                rowMouseOver : function(evt){
                    
                    evt.stopPropagation();
                    
                    if(this.mouseOnControl)
                        return;
                    
                    this.$el.css('border', '1px solid #ff7e00');
                    this.$el.find('.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-divider,.aj-imp-col-sel').show();
                },
                
                /**
                 * Listen to mouse out event
                 * @param {type} evt
                 * @returns void
                 */        
                rowMouseLeave : function(evt){
                    
                    evt.stopPropagation();
                    
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