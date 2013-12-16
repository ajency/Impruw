define(['builder/views/elements/BuilderElement','text!builder/templates/elements/SliderElement.hbs', 'global'], 
		function(BuilderElement, template, global){

			var SliderElement =   BuilderElement.extend({

                //class name for view
                className           : 'aj-imp-elem-slider element',
                
                //define template for control
				template            : template,
                
                //element type
                elementType          : 'SliderElement',
                
                //identify element type
                type                : 'slider',
                
                //set height to be assigned to placeholder and helper
                placeHolderHeight   : 400,
                
                //
                events : {
                    'mouseenter'                 : 'elementMouseEnter',
                    'mouseleave'                 : 'elementMouseLeave',
                    'click > .aj-imp-delete-btn' : 'destroyElement',
                    'contextmenu'                : 'showContextMenu'
                },
                
                /**
                 * Initialize view 
                 * 
                 * @param {type} options
                 * @returns {undefined}
                 */
                initialize : function(options){
                    
                    //_.bindAll(this, 'rowMouseEnter','rowMouseLeave');
                    
                    //drop mode
                    if(_.isUndefined(options.config)){
                    }
                    else{
                        this.setProperties(options.config);
                    }
                    
                    this.setParent(options.parent);
                    
                    this.setContextMenu();
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
            
            return SliderElement;
        });
  
    

