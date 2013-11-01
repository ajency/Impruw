define(['builder/views/elements/BuilderElement', 'global'], 
		function( BuilderElement, global){
            "use strict";
            var BuilderRowColumn = BuilderElement.extend({
                
                // type of element
                type        : 'column',
                
                //holds all elements for this column
                elements    : [],
                
                className   : 'column',
                
                initialize  : function(opt){
                    
                    _.bindAll(this, 'isEmpty', 'clear', 'handleElementDrop', 'handleHeightChange', 'isEmpty', 'clear',
                                    'handleWidthChange', 'handleElementOverState', 'handleColumnDrop', 'makeColumnsSortable',
                                    'handleElementRemove','resetHeightAuto', 'holdCurrentColRef');
                    
                    this.parent = opt.parent;
                    
                    //listen to height change event
                    this.on('height_changed',this.handleHeightChange);
                    
                    //listen to width change event
                    this.on('width_changed',this.handleWidthChange);
                },
                
                /**
                 * Generates the markup for column 
                 * and triggers the column droppable function
                 * 
                 * @param {type} col
                 * @returns {_L2.Anonym$0}
                 */        
                render : function(col){
                    
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
                                        connectWith : '#aj-imp-builder-drag-drop,.column',
                                        opacity     : .65,
                                        items       : '> .element, .row',
                                        handle      : '.aj-imp-drag-handle',
                                        receive     : self.handleColumnDrop,
                                        sort        : self.handleElementOverState,
                                        remove      : self.handleElementRemove,
                                        over        : self.resetHeightAuto,
                                        out         : self.resetHeightAuto,
                                        activate    : self.holdCurrentColRef
                                   }).disableSelection();
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
                    log('activate' + ui.helper.attr('id'));
                    //log(ui.helper.sender);
                },        
                        
                /**
                 * 
                 * @param {type} event
                 * @param {type} ui
                 * @returns {undefined}
                 */        
                resetHeightAuto : function(event, ui){
            
                     this.$el.height('auto');
                     log('over');
                },        
                        
                /**
                 * 
                 * Handle element removal state
                 * 
                 * @param {type} event
                 * @param {type} ui
                 * @returns {undefined}
                 */        
                handleElementRemove : function(event, ui){
                    
                    //var senderColumn = ui.helper.sender;
                    
                    //log(senderColumn);
                    log(ui.helper);
                    //find element from column
                    //var element = this.getElement();
                    
                    //remove element from
                    if(this.isEmpty()){
                        
                        this.$el.css('background','url(images/empty-drag-bg.svg) no-repeat center center #ffffff');
                        
                    }
                   
                    this.$el.height('auto');
                },
                
                /**
                 * Check for column drop event
                 * @param {type} event
                 * @param {type} ui
                 * @returns {undefined}
                 */        
                handleColumnDrop : function(event, ui){
                    
                    log(ui.helper);
                    //bail if helper is null
                    if(_.isNull(ui.helper)){
                        
                        //reset height to auto
                        this.$el.height('auto');

                        //added new control. Now trigger parent row adjust column dimension
                        this.parent.trigger('adjust_column_dimension');
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
                    
                    this.$el.height('auto');
                    this.parent.trigger('adjust_column_dimension');
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
                    
                    this.$el.css('background','#fff');
                    
                    var E = require('builder/views/Elements');
                    var element = new E[elementName]({parent: this});
                    this.elements.push(element);
                    
                    //
                    if(this.$el.find('*[data-element="'+elementName+'"]').length > 0)
                        this.$el.find('*[data-element="'+elementName+'"]').replaceWith(element.generateBuilderMarkup());
                    else
                        this.$el.append(element.generateBuilderMarkup());
                    
                    //reset height to auto
                    this.$el.height('auto');
                    
                    //added new control. Now trigger parent row adjust column dimension
                    this.parent.trigger('adjust_column_dimension');
                    
                    this.$el.sortable('refreshPositions');
                    
                    log(this.elements);
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
                }        
                
            });
            
            
            return BuilderRowColumn;
  
});

