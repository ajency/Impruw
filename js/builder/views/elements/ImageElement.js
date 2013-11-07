define(['builder/views/elements/BuilderElement','text!builder/templates/elements/ImageElement.hbs', 'global'], 
		function(BuilderElement, template, global){

			var ImageElement = BuilderElement.extend({

                className           : 'aj-imp-elem-image element',
                
                //define template for control
				template            : template,
                
                //identify element type
                type                : 'image',
                
                //set height to be assigned to placeholder and helper
                placeHolderHeight   : 60,
                
                events : {
                    'mouseenter'                        : 'rowMouseEnter',
                    'mouseleave'                        : 'rowMouseLeave',
                    'click > .aj-imp-delete-btn'        : 'destroyElement'
                },
                
                /**
                 * Initialize view 
                 * 
                 * @param {type} options
                 * @returns {undefined}
                 */
                initialize : function(options){
                 
                    _.bindAll(this, 'rowMouseEnter','rowMouseLeave');
                    
                    this.parent = options.parent;
                 
                    this.id = 'image-' + global.generateRandomId();
                    
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
                    
                },
                
                /**
                 * Listen to mouse leave event
                 * @param {type} evt
                 * @returns void
                 */        
                rowMouseLeave : function(evt){
                    
                    evt.stopPropagation();
                    if(this.parent.type === 'column')
                        this.parent.parent.rowMouseEnter(evt);
                    
                }
                        
                
            });
            
            return ImageElement;
        });
  
    

