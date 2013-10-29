define(['backbone','jquery','underscore','handlebars', 'global'], 
		function(Backbone, $, _, Handlebars,  global){

			var BuilderControl = Backbone.View.extend({

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
                 * Generates the Control markup to drop
                 * @returns {unresolved}
                 */
				generateBuilderMarkup : function(){
					
					//set ID from control
					this.$el.attr('id' , this.name + '-' + global.generateRandomId())

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
                removeControl : function(evt){
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

			return BuilderControl;

		});