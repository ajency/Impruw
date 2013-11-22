define(['builder/views/elements/BuilderElement', 'global'], 
		function(BuilderElement, global){

			var ContainerElement = BuilderElement.extend({

                className           : 'container aj-imp-elem-container element',
                
                //identify element type
                type                : 'container',

                //set height to be assigned to placeholder and helper
                placeHolderHeight   : 100,

                //
                events : {
                    //'mouseenter'                        : 'elementMouseEnter',
                    //'mouseleave'                        : 'elementMouseLeave',
                    //'click > .aj-imp-delete-btn'        : 'destroyElement'
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
                 
                    this.id = 'container-' + global.generateRandomId();
                    
                    this.$el.attr('id', this.id);

                    if(_.isUndefined(options.config))
                        return;

                    this.setProperties(options.config);

                    this.setClasses(options.config);

                    this.addElement(options.config.elements,0, this.$el);
                    
                },

                addElement : function(elements, index, parent){

                    if( index >= elements.length)
                        return;

                    var self = this;

                    //add element recall
                    var element = elements[index];
                    
                    var mod = '';
                    if(element.type == 'BuilderRow' || element.type == 'BuilderRowColumn'){
                        mod = 'builder/views/elements/layout/' + element.type;
                    }
                    else{
                        mod = 'builder/views/elements/' + element.type;
                    }

                    require([mod], function(Element){
                        
                        var ele = new Element({config : element, parent : self});

                        $(parent).append(ele.generateTemplateMarkup());

                        index++;

                        self.addElement(elements, index, parent);

                    });
                    
                },

                /**
                * 
                */
                generateTemplateMarkup : function(){

                    return this.$el;

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
            
            return ContainerElement;
        });
  
    

