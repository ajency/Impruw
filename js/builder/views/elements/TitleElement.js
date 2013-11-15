define(['builder/views/elements/BuilderElement','text!builder/templates/elements/TitleElement.hbs', 'global'], 
		function(BuilderElement, template, global){

			var TitleElement = BuilderElement.extend({

                className           : 'aj-imp-elem-title element',
                
                //define template for control
				template            : template,
                
                //identify element type
                type                : 'title',
                
                //set height to be assigned to placeholder and helper
                placeHolderHeight   : 60,
                
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
                 
                    this.id = 'title-' + global.generateRandomId();
                    
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
            
            return TitleElement;
        });
  
    
