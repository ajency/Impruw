define(['builder/views/elements/BuilderElement','text!builder/templates/elements/TitleElement.hbs', 'global'], 
		function(BuilderElement, template, global){

			var TitleElement =   BuilderElement.extend({

                //class name for view
                className           : 'aj-imp-elem-title element',
                
                //define template for control
				template            : template,
                
                //element type
                elementType          : 'TitleElement',
                
                //identify element type
                type                : 'title',
                
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
                    
                    this.parent = options.parent;
                 
                    this.id = 'title-' + global.generateRandomId();
                    
                    this.$el.attr('id', this.id);

                    //drop mode
                    if(_.isUndefined(options.config)){
                    }
                    else{
                        this.setProperties(options.config);
                        if(!_.isUndefined(options.config.className))
                           this.contentClasses = options.config.className;
                    }

                    this.setParent(options.parent);
                    this.setContextMenu();
                }
            });
            
            return TitleElement;
        });
  
    

