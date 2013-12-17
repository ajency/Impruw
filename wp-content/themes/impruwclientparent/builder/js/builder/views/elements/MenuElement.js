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
                    'click > .aj-imp-delete-btn' : 'destroyElement',
                    'contextmenu'                : 'showContextMenu',
                    'click'                      : 'showModal'
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
                        if(!_.isUndefined(options.config.className))
                           this.contentClasses = options.config.className;
                    }
                    this.generateMarkup();
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
                },

                showModal : function(){

                   var self = this; 

                   require(['underscore','menumanager'], function( _ , MenuManager){

                        //ensure Menu manager is created just once
                        if(_.isUndefined(self.menumanager))
                            self.menumanager = new MenuManager();

                        self.menumanager.open();

                   });

                }
                
            });
            
            return MenuElement;
        });
  
    

