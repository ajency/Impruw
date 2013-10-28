define(['builder/views/controls/BuilderControl', 'global'], 
		function( BuilderControl, global){
            
            var BuilderRowColumn = BuilderControl.extend({
                
                // type of control
                type       : 'column',
                
                //holds all controls for this column
                controls    : [],
                
                
                initialize : function(opt){
                    this.parent = opt.parent;
                },
                
                /**
                 * Generates the markup for column 
                 * and triggers the column droppable function
                 * 
                 * @param {type} col
                 * @returns {_L2.Anonym$0}
                 */        
                render : function(col){
                    
                    this.$el.html('<div class="clearfix">&nbsp;<div class="aj-imp-drag-elements-message"><span class="glyphicon glyphicon-transfer"></span>Drag Elements Here</div></div>');
                    
                    this.$el.addClass('col-sm-' + col);
                    
                    this.enableDroppable();
                    
                    return this;
                },
                
                /**
                 * Makes the column as droppable
                 * Column can accept any draggable element 
                 * with attribute "data-control"
                 * 
                 * @returns  void
                 */        
                enableDroppable : function(){
                    
                    var self = this;
            
                    //accept droppable controls
					this.$el.droppable({
											accept : '*[data-control]',
											hoverClass: 'ui-state-highlight',
											greedy : true,
											drop: function( event, ui ) {

												var cClass = ui.draggable.attr('data-control');
												
                                                var Control = require('builder/views/controls/layout/' + cClass);
                                                
												if(_.isUndefined(Control))
													return;

												var control = new Control({parent : self});
                                                
                                                self.controls.push(control);
												
                                                $(event.target).html(control.generateBuilderMarkup());									
											}
										});
                },
                
                /**
                 * Checks if the column is empty or not.
                 * @uses controls property to check is any controls are added to column
                 * @returns {undefined}
                 */
                isEmpty : function(){
                    
                    if(this.controls.length === 0)
                        return true;
                    
                    return false;
                    
                }
                
            });
            
            
            return BuilderRowColumn;
  
});

