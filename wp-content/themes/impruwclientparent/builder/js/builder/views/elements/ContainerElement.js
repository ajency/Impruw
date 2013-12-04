define(['builder/views/elements/BuilderElement', 'global'], 
		function(BuilderElement, global){

			var ContainerElement = BuilderElement.extend({

                className           : 'container aj-imp-elem-container element',
                
                //identify element type
                type                : 'container',

                //set height to be assigned to placeholder and helper
                placeHolderHeight   : 100,
                
                /**
                 * Editable property
                 */
                editable      : false,
                
                /**
                 * 
                 */  
                draggable     : false,

                //events for view
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

                    //drop mode
                    if(_.isUndefined(options.config)){
                        //
                    }
                    else{
                        this.setProperties(options.config);
                    }

                    this.setParent(options.parent);
                    this.setClasses();
                    
                },
                
                /**
                 * Takes and element from from array and generates the markup and append it to itself
                 * @param {array} elements - 
                 * @param {int} index
                 * @returns {void}
                 */
                addElement : function(elements, index){
                    
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

                        self.$el.append(ele.render().$el);

                        if( !_.isUndefined(element.elements) && element.elements.length > 0)
                            ele.addElement(element.elements, 0);

                        index++;

                        self.addElement(elements, index);

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
  
    

