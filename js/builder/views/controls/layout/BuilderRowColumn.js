define(['builder/views/controls/BuilderControl', 'global'], 
		function( BuilderControl, global){
            
            var BuilderRowColumn = BuilderControl.extend({
                
                // type of control
                type        : 'column',
                
                //holds all controls for this column
                controls    : [],
                
                className   : 'column',
                
                
                initialize  : function(opt){
                    
                    _.bindAll(this, 'isEmpty','clear','handleControlDrop');
                    
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
                    
                    this.id = 'column-' + global.generateRandomId();
                    
                    this.$el.attr('id', this.id);
                    
                    this.controls = [];
                    
                    return this;
                },
                
                /**
                 * Identifies the control drop and handle accordingly
                 * 
                 * @param {type} controlName
                 * @returns {undefined}
                 */        
                handleControlDrop : function(controlName){
                    
                    if(this.isEmpty())
                        this.clear();
                    
                    var C = require('builder/views/Controls');
                    var control = new C[controlName]({parent: this});
                    this.controls.push(control);
                    this.$el.append(control.generateBuilderMarkup());
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
                    
                },
                        
                /**
                 * clears the empty column
                 * @returns {undefined}
                 */        
                clear : function(){
                    this.$el.empty();
                }        
                
            });
            
            
            return BuilderRowColumn;
  
});

