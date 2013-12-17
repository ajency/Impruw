define(['builder/views/elements/BuilderElement','text!builder/templates/elements/AddressElement.hbs', 'global'], 
		function(BuilderElement, template, global){

			var AddressElement =   BuilderElement.extend({

                //class name for view
                className           : 'aj-imp-elem-address element',
                
                //define template for control
				template            : template,
                
                //element type
                elementType          : 'AddressElement',
                
                //identify element type
                type                : 'address',
                
                //set height to be assigned to placeholder and helper
                placeHolderHeight   : 60,
                
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
                        this.id = this.type + '-' + global.generateRandomId();
                        this.$el.attr('id' , this.id); 
                    }
                    else{
                        this.setProperties(options.config);
                    }
                    this.generateMarkup();
                    this.setParent(options.parent);
                    this.setContextMenu();
                    
                },
                        
                /**
                 * Generates the markup for address
                 * and triggers the column droppable function
                 * 
                 * @param {type} col
                 * @returns {_L2.Anonym$0}
                 */        
                render : function(){
                    
                    return this;
                }   
                
            });
            
            return AddressElement;
        });
  
    

