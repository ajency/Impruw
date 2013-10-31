define(['builder/views/elements/BuilderElement', 'global'], 
		function( BuilderElement, global){
            
            var BuilderRowColumn = BuilderElement.extend({
                
                // type of element
                type        : 'column',
                
                //holds all elements for this column
                elements    : [],
                
                className   : 'column',
                
                initialize  : function(opt){
                    
                    _.bindAll(this, 'isEmpty','clear','handleElementDrop','handleHeightChange','isEmpty','clear',
                                    'handleWidthChange');
                    
                    this.parent = opt.parent;
                    
                    //listen to height change event
                    this.on('height_changed',this.handleHeightChange);
                    
                    //listen to width change event
                    this.on('width_changed',this.handleWidthChange);
                },
                
                /**
                 * Generates the markup for column 
                 * and triggers the column droppable function
                 * 
                 * @param {type} col
                 * @returns {_L2.Anonym$0}
                 */        
                render : function(col){
                    
                    //this.$el.html('<div class="clearfix">&nbsp;<div class="aj-imp-drag-elements-message"><span class="glyphicon glyphicon-transfer"></span>Drag Elements Here</div></div>');
                    
                    this.$el.addClass('col-sm-' + col);
                    
                    this.id = 'column-' + global.generateRandomId();
                    
                    this.$el.attr('id', this.id);
                    
                    this.elements = [];
                    
                    return this;
                },
                
                /**
                 * Listen to height change of the column
                 * 
                 * @param {type} newHeight
                 * @returns {undefined}
                 */        
                handleHeightChange : function(prevHeight, newHeight){
                    
                    if(newHeight > prevHeight){
                        
                    }
                    else if(newHeight < prevHeight){
                        
                    }
                    
                },   
                        
                /**
                 * Listen to width change of the column
                 * 
                 * @param {type} newHeight
                 * @returns {undefined}
                 */        
                handleWidthChange : function(prevHeight, newHeight){
                    
                    if(newHeight > prevHeight){
                        
                    }
                    else if(newHeight < prevHeight){
                        
                    }
                    
                },           
                
                /**
                 * Identifies the control drop and handle accordingly
                 * 
                 * @param {type} controlName
                 * @returns {undefined}
                 */        
                handleElementDrop : function(elementName){
                    
                    if(this.isEmpty())
                        this.clear();
                    
                    var E = require('builder/views/Elements');
                    var element = new E[elementName]({parent: this});
                    this.elements.push(element);
                    
                    //
                    if(this.$el.find('*[data-element="'+elementName+'"]').length > 0)
                        this.$el.find('*[data-element="'+elementName+'"]').replaceWith(element.generateBuilderMarkup());
                    else
                        this.$el.append(element.generateBuilderMarkup());
                    
                    //reset height to auto
                    this.$el.height('auto');
                    
                    //added new control. Now trigger parent row adjust column dimension
                    this.parent.trigger('adjust_column_dimension');
                },   
                        
                
                /**
                 * Checks if the column is empty or not.
                 * @uses controls property to check is any controls are added to column
                 * @returns {undefined}
                 */
                isEmpty : function(){
                    
                    if(this.elements.length === 0)
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

