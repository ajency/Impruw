define(['builder/views/elements/BuilderElement', 'global'], 
		function( BuilderElement,  global){
            
            var BuilderRowColumn = BuilderElement.extend({

                // type of element
                type          : 'column',
                
                elementType    : 'BuilderRowColumn',
                
                //holds all elements for this column
                elements      : [],
               
                //active class of column
                colClass  : 6,
                
                //className
                className     : 'column',
                
                //columns are non editable
                editable      : false,
                
                //columsn are non draggable
                draggable     : false,
                
                //disAllow settings
                disAllow      : {'isDraggable':1,'isEditable':1,'type':1},
                
                //register events
				events : {
					'contextmenu'                        : 'showContextMenu',
                    'click > .popover .updateProperties' : 'updateProperties'
				},
                
                /**
                 * Initailize the element
                 * Identifies the mode (Drop mode or template mode)
                 * @param {type} options
                 * @returns {undefined}
                 */
                initialize  : function(options){
                    
                    _.bindAll(this, 'isEmpty', 'clear', 'handleElementDrop', 'handleHeightChange', 'isEmpty', 'clear',
                                    'handleWidthChange', 'handleElementOverState', 'handleColumnDrop', 'makeColumnsSortable',
                                    'handleElementRemove','resetHeightAuto', 'holdCurrentColRef','updateEmptyView','makeEmpty',
                                    'setCurrentClass', 'setColumnClass','getCurrentClass', 'getRowElements','getElements');
                    
                    this.colClass = options.colClass;

                    //listen to height change event
                    this.on('height_changed',this.handleHeightChange);
                    
                    //listen to width change event
                    this.on('width_changed',this.handleWidthChange);

                    ////////////////////////////////////////////////

                    //drop mode
                    if(_.isUndefined(options.config)){

                        //this.generateDropMarkup();
                        this.id = this.type + '-' + global.generateRandomId();
                        this.$el.attr('id' , this.id); 
                    }
                    else{
                        this.setProperties(options.config);
                        this.colClass = options.config.colClass;
                    }

                    this.setParent(options.parent);
                    this.setClasses();
                    this.setHandlers();
                    this.setContextMenu();
                },
                
                
                
                /**
                 * 
                 * @returns {undefined}
                 */
                generateJSON : function(){
                   
                   var self = this;
                   
                   var json = self.returnJSON();
                   json.colClass = this.getCurrentClass();
                        
                   if(self.getElements().length > 0){
                        
                        var elements = [];
                        
                        _.each(self.getElements(), function(element, index){
                              
                            elements.push(element.generateJSON());
                             
                        });
                           
                        json.elements = elements;
                      
                   }
                   
                   return json;
                  
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
                    
                    //cannot add column inside a column
                    if(element.type === 'BuilderRowColumn')
                        return;

                    var mod = '';
                    if(element.type === 'BuilderRow'){
                        mod = 'builder/views/elements/layout/' + element.type;
                    }
                    else{
                        mod = 'builder/views/elements/' + element.type;
                    }

                    
                    require([mod], function(Element){
                        
                        var ele = new Element({config : element, parent : self});
                        
                        if(element.type === 'BuilderRow' || element.type === 'ContainerElement' ){
                           self.$el.append(ele.render().$el);
                        }
                        else{
                           self.$el.append(ele.generateMarkup());
                        }

                        //self.elements.push(ele); !imporatnt: .push failed to maintain scope
                        self.elements = self.elements.concat([ele]); //concat works!!!

                        if( !_.isUndefined(element.elements) && element.elements.length > 0){
                            
                            ele.addElement(element.elements, 0);
        
                        }
                        
                        index++;

                        self.addElement(elements, index);

                    });
                    
                },
                
                /**
                 * Adds an empty-column class 
                 * @returns {undefined}
                 */
                addEmptyClass : function(){
                   
                   this.$el.addClass('empty-column');
                   
                },
                
                /**
                 * Removes the empty-column class
                 * @returns {undefined}
                 */
                removeEmptyClass : function(){
                   
                   this.$el.removeClass('empty-column');
                   
                },
                
                /**
                 * Generates the markup for column 
                 * and triggers the column droppable function
                 * 
                 * @param {type} col
                 * @returns {_L2.Anonym$0}
                 */        
                render : function(){

                    var col = this.colClass;
                    
                    //this.$el.html('<div class="clearfix">&nbsp;<div class="aj-imp-drag-elements-message"><span class="glyphicon glyphicon-transfer"></span>Drag Elements Here</div></div>');
                    
                    this.$el.addClass('col-sm-' + col);
                    
                    this.id = 'column-' + global.generateRandomId();
                    
                    this.$el.attr('id', this.id);
                    
                    //reset object caching
                    this.elements = [];
                    
                    return this;
                },
                
                /**
                 * Listen to height change of the column
                 * 
                 * @param {type} newHeight
                 * @returns {undefined}
                 */        
                handleHeightChange : function(prevHeight, newHeight){
                    
                    if(newHeight > prevHeight){
                        
                    }
                    else if(newHeight < prevHeight){
                        
                    }
                    
                },   
                
                /**
                 * Make column sortable
                 * 
                 * @returns {undefined}
                 */        
                makeColumnsSortable : function(){
                    
                    var self = this;

                    this.$el.sortable({
                                        connectWith : '.layout-header,.layout-content,.layout-footer,.column',
                                        opacity     : .65,
                                        items       : '> .element, .row',
                                        handle      : '> .aj-imp-drag-handle',
                                        receive     : self.handleColumnDrop,
                                        sort        : self.handleElementOverState,
                                        activate    : self.holdCurrentColRef,
                                        stop        : function(){self.rearrangeElementOrder();}    
                                   });//.disableSelection(); 
                },
                        
                /**
                 * Holds current sender column reference
                 * 
                 * @param {type} event
                 * @param {type} ui
                 * @returns {undefined}
                 */        
                holdCurrentColRef : function(event, ui){
                    
                    event.stopPropagation();
                    
                    ui.helper.sender = this;
                    
                },        
                        
                /**
                 * 
                 * @param {type} event
                 * @param {type} ui
                 * @returns {undefined}
                 */        
                resetHeightAuto : function(event, ui){
            
                     this.$el.css('min-height','auto');
                },        
                        
                /**
                 * 
                 * Handle element removal state
                 * 
                 * @param {type} event
                 * @param {type} ui
                 * @returns {undefined}
                 */        
                handleElementRemove : function(receiver, sender, elementId){
                    
                    s = sender;

                    if(sender.is('editor')){

                        _.each(sender.elements, function(section, index){
                            
                            _.each(section, function(row, index){

                                if(row.id == elementId){
                                
                                    section.splice(index,1);//remove element

                                    receiver.elements.push(row); //add the same position
                                    
                                    //change parent
                                    row.setParent(receiver);
                                }
                            });
                            
                        });

                        log(receiver.elements);

                    }
                    else{
                        _.each(sender.elements, function(element, index){
                            
                            if(element.id == elementId){
                                
                                sender.elements.splice(index,1);//remove element

                                receiver.elements.push(element); //add the same position

                                //change parent
                                element.setParent(receiver);
                            }
                            
                        });
                    }
                    sender.updateEmptyView();

                },
                
                /**
                 * Checks if the column is empty
                 * If yes => Sets the background image
                 * @returns {undefined}
                 */        
                updateEmptyView : function(){
            
                    if(this.isEmpty()){
                        
                        this.addEmptyClass();
                        
                    }
                },
                
                /**
                 * Check for column drop event
                 * @param {type} event
                 * @param {type} ui
                 * @returns {undefined}
                 */        
                handleColumnDrop : function(event, ui){
                    
                    var receiver = this;
                    
                    //handle if helper is null
                    if(_.isNull(ui.helper)){
                        
                        var sender = ui.item.sender;
                        
                        this.$el.removeClass('empty-column');
                        
                        this.parent.trigger('adjust_column_dimension');
                        
                        var elementId = ui.item.attr('id');

                        this.handleElementRemove(receiver, sender, elementId);

                        return;
                    }
                    
                    //get control to be dropped
                    var elementName = ui.helper.attr('data-element');
                    
                    //pass control to column view to handle
                    this.handleElementDrop(elementName);
                   
                }, 
                                             
                /**
                 * Handle the out state for the dragged element
                 * 
                 * @returns {undefined}
                 */        
                handleElementOutState : function(event, ui){
                    
                },        
                
                /**
                 * Handle case when Element is over the droppable region
                 * 
                 * @param {type} event
                 * @param {type} ui
                 * @returns {undefined}
                 */        
                handleElementOverState : function(event , ui){
                   
                    var pHeight = ui.helper.attr('data-placeholder-height');
                    
                    ui.placeholder.height(parseInt(pHeight));
                    
                },
                                
                /**
                 * Listen to width change of the column
                 * 
                 * @param {type} newHeight
                 * @returns {undefined}
                 */        
                handleWidthChange : function(prevHeight, newHeight){
                    
                    if(newHeight > prevHeight){
                        
                    }
                    else if(newHeight < prevHeight){
                        
                    }
                    
                },           
                
                /**
                 * Identifies the control drop and handle accordingly
                 * 
                 * @param {type} controlName
                 * @returns {undefined}
                 */        
                handleElementDrop : function(elementName){
                    
                    var self = this;
                    
                    var path = '';
                    if(elementName === 'BuilderRow' || elementName === 'BuilderRowColumn')
                        path = 'builder/views/elements/layout/' + elementName;
                    else
                        path = 'builder/views/elements/' + elementName;
                    
                    //set loader
                    if(self.$el.find('*[data-element="'+elementName+'"]').length > 0)
                            self.$el.find('*[data-element="'+elementName+'"]').html('<div class="element-drop-loader"></div>');
                    
                    require([path], function(Element){

                        var element = new Element({parent: self});
                        
                        self.elements.push(element);

                        self.removeEmptyClass();
                        
                        var el = element.is('row') ? element.$el : element.generateMarkup();

                        if(self.$el.find('*[data-element="'+elementName+'"]').length > 0)
                            self.$el.find('*[data-element="'+elementName+'"]').replaceWith(el);
                        else
                            self.$el.append(el);

                        if(elementName === 'BuilderRow'){
                            element.sortableColumns();
                            element.appendColumnResizer();
                        }

                        self.parent.trigger('adjust_column_dimension');
                        self.rearrangeElementOrder();

                    });
                   
                },   

                /**
                *   Get all row elements of column
                */
                getRowElements : function(){

                    var rows = [];

                    _.each(this.elements, function(element, index){
                        
                        if(element.type === 'row')
                            rows.push(element);
                    
                    });

                    return rows;

                },
                        
                /**
                 * Checks if the column is empty or not.
                 * @uses controls property to check is any controls are added to column
                 * @returns {undefined}
                 */
                isEmpty : function(){
                    
                    if(this.elements.length === 0)
                        return true;
                    
                    return false;
                    
                },
                        
                /**
                 * clears the empty column
                 * @returns {undefined}
                 */        
                clear : function(){
                    this.$el.empty();
                },
                
                /**
                 * Removes all child elements from column
                 * and memory
                 * @returns {undefined}
                 */
                makeEmpty : function(){
                    
                    _.each(this.elements, function(element, index){
                       
                        if(element.type === 'row')
                            element.emptyColumns();
                        else
                            element.destroy();
                        
                    });

                    this.$el.addClass('empty-column');
                    
                },

                /**
                * returns all elements of column
                */
                getElements : function(){

                    return this.elements;

                },

                /**
                * Set current class for column
                */
                setCurrentClass : function(colClass){
                    
                    this.colClass = colClass;

                } ,

                /**
                * Set new class for the column
                */
                setColumnClass : function(colClass){

                    this.$el.removeClass().addClass('column col-sm-'+colClass);
                    this.setCurrentClass(colClass);
                    this.updateEmptyView();

                },

                /**
                * Returns the current class of the element
                */ 
                getCurrentClass : function(){

                    return this.colClass;

                }    
                
            });
            
            
            return BuilderRowColumn;
  
});

