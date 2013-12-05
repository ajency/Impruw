define(['builder/views/elements/BuilderElement','text!builder/templates/elements/ImageElement.hbs', 'global'], 
		function(BuilderElement, template, global){

			var ImageElement = BuilderElement.extend({

                className           : 'aj-imp-elem-image element',
                
                //define template for control
				template            : template,
                
                //element type
                elementType          : 'ImageElement',
                
                //identify element type
                type                : 'image',
                
                //set height to be assigned to placeholder and helper
                placeHolderHeight   : 100,

                //
                events : {
                    'mouseenter'                        : 'elementMouseEnter',
                    'mouseleave'                        : 'elementMouseLeave',
                    'click > .aj-imp-delete-btn'        : 'destroyElement',
                    'contextmenu'                        : 'showContextMenu'
                },
                
                /**
                 * Initialize view 
                 * 
                 * @param {type} options
                 * @returns {undefined}
                 */
                initialize : function(options){
                 
                    _.bindAll(this, 'elementMouseEnter','elementMouseLeave');
                    
                    this.parent = options.parent;
                 
                    this.id = 'image-' + global.generateRandomId();
                    
                    this.$el.attr('id', this.id);
                    
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
            
            return ImageElement;
        });
  
    

