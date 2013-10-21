define(['backbone','jquery','underscore','handlebars', 'global'], 
		function(Backbone, $, _, Handlebars,  global){

			var BuilderControl = Backbone.View.extend({

				/**
				* May override later
				*/
				render : function(){

				},

				/**
				* Generates the Control markup to drop
				*/
				generateBuilderMarkup : function(){
					
					//set ID from control
					this.$el.attr('id' , this.name + '-' + global.generateRandomId())

					this.$el.html(_.template(this.template));

					return this.$el;
				},

				/**
				*  Remove the control from memory
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
				},

				/**
				* Show Hover
				*/
				showHover : function(){

				}

			});

			return BuilderControl;

		});