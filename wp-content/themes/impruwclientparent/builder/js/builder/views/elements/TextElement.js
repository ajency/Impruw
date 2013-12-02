define(['builder/views/elements/BuilderElement','text!builder/templates/elements/TextElement.hbs', 'global'], 
		function(BuilderElement, template, global){

			var TextElement =   BuilderElement.extend({

                //class name for view
                className           : 'aj-imp-elem-text element',
                
                //define template for control
				template            : template,
                
                //identify element type
                type                : 'text',
                
                //set height to be assigned to placeholder and helper
                placeHolderHeight   : 60,
                
                //
                events : {
                    'mouseenter'                 : 'elementMouseEnter',
                    'mouseleave'                 : 'elementMouseLeave',
                    'click > .aj-imp-delete-btn' : 'destroyElement'
                },
                
                /**
                 * Initialize view 
                 * 
                 * @param {type} options
                 * @returns {undefined}
                 */
                initialize : function(options){
                    
                    //_.bindAll(this, 'rowMouseEnter','rowMouseLeave');
                    
                    this.parent = options.parent;
                 
                    this.id = this.type + '-' + global.generateRandomId();
                    
                    this.$el.attr('id', this.id);
                    
                },
                        
                /**
                 * Generates the markup for column 
                 * and triggers the column droppable function
                 * 
                 * @param {type} col
                 * @returns {_L2.Anonym$0}
                 */        
                render : function(col){
                    
                    return this;
                }   
                
            });
            
            return TextElement;
        });
  
    

