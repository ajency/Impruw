define(['builder/views/controls/BuilderControl', 'text!builder/templates/controls/layout/BuilderRow.hbs', 'global'], 
		function(BuilderControl, template, global){

			var BuilderRow = BuilderControl.extend({

				className : 'row',

				//define template for control
				template 	: template,

				//set name for row. Will be used to generate unique ID for each control
				name 		: 'row',

				//register events
				events : {
					'mouseover'            	: 'controlMouseEnter',
                    //'mouseover .column'     : 'controlMouseEnter',
                    'mouseout  '            : 'controlMouseOut',
                    'click .aj-imp-delete-btn' : 'removeControl'
				},
                
                /**
                 * Listen to mouse enter event
                 * @param {type} evt
                 * @returns void
                 */
                controlMouseEnter : function(evt){
                    this.$el.css('border', '1px solid #ff7e00');
                },
                
                /**
                 * Listen to mouse out event
                 * @param {type} evt
                 * @returns void
                 */        
                controlMouseOut : function(evt){
                    this.$el.css('border', '1px solid transparent');
                },

                removeControl : function(evt){
                	evt.preventDefault();

                	var self = this;

                	this.$el.slideToggle('slow',function(){
	                	//self.destroy();
	                });
                }

			});

			return BuilderRow;

		});