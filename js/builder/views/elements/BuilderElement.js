define(['backbone','jquery','underscore','handlebars', 'global'], 
		function(Backbone, $, _, Handlebars,  global){

			var BuilderElement = Backbone.View.extend({

                parent : null,
                
                
				/**
                 * All child controls will override this function;
                 * @returns {undefined}
                 */
				render : function(){
                    
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
				generateBuilderMarkup : function(){
					
					this.$el.html(_.template(this.template));

					return this.$el;
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