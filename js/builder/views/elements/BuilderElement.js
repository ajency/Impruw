define(['backbone','jquery','underscore','handlebars', 'global'], 
		function(Backbone, $, _, Handlebars,  global){

			var BuilderElement = Backbone.View.extend({
               
                /**
                 * Draggable property
                 */  
                draggable   : true,
                
                /**
                 * Editable property
                 */
                editable    : true,
                
                /**
                 * Parent property
                 */
                parent : null,
                
                /**
                 * All child controls will override this function;
                 * @returns {undefined}
                 */
				render : function(){
                   
                    return this;
				
                },
                
                /**
                 * checks the type of element
                 * @param {type} type : type to check
                 * @returns {Boolean}
                 */           
                is : function(type){
                    
                    return type === this.type;
                
                },

                /**
                 * Sets the classes for element
                 * @returns {undefined}
                 */
                setClasses : function(){

                    this.$el.addClass(this.className);

                    if(this.isDraggable())
                        this.$el.addClass('aj-draggable');

                    if(this.isEditable())
                        this.$el.addClass('aj-editable');

                },
                
                /**
                 * Set various handlers for element
                 * Drag handler or edit handler
                 * @returns {undefined}
                 */
                setHandlers : function(){
                     
                     if(this.isDraggable()){
                           log(this.$el.html());
                           this.$el.append('<div class="aj-imp-drag-handle">\
                                                <p title="Move">\
                                                    <span class="icon-uniF140"></span>\
                                                </p>\
                                            </div>');
                     }
                    
                     this.setEditHandlers();
                    
                 },
                 
                /**
                  * Set a edit handler
                  */
                setEditHandlers : function(){
                    
                },
                
               /**
                *  Sets the classes for content
                * @returns {undefined}
                */
                setContentClass : function(){
                    
                   if(!_.isUndefined(this.contentClasses))
                      this.$el.children('.content').children().first().addClass(this.contentClasses);
                   
                },
                 
                /**
                 * Updated the default properties for the element
                 * @param {type} config
                 * @returns {void}
                 */
                setProperties : function(config){

                    if(!_.isUndefined(config.draggable))
                        this.draggable = config.draggable;
                    
                    if(!_.isUndefined(config.editable))
                        this.editable  = config.editable;

                    if(!_.isUndefined(config.className))
                        this.className  = config.className;

                },

                /**
                 * Checks if element is editable
                 * @returns {Boolean}
                 */
                isEditable : function(){

                    return this.editable;

                },
                
                /**
                 * check if element is draggable
                 * @returns {Boolean}
                 */
                isDraggable : function(){

                    return this.draggable;

                },
                  
                /**
                 * Returns the parent of the selected view
                 * 
                 * @returns {undefined}
                 */        
                getParent : function(){
                    
                    if(_.isNull(this.parent) || !_.isObject(this.parent))
                        return false;
                    
                    return this.parent;
                },
                                        
                /**
                 * Set the parent element for the element
                 * @param {type} parent
                 * @returns {undefined}
                 */        
                setParent : function(parent){
                    
                    this.parent = parent;
                    
                },

				/**
                 * Generates the Control markup to drop
                 * @returns {unresolved}
                 */
				generateMarkup : function(){
					
                    if(_.isUndefined(this.template))
                        return '';

                    var html = _.template(this.template);

					this.$el.html(html);
                    
                    this.setContentClass();
                    
                    this.setHandlers();
                    
					return this;
				},

                /**
                * returns the content mode markup
                */
                getContentMarkup : function(){

                    var content = this.$el.children('.content');
                    $(content).find('*[contenteditable="true"]').removeAttr('contenteditable');
                    return $(content).html();

                },
                        
                /**
                 * Listen to mouse enter event
                 * @param {type} evt
                 * @returns void
                 */
                elementMouseEnter : function(evt){
                    
                    evt.stopPropagation();

                    if(window.editorMode == 'content')
                        this.$el.children('.aj-element-setting-tooltip,.aj-imp-drag-handle').show();

                    //remove hover style if row is a child of column
                    if(this.parent.type === 'column'){

                         evt.stop = true;

                         this.parent.parent.rowMouseLeave(evt);
                         
                    }
                },
                
                /**
                 * Listen to mouse leave event
                 * @param {type} evt
                 * @returns void
                 */        
                elementMouseLeave : function(evt){
                    
                    evt.stopPropagation();

                    if(window.editorMode == 'content')
                       this.$el.children('.aj-element-setting-tooltip,.aj-imp-drag-handle').hide();

                    if(this.parent.type === 'column'){

                       this.parent.parent.rowMouseEnter(evt);

                    }
                    
                },        
                        
                /**
                 * Removes the element from the column
                 * @returns {undefined}
                 */        
                destroyElement : function(evt){
                    
                    evt.stopPropagation();
                    
                    if(!confirm("Are you sure?"))
                        return;

                    var self = this;
                    
                    //remove itself from list of elments
                    _.each(this.parent.elements, function(element, index){
                    
                        if(element.id === self.id){
                            
                            self.parent.elements.splice(index,1);
                        
                        }
                        
                    });
                    
                    //update the parent UI
                    this.parent.updateEmptyView();
                    
                    //remove element and clear memory
                    this.removeElement(evt);
                    
                    //adjust the column height. Anonymous function call
                    (function(self){
                        
                        setTimeout(function(){
                            
                            self.parent.parent.trigger('adjust_column_dimension');
                        
                        },1200);
                        
                    })(this); 
                    
                },
                        
                /**
                 * Removes the element form the builder UI
                 * 
                 * Call the destroy fucntion which unbinds/deletes all events attached
                 * with control
                 * @param {object} evt
                 * @returns void
                 */        
                removeElement : function(evt){
                	
                    evt.preventDefault();
                    
                    evt.stopPropagation();
                    
                    var self = this;
                    
                	this.$el.fadeOut(1000, function(){
                    
                        self.destroy();
                    
                    });
                },

				/**
                 * Remove the control from memory
                 *  
                 * @returns {undefined}
                 */
				destroy : function() {

				    if (_.isFunction(this.beforeClose)) {
				    
                        this.beforeClose();
				    
                    }

				    this.off(); //unbind all events of the view being closed

				    this.remove(); // Remove view from DOM

				    this.undelegateEvents();

				    delete this.$el; // Delete the jQuery wrapped object variable

				    delete this.el;
				}

			});

			return BuilderElement;

		});