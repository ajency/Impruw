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

                //datasource
                dataSource          : null,

                //
                events : {
                    'mouseenter'                        : 'elementMouseEnter',
                    'mouseleave'                        : 'elementMouseLeave',
                    'click > .aj-imp-delete-btn'        : 'destroyElement',
                    'contextmenu'                       : 'showContextMenu',
                    'click'                             : 'showMediaManager'
                },
                
                /**
                 * Initialize view 
                 * 
                 * @param {type} options
                 * @returns {undefined}
                 */
                initialize : function(options){
                 
                    _.bindAll(this, 'elementMouseEnter','elementMouseLeave');
                    
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
                 * Show the media manager modal 
                 */
                showMediaManager : function(){

                   var self = this; 

                   require(['underscore','mediamanager'], function( _ , MediaManager){

                        //ensure Menu manager is created just once
                        if(_.isUndefined(self.mediamanager))
                            self.mediamanager = new MediaManager();

                        self.mediamanager.open(self);

                   });

                }
                
            });
            
            return ImageElement;
        });
  
    

