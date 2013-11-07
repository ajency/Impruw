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
                    if(!confirm("Are you sure?"))
                        return;

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