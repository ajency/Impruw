define(['builder/views/elements/ImageElement','text!builder/templates/elements/ImageWithTextElement.hbs', 'global'], 
		function(ImageElement, template, global){

			var ImageWithTextElement = ImageElement.extend({

                className           : 'aj-imp-elem-image-with-text element',
                
                //define template for control
				template            : template,
                
                //element type
                elementType          : 'ImageWithTextElement',
                
                //identify element type
                type                : 'imagewithtext',
                
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
                 
                    _.bindAll(this, 'elementMouseEnter','elementMouseLeave','updateSelf');
                    
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
                render : function(){
                    
                    return this;
                },

                /**
                 * retunrs the JSOn
                 */
                generateJSON : function(){

                    var json = this.returnJSON();

                    if(!_.isNull(this.dataSource)){
                        json.data = {};
                        json.data.attachmentID = this.dataSource.get('id');
                        json.data.size         = 'medium';
                    }

                    return json;
                }
                
            });
            
            return ImageWithTextElement;
        });
  
    

