define(['builder/views/elements/BuilderElement','text!builder/templates/elements/MenuElement.hbs', 'global'], 
		function(BuilderElement, template, global){

			var MenuElement =   BuilderElement.extend({

                //class name for view
                className           : 'aj-imp-elem-menu element',
                
                //define template for control
				template            : template,
                
                //element type
                elementType          : 'MenuElement',
                
                //identify element type
                type                : 'menu',
                
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
                    
                    //drop mode
                    if(_.isUndefined(options.config)){
                    }
                    else{
                        this.setProperties(options.config);
                        if(!_.isUndefined(options.config.className))
                           this.contentClasses = options.config.className;
                    }
                    
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
            
            return MenuElement;
        });
  
    

